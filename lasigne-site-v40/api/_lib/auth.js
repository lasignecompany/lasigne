import crypto from 'node:crypto';
const COOKIE='lasigne_admin';
const TTL=60*60*24*7;
function b64(v){return Buffer.from(v).toString('base64url')}
function sign(payload){return crypto.createHmac('sha256',process.env.SESSION_SECRET||'').update(payload).digest('base64url')}
export function createToken(){const p=b64(JSON.stringify({exp:Math.floor(Date.now()/1000)+TTL}));return p+'.'+sign(p)}
export function isAuthenticated(req){
  if(!process.env.SESSION_SECRET) return false;
  const cookies=Object.fromEntries(String(req.headers.cookie||'').split(';').map(v=>v.trim()).filter(Boolean).map(v=>{const i=v.indexOf('=');return [v.slice(0,i),decodeURIComponent(v.slice(i+1))]}));
  const token=cookies[COOKIE]; if(!token) return false;
  const [p,s]=token.split('.'); if(!p||!s) return false;
  const expected=sign(p);
  try{ if(!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected))) return false; }catch{return false;}
  try{return JSON.parse(Buffer.from(p,'base64url').toString()).exp>Math.floor(Date.now()/1000)}catch{return false}
}
export function sessionCookie(token){return `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${TTL}`}
export function clearCookie(){return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`}
export function passwordOK(input){
  const expected=process.env.ADMIN_PASSWORD||''; if(!expected||!input) return false;
  const a=Buffer.from(String(input)); const b=Buffer.from(expected); if(a.length!==b.length) return false;
  return crypto.timingSafeEqual(a,b);
}
