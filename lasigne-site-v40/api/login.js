import { createToken, sessionCookie, passwordOK } from './_lib/auth.js';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({error:'Método não permitido.'});
  if(!process.env.ADMIN_PASSWORD||!process.env.SESSION_SECRET) return res.status(503).json({error:'ADMIN_PASSWORD e SESSION_SECRET ainda não foram configurados na Vercel.'});
  const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
  if(!passwordOK(body.password)) return res.status(401).json({error:'Senha incorreta.'});
  res.setHeader('Set-Cookie',sessionCookie(createToken()));
  return res.status(200).json({ok:true});
}
