(function(){
'use strict';
const IS_EDIT = new URLSearchParams(location.search).get('cms_edit') === '1';
const LOCAL = location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORE_DRAFT='lasigne.cms.inline.draft.v22';
const STORE_PUBLISHED='lasigne.cms.inline.published.v22';
const DEFAULTS=window.LASIGNE_CMS_DEFAULTS||{content:{},links:{},assets:{},elementStyles:{},sectionStyles:{},sections:{},sectionOrder:[],brand:{},pages:[],seo:{}};
let state=JSON.parse(JSON.stringify(DEFAULTS));
let selected=null, toolbar=null, mediaInput=null;
const clone=x=>JSON.parse(JSON.stringify(x));
const merge=(a,b)=>{const o={...a,...b};['content','links','assets','elementStyles','sectionStyles','sections','brand','seo'].forEach(k=>o[k]={...(a[k]||{}),...(b?.[k]||{})}); if(Array.isArray(b?.sectionOrder))o.sectionOrder=b.sectionOrder; if(Array.isArray(b?.pages))o.pages=b.pages; return o};
function isText(el){return !!el?.matches?.('[data-content-key]')}
function isMedia(el){return !!el?.matches?.('img[data-asset-key],video[data-asset-key]')}
function elKey(el){return el?.dataset?.contentKey || el?.dataset?.assetKey || el?.dataset?.cmsSection || ''}
function notify(){try{window.parent?.postMessage({type:'LASIGNE_EDITOR_STATE',state:clone(state),selected:selected?{type:isText(selected)?'text':isMedia(selected)?'media':'block',key:elKey(selected)}:null},'*')}catch(e){}}
function apply(s){
 state=merge(DEFAULTS,s||{});
 Object.entries(state.content||{}).forEach(([k,v])=>{const el=document.querySelector(`[data-content-key="${CSS.escape(k)}"]`);if(el&&v!=null)el.textContent=v});
 Object.entries(state.links||{}).forEach(([k,v])=>{const el=document.querySelector(`a[data-content-key="${CSS.escape(k)}"]`);if(el&&v!=null)el.setAttribute('href',v)});
 Object.entries(state.assets||{}).forEach(([k,v])=>{const el=document.querySelector(`[data-asset-key="${CSS.escape(k)}"]`);if(el&&v?.src){el.src=v.src;if(v.alt!=null&&el.tagName==='IMG')el.alt=v.alt}});
 Object.entries(state.elementStyles||{}).forEach(([k,v])=>{const el=document.querySelector(`[data-content-key="${CSS.escape(k)}"]`);if(el)Object.assign(el.style,v||{})});
 Object.entries(state.sectionStyles||{}).forEach(([k,v])=>{const el=document.querySelector(`[data-cms-section="${CSS.escape(k)}"]`);if(el)Object.assign(el.style,v||{})});
 Object.entries(state.sections||{}).forEach(([k,v])=>{const el=document.querySelector(`[data-cms-section="${CSS.escape(k)}"]`);if(el)el.style.display=v?'':'none'});
 if(state.brand)Object.entries(state.brand).forEach(([k,v])=>{if(k.startsWith('--')&&v)document.documentElement.style.setProperty(k,v)});
 if(state.seo?.title)document.title=state.seo.title;
 if(state.seo?.description){let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=state.seo.description}
}
async function load(){
 let loaded=null;
 if(!LOCAL){try{const r=await fetch('/api/state?mode='+(IS_EDIT?'draft':'published'),{credentials:'include'});if(r.ok){loaded=(await r.json()).state||null}}catch(e){}}
 if(!loaded){try{loaded=JSON.parse(localStorage.getItem(IS_EDIT?STORE_DRAFT:STORE_PUBLISHED)||'null')}catch(e){}}
 apply(loaded||DEFAULTS);
 if(IS_EDIT)enableEdit();
 notify();
}
function injectEditStyles(){
 const s=document.createElement('style');s.id='lasigne-inline-editor-style';s.textContent=`
 html.cms-editing body{padding-top:58px!important}
 html.cms-editing [data-content-key],html.cms-editing [data-asset-key],html.cms-editing [data-cms-section]{position:relative}
 html.cms-editing [data-content-key]:hover{outline:1px dashed #c8ab7e!important;outline-offset:5px;cursor:text!important}
 html.cms-editing [data-asset-key]:hover{outline:2px solid #c8ab7e!important;outline-offset:5px;cursor:pointer!important}
 html.cms-editing [data-cms-section].cms-block-selected{outline:2px dashed rgba(200,171,126,.65)!important;outline-offset:-2px}
 html.cms-editing .cms-selected{outline:2px solid #c8ab7e!important;outline-offset:5px}
 #cms-inline-toolbar{position:fixed;z-index:2147483640;top:8px;left:50%;transform:translateX(-50%);min-height:42px;display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(25,14,18,.97);box-shadow:0 16px 55px rgba(0,0,0,.35);color:#fff;font:11px Inter,system-ui,sans-serif;backdrop-filter:blur(16px);max-width:calc(100vw - 20px);overflow:auto}
 #cms-inline-toolbar button,#cms-inline-toolbar select,#cms-inline-toolbar input[type=text]{height:30px;border:1px solid rgba(255,255,255,.13);border-radius:8px;background:#28161e;color:#fff;font:10px Inter,system-ui,sans-serif;padding:0 8px}
 #cms-inline-toolbar button{cursor:pointer;white-space:nowrap}#cms-inline-toolbar button:hover{border-color:#c8ab7e}
 #cms-inline-toolbar input[type=color]{width:31px;height:30px;border:0;border-radius:8px;padding:2px;background:#28161e}
 #cms-inline-toolbar .cms-label{white-space:nowrap;color:#cdbdc4;font-weight:600;max-width:145px;overflow:hidden;text-overflow:ellipsis}
 #cms-inline-toolbar .cms-media-only,#cms-inline-toolbar .cms-text-only,#cms-inline-toolbar .cms-block-only{display:none}
 #cms-inline-toolbar[data-mode=text] .cms-text-only{display:inline-flex}
 #cms-inline-toolbar[data-mode=media] .cms-media-only{display:inline-flex}
 #cms-inline-toolbar[data-mode=block] .cms-block-only{display:inline-flex}
 .cms-block-handle{position:absolute!important;z-index:2147483500;right:12px;top:12px;border:0!important;border-radius:999px!important;background:#1d1015!important;color:#d8c4cb!important;padding:7px 10px!important;font:9px Inter,system-ui,sans-serif!important;box-shadow:0 5px 20px rgba(0,0,0,.25)!important;cursor:pointer!important}
 `;document.head.appendChild(s);
}
function mk(tag,attrs={},txt=''){const e=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>{if(k==='class')e.className=v;else e.setAttribute(k,v)});if(txt)e.textContent=txt;return e}
function createToolbar(){
 toolbar=mk('div',{id:'cms-inline-toolbar','data-mode':'none'});
 toolbar.append(mk('span',{class:'cms-label'},'Clique em um texto, mídia ou bloco'));
 const color=mk('input',{type:'color',class:'cms-text-only',title:'Cor do texto'}); color.value='#ffffff';color.oninput=e=>styleSelected('color',e.target.value);toolbar.append(color);
 const font=mk('select',{class:'cms-text-only',title:'Fonte'});[['','Fonte original'],["'Newsreader',Georgia,serif",'Newsreader'],["'Cormorant Garamond',Georgia,serif",'Cormorant'],["'Playfair Display',Georgia,serif",'Playfair'],["'DM Serif Display',Georgia,serif",'DM Serif'],["'Inter',system-ui,sans-serif",'Inter'],["'Manrope',system-ui,sans-serif",'Manrope']].forEach(([v,t])=>{const o=mk('option',{value:v},t);font.append(o)});font.onchange=e=>styleSelected('fontFamily',e.target.value);toolbar.append(font);
 const size=mk('select',{class:'cms-text-only',title:'Tamanho'});[['','Tamanho'],['14px','14'],['16px','16'],['18px','18'],['22px','22'],['28px','28'],['36px','36'],['48px','48'],['60px','60'],['72px','72']].forEach(([v,t])=>size.append(mk('option',{value:v},t)));size.onchange=e=>styleSelected('fontSize',e.target.value);toolbar.append(size);
 const bold=mk('button',{class:'cms-text-only',type:'button'},'B');bold.style.fontWeight='800';bold.onclick=()=>styleSelected('fontWeight',selected?.style?.fontWeight==='700'?'':'700');toolbar.append(bold);
 ['left','center','right'].forEach(a=>{const b=mk('button',{class:'cms-text-only',type:'button'},a==='left'?'↤':a==='center'?'↔':'↦');b.title='Alinhar '+a;b.onclick=()=>styleSelected('textAlign',a);toolbar.append(b)});
 const link=mk('input',{type:'text',class:'cms-text-only',placeholder:'Link / CTA',title:'Destino do link'});link.onchange=e=>{if(selected?.matches('a[data-content-key]')){state.links[selected.dataset.contentKey]=e.target.value;selected.href=e.target.value;persistLocal();notify()}};toolbar.append(link);
 const bg=mk('input',{type:'color',class:'cms-block-only',title:'Cor do bloco'});bg.value='#ffffff';bg.oninput=e=>styleBlock('backgroundColor',e.target.value);toolbar.append(bg);const resetBg=mk('button',{class:'cms-block-only',type:'button'},'Resetar fundo');resetBg.onclick=()=>{if(!selected?.dataset?.cmsSection)return;const k=selected.dataset.cmsSection;delete state.sectionStyles[k];selected.style.backgroundColor='';persistLocal();notify()};toolbar.append(resetBg);
 const reset=mk('button',{class:'cms-text-only',type:'button'},'Resetar estilo');reset.onclick=resetTextStyle;toolbar.append(reset);
 const replace=mk('button',{class:'cms-media-only',type:'button'},'Trocar mídia');replace.onclick=()=>mediaInput.click();toolbar.append(replace);
 const alt=mk('input',{type:'text',class:'cms-media-only',placeholder:'Texto alternativo'});alt.onchange=e=>{if(selected?.tagName==='IMG'){const k=selected.dataset.assetKey;state.assets[k]={...(state.assets[k]||{}),src:selected.src,alt:e.target.value};selected.alt=e.target.value;persistLocal();notify()}};toolbar.append(alt);
 const mediaUrl=mk('input',{type:'text',class:'cms-media-only',placeholder:'URL da mídia'});mediaUrl.onchange=e=>replaceMediaUrl(e.target.value);toolbar.append(mediaUrl);
 const done=mk('button',{type:'button'},'Concluir');done.onclick=clearSelection;toolbar.append(done);
 document.body.append(toolbar);
 mediaInput=mk('input',{type:'file',accept:'image/*,video/*'});mediaInput.style.display='none';mediaInput.onchange=()=>{const f=mediaInput.files?.[0];if(f)replaceMediaFile(f);mediaInput.value=''};document.body.append(mediaInput);
}
function updateToolbar(){
 if(!toolbar)return;const label=toolbar.querySelector('.cms-label'),link=toolbar.querySelector('input[placeholder="Link / CTA"]'),alt=toolbar.querySelector('input[placeholder="Texto alternativo"]'),url=toolbar.querySelector('input[placeholder="URL da mídia"]');
 if(!selected){toolbar.dataset.mode='none';label.textContent='Clique em um texto, mídia ou bloco';return}
 const mode=isText(selected)?'text':isMedia(selected)?'media':'block';toolbar.dataset.mode=mode;label.textContent=elKey(selected)||mode;
 if(mode==='text'){link.value=selected.matches('a')?selected.getAttribute('href')||'':'';link.style.display=selected.matches('a')?'inline-flex':'none'}
 if(mode==='media'){alt.value=selected.tagName==='IMG'?selected.alt||'':'';url.value=selected.getAttribute('src')||''}
}
function selectEl(el){
 if(selected&&selected!==el){selected.classList.remove('cms-selected','cms-block-selected');if(isText(selected))selected.removeAttribute('contenteditable')}
 selected=el;if(!el){updateToolbar();return}
 if(isText(el)){el.classList.add('cms-selected');el.setAttribute('contenteditable','true');el.spellcheck=true;el.focus();}
 else if(isMedia(el))el.classList.add('cms-selected'); else el.classList.add('cms-block-selected');
 updateToolbar();notify();
}
function clearSelection(){if(selected){selected.classList.remove('cms-selected','cms-block-selected');if(isText(selected))selected.removeAttribute('contenteditable')}selected=null;updateToolbar();notify()}
function styleSelected(prop,val){if(!selected||!isText(selected))return;const k=selected.dataset.contentKey;state.elementStyles[k]={...(state.elementStyles[k]||{}),[prop]:val};selected.style[prop]=val;persistLocal();notify()}
function resetTextStyle(){if(!selected||!isText(selected))return;const k=selected.dataset.contentKey;delete state.elementStyles[k];['color','fontFamily','fontSize','fontWeight','textAlign','backgroundColor'].forEach(p=>selected.style[p]='');persistLocal();notify()}
function styleBlock(prop,val){if(!selected?.dataset?.cmsSection)return;const k=selected.dataset.cmsSection;state.sectionStyles[k]={...(state.sectionStyles[k]||{}),[prop]:val};selected.style[prop]=val;persistLocal();notify()}
async function replaceMediaFile(file){
 if(!selected||!isMedia(selected))return;const k=selected.dataset.assetKey;let src='';
 if(!LOCAL){
   try{
     const meta=await fetch('/api/media-sign',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:file.name,type:file.type,size:file.size,assetKey:k})});
     if(meta.ok){const d=await meta.json();const fd=new FormData();fd.append('cacheControl','31536000');fd.append('',file);const up=await fetch(d.signedUrl,{method:'PUT',headers:{'x-upsert':'true'},body:fd});if(!up.ok)throw new Error('Falha no upload');src=d.publicUrl}
   }catch(e){alert('Não consegui enviar a mídia ao Storage. A prévia local será usada. '+e.message)}
 }
 if(!src)src=URL.createObjectURL(file);
 state.assets[k]={...(state.assets[k]||{}),src,alt:selected.tagName==='IMG'?selected.alt||'':''};selected.src=src;persistLocal();notify();
}
function replaceMediaUrl(src){if(!selected||!isMedia(selected)||!src)return;const k=selected.dataset.assetKey;state.assets[k]={...(state.assets[k]||{}),src,alt:selected.tagName==='IMG'?selected.alt||'':''};selected.src=src;persistLocal();notify()}
function persistLocal(){try{localStorage.setItem(STORE_DRAFT,JSON.stringify(state))}catch(e){}}
function enableEdit(){
 document.documentElement.classList.add('cms-editing');injectEditStyles();createToolbar();
 document.addEventListener('click',e=>{
   if(e.target.closest('#cms-inline-toolbar'))return;
   const t=e.target.closest('[data-content-key],[data-asset-key]');
   if(t){if(t.matches('a'))e.preventDefault();e.stopPropagation();selectEl(t);return}
   const sec=e.target.closest('[data-cms-section]');if(sec){e.stopPropagation();selectEl(sec);return}
   clearSelection();
 },true);
 document.addEventListener('input',e=>{const el=e.target.closest?.('[data-content-key]');if(el&&el.isContentEditable){state.content[el.dataset.contentKey]=el.innerText;persistLocal();notify()}},true);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')clearSelection()});
}
window.addEventListener('message',e=>{const d=e.data||{};if(d.type==='LASIGNE_APPLY_STATE')apply(d.state);if(d.type==='LASIGNE_SAVE_LOCAL'){persistLocal();notify()}if(d.type==='LASIGNE_PUBLISH_LOCAL'){try{localStorage.setItem(STORE_PUBLISHED,JSON.stringify(state))}catch(e){};notify()}if(d.type==='LASIGNE_RELOAD')location.reload()});
load();
})();