# La Signé CMS Inline V22

Este pacote parte da versão atual do `index.html` da La Signé e adiciona **edição inline**.

## O que muda no uso

Abra `/admin` e edite olhando para a própria página:

- clique em um texto: ele recebe cursor e pode ser digitado diretamente;
- com o texto selecionado: altere cor, fonte, tamanho, negrito, alinhamento e link;
- clique em imagem ou vídeo: troque o arquivo ou informe outra URL;
- clique numa área vazia de um bloco: altere a cor de fundo do bloco;
- alterne Desktop / Tablet / Mobile no topo;
- `Salvar rascunho` não altera o site público;
- `Publicar` copia o rascunho para a versão pública;
- o HTML/CSS estrutural continua protegido.

A página-base contém 100 campos de conteúdo marcados, 8 mídias selecionáveis e 6 grandes seções mapeadas.

## Para validar antes de instalar

1. Descompacte o ZIP.
2. Abra `admin.html`.
3. Clique diretamente nos textos da página.
4. Teste a troca de uma imagem.
5. Teste Desktop, Tablet e Mobile.

Em modo local, as alterações usam `localStorage` e **não mexem no domínio**.

## Arquitetura de produção

- **GitHub:** este projeto e histórico do código.
- **Vercel:** publica `lasigne.com` e `lasigne.com/admin`, além das APIs seguras.
- **Supabase:** guarda rascunho, versão publicada, histórico e arquivos de mídia.

## Instalação de produção (faça somente depois de aprovar a prévia)

### 1. Supabase

1. Crie um projeto para a La Signé.
2. Abra SQL Editor.
3. Execute `supabase/schema.sql`.
4. Em Storage, crie um bucket **público** chamado `site-media`.
5. Em **Connect**, copie:
   - Project URL;
   - Secret key (`sb_secret_...`).

Não coloque a Secret key dentro do HTML ou GitHub público.

### 2. GitHub

Use este conteúdo como a próxima versão do repositório que já alimenta o site. **Não apague o projeto da Vercel e não altere o domínio.**

Recomendação: subir primeiro em uma branch de teste, validar o Preview Deployment da Vercel e só então fazer merge para a branch de produção.

### 3. Vercel

No projeto da La Signé, adicione Environment Variables:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_MEDIA_BUCKET=site-media`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

Depois faça um novo deploy do mesmo projeto.

### 4. Primeiro acesso

Abra:

`https://lasigne.com/admin`

Entre com `ADMIN_PASSWORD`, edite, salve como rascunho e valide. Só use **Publicar** quando estiver satisfeita.

## Segurança

A Secret key do Supabase fica apenas nas Functions da Vercel. O navegador não recebe a chave. O `/admin` usa cookie HttpOnly assinado e a mídia é enviada diretamente ao Storage por URL de upload assinada.

## Observação sobre o primeiro estado do banco

Se o banco estiver vazio, o site continua exibindo o conteúdo embutido no HTML. Depois que você salvar o primeiro rascunho e publicar, o CMS passa a aplicar os dados persistidos.
