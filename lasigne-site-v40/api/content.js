import { readContent, writeContent, hasDatabase } from './_lib/db.js';
import { isAuthenticated } from './_lib/auth.js';
import { ALLOWED_KEYS } from './_lib/schema.js';
import { DEFAULT_CONTENT } from './_lib/defaults.js';

function setPath(obj,path,value){const p=path.split('.');let c=obj;for(const k of p.slice(0,-1))c=c[k]||(c[k]={});c[p.at(-1)]=value}
function validateFlat(flat){
  const result={};
  for(const [key,max] of Object.entries(ALLOWED_KEYS)){
    const v=flat[key];
    if(typeof v!=='string') continue;
    const clean=v.trim();
    if(clean.length>max) throw new Error(`O campo ${key} ultrapassou ${max} caracteres.`);
    setPath(result,key,clean);
  }
  return result;
}
function flatten(obj,prefix='',out={}){for(const [k,v] of Object.entries(obj||{})){const key=prefix?prefix+'.'+k:k;if(v&&typeof v==='object'&&!Array.isArray(v))flatten(v,key,out);else out[key]=String(v??'')}return out}
function deepMerge(a,b){const r=structuredClone(a);for(const [k,v] of Object.entries(b||{})){if(v&&typeof v==='object'&&!Array.isArray(v))r[k]=deepMerge(r[k]||{},v);else r[k]=v}return r}

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  try{
    if(req.method==='GET'){
      const data=await readContent();
      return res.status(200).json(data);
    }
    if(req.method==='POST'){
      if(!isAuthenticated(req)) return res.status(401).json({error:'Não autorizado.'});
      if(!hasDatabase()) return res.status(503).json({error:'Conecte um banco Neon/Postgres ao projeto na Vercel antes de salvar alterações.'});
      const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
      const validated=validateFlat(body.content||{});
      const current=(await readContent()).content;
      const merged=deepMerge(DEFAULT_CONTENT,deepMerge(current,validated));
      const updatedAt=await writeContent(merged);
      return res.status(200).json({ok:true,content:merged,updatedAt});
    }
    res.setHeader('Allow','GET, POST'); return res.status(405).json({error:'Método não permitido.'});
  }catch(e){return res.status(400).json({error:e?.message||'Erro ao processar conteúdo.'})}
}
