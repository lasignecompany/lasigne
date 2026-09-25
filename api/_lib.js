import crypto from 'node:crypto';
export const COOKIE='lasigne_admin';
function b64u(s){return Buffer.from(s).toString('base64url')}
function sig(s){return crypto.createHmac('sha256',process.env.SESSION_SECRET||'').update(s).digest('base64url')}
export function makeSession(){const payload=b64u(JSON.stringify({exp:Date.now()+1000*60*60*12}));return payload+'.'+sig(payload)}
export function validSession(req){const c=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='));if(!c)return false;const token=decodeURIComponent(c.slice(COOKIE.length+1));const [p,s]=token.split('.');if(!p||!s||!process.env.SESSION_SECRET)return false;const a=Buffer.from(sig(p)),b=Buffer.from(s);if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return false;try{return JSON.parse(Buffer.from(p,'base64url').toString()).exp>Date.now()}catch{return false}}
export function json(res,status,data){res.status(status).setHeader('Content-Type','application/json; charset=utf-8').send(JSON.stringify(data))}
export function envReady(){return !!(process.env.SUPABASE_URL&&process.env.SUPABASE_SECRET_KEY&&process.env.SESSION_SECRET&&process.env.ADMIN_PASSWORD)}
export async function sb(path,{method='GET',body,headers={}}={}){const base=(process.env.SUPABASE_URL||'').replace(/\/$/,'');const key=process.env.SUPABASE_SECRET_KEY;const r=await fetch(base+path,{method,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body)});const text=await r.text();let data=null;try{data=text?JSON.parse(text):null}catch{data=text}if(!r.ok)throw new Error(typeof data==='string'?data:JSON.stringify(data));return data}
