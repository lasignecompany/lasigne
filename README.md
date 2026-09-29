# La Signé V20 — V19 visual + painel administrativo

Esta versão mantém a composição visual da V19 e adiciona conteúdo editável em `/admin`.

## O que muda
- O site público continua em `/`.
- O painel privado fica em `/admin`.
- Títulos, textos, CTAs, cards, ofertas e dados básicos podem ser alterados sem editar HTML.
- O layout, CSS, imagens e responsividade continuam protegidos.
- O conteúdo publicado é salvo em Postgres (Neon) e lido pelo site em tempo de execução.
- Se o banco ainda não estiver conectado, o site continua exibindo o conteúdo original V19.

## Publicar na Vercel
1. Faça deploy desta pasta/ZIP como um projeto Vercel.
2. No projeto Vercel, abra **Marketplace / Storage** e adicione **Neon Postgres**.
3. Conecte o banco ao projeto. A integração deve fornecer `DATABASE_URL`.
4. Em **Settings → Environment Variables**, crie:
   - `ADMIN_PASSWORD`: senha forte para entrar em `/admin`.
   - `SESSION_SECRET`: segredo longo e aleatório, com pelo menos 32 caracteres.
5. Faça um novo deploy depois de adicionar as variáveis de ambiente.
6. Abra `https://SEU-DOMINIO/admin` e entre com a senha definida.
7. A primeira leitura cria automaticamente a tabela `site_content`; não é necessário rodar SQL manualmente.

## Editar também pelo dashboard da Vercel
O conteúdo fica na tabela `site_content`, linha `id = 1`, coluna `content` (JSONB). Em integrações Postgres suportadas, a Vercel oferece Query/Data Editor no dashboard. Para o uso diário, o `/admin` é mais seguro porque protege a estrutura e valida os campos.

## Segurança
- Nunca coloque `ADMIN_PASSWORD` ou `SESSION_SECRET` no HTML.
- Mantenha os valores apenas nas Environment Variables da Vercel.
- O painel usa cookie HttpOnly assinado e sessão de 7 dias.
- A gravação do conteúdo exige sessão autenticada.

## Arquivos principais
- `index.html`: site público, visual V19.
- `admin/index.html`: painel administrativo.
- `api/content.js`: leitura/gravação de conteúdo.
- `api/login.js`, `api/logout.js`, `api/me.js`: autenticação.
- `content-schema.json`: campos exibidos no painel.
- `default-content.json`: conteúdo original da V19 como fallback.
- `.env.example`: variáveis necessárias.

## Observação
Imagens continuam incorporadas no site, exatamente como na V19. O painel atual foi feito para autonomia de textos, títulos, CTAs e conteúdo comercial. Upload/troca de imagens pode ser acrescentado depois com storage (por exemplo Vercel Blob) sem alterar o visual.
## V22 — refinamento de copy e separação visual
- “Primeiro, entendemos onde a venda se perde.”
- cards de desejo reescritos como ações necessárias;
- headline institucional positiva e orientada a resultado comercial;
- CTA final substitui a repetição do hero por uma mensagem de tranquilidade e consistência;
- resultados e CTAs dos cards de oferta agora têm separação visual explícita, evitando textos colados.

## V23 — logo oficial + resultados reais
- logo oficial aplicada no header e footer com respiro próprio em desktop e mobile;
- seção “Resultados na prática” inserida entre Método e Soluções;
- três depoimentos transformados em micro-cases de resultado comercial;
- valores monetários não são destacados;
- identidades não são inventadas;
- todos os textos da nova seção são editáveis em `/admin`.

## V24 — prova social refinada
- logo oficial da La Signé reaplicada no header e footer com respiro preservado;
- seção de depoimentos redesenhada com layout mais limpo e equilibrado;
- retratos de clientes incluídos nos cards;
- título da seção alterado para “Resultados de clientes”.
