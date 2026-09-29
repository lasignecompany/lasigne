import { neon } from '@neondatabase/serverless';
import { DEFAULT_CONTENT } from './defaults.js';

export function hasDatabase(){ return Boolean(process.env.DATABASE_URL); }
export function db(){
  if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL não configurada.');
  return neon(process.env.DATABASE_URL);
}
export async function ensureTable(sql){
  await sql`CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}
export async function readContent(){
  if(!hasDatabase()) return {content:DEFAULT_CONTENT,persistent:false,updatedAt:null};
  const sql=db(); await ensureTable(sql);
  const rows=await sql`SELECT content, updated_at FROM site_content WHERE id=1 LIMIT 1`;
  if(!rows.length){
    await sql`INSERT INTO site_content (id,content) VALUES (1, ${JSON.stringify(DEFAULT_CONTENT)}::jsonb)`;
    return {content:DEFAULT_CONTENT,persistent:true,updatedAt:new Date().toISOString()};
  }
  return {content:rows[0].content,persistent:true,updatedAt:rows[0].updated_at};
}
export async function writeContent(content){
  const sql=db(); await ensureTable(sql);
  const payload=JSON.stringify(content);
  const rows=await sql`INSERT INTO site_content (id,content,updated_at)
    VALUES (1, ${payload}::jsonb, NOW())
    ON CONFLICT (id) DO UPDATE SET content=EXCLUDED.content, updated_at=NOW()
    RETURNING updated_at`;
  return rows[0]?.updated_at;
}
