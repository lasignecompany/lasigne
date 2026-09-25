import {validSession,json,sb,envReady} from './_lib.js';
export default async function handler(req,res){
 if(!envReady())return json(res,503,{error:'not_configured'});
 try{
  if(req.method==='GET'){
   const mode=req.query?.mode==='draft'?'draft':'published';if(mode==='draft'&&!validSession(req))return json(res,401,{error:'unauthorized'});
   const rows=await sb('/rest/v1/site_state?id=eq.home&select=id,draft,published,updated_at,published_at');const row=rows?.[0]||null;return json(res,200,{state:row?.[mode]||null,updated_at:row?.updated_at,published_at:row?.published_at});
  }
  if(req.method==='POST'){
   if(!validSession(req))return json(res,401,{error:'unauthorized'});let body=req.body||{};if(typeof body==='string')body=JSON.parse(body);
   if(body.action==='save'){
    await sb('/rest/v1/site_state?id=eq.home',{method:'PATCH',headers:{Prefer:'return=minimal'},body:{draft:body.state,updated_at:new Date().toISOString()}});return json(res,200,{ok:true});
   }
   if(body.action==='publish'){
    const rows=await sb('/rest/v1/site_state?id=eq.home&select=draft,published');const row=rows?.[0];if(!row)return json(res,404,{error:'missing_state'});const now=new Date().toISOString();await sb('/rest/v1/content_versions',{method:'POST',headers:{Prefer:'return=minimal'},body:{site_id:'home',snapshot:row.published||{},created_at:now}});await sb('/rest/v1/site_state?id=eq.home',{method:'PATCH',headers:{Prefer:'return=minimal'},body:{published:row.draft||{},published_at:now,updated_at:now}});return json(res,200,{ok:true});
   }
   return json(res,400,{error:'bad_action'});
  }
  return json(res,405,{error:'method'});
 }catch(e){return json(res,500,{error:'server',detail:e.message})}
}