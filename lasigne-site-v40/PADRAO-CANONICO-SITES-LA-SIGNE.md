# Padrão Canônico de Sites La Signé

## Objetivo
Este documento registra as decisões consolidadas durante a construção do site La Signé e deve ser usado como referência para futuros sites, páginas comerciais e landing pages criados para Ana Lira, La Signé ou clientes quando a mesma régua de qualidade for desejada.

A regra central é: **desktop e mobile são duas experiências deliberadamente projetadas e revisadas. Mobile não é apenas o desktop empilhado.**

---

## 1. Copy: ordem obrigatória de persuasão
A página deve avançar em uma única direção. Evitar explicar o mesmo problema em várias seções.

1. **Identificação imediata** — headline concreta, diagnosticável e compreendida em segundos.
2. **Tensão / consequência** — mostrar o custo real do problema em cenas observáveis.
3. **Desejo** — mostrar o que a cliente quer ver acontecendo no negócio, sem promessas irreais.
4. **Diagnóstico / causa** — explicar por que o problema acontece antes de apresentar a solução.
5. **Mecanismo / método** — apresentar os pilares do trabalho somente depois de a cliente entender o problema.
6. **Ofertas** — mostrar caminhos de trabalho com função distinta e resultado desejado claro.
7. **Confiança** — equipe, método, fundadora, experiência e processo.
8. **Ação** — CTA real, com formulário, WhatsApp, agendamento ou outra ação funcional.

### Filtro anti-IA para copy
Cortar frases que:
- pareçam discurso de LinkedIn;
- usem abstrações como “clareza”, “estrutura”, “jornada” ou “nível” sem dizer exatamente o que muda;
- deixem complemento implícito, como “continua incerto” ou “o mês termina bem”;
- prometam que a venda acontecerá sem trabalho comercial;
- usem metáforas artificiais;
- expliquem o negócio pela linguagem interna da consultoria em vez do desejo do cliente.

Preferir:
- cliente;
- contrato;
- proposta;
- orçamento;
- reunião;
- indicação;
- agenda;
- venda;
- próximo mês;
- quem chega;
- quem avança;
- quem fecha.

### Referência de tom aprovada
> Se ninguém indicar você este mês, de onde vêm os próximos contratos?

> A qualidade do que você entrega é alta. Mas depender de indicação todo mês custa caro demais.

A inteligência deve vir da **precisão da observação**, não de palavras sofisticadas.

---

## 2. Direção visual La Signé
### Sensação
Editorial, refinada, premium, feminina sem clichê, comercial e contemporânea.

### Evitar
- luxo performático;
- bege tratado como dourado;
- excesso de fundo preto;
- fotos genéricas de banco com pose artificial;
- dashboards genéricos;
- animações contínuas;
- excesso de elementos decorativos;
- serifas tão finas que percam legibilidade.

### Paleta base atual
- vinho profundo: `#1D0B10` / `#2B1018`
- vinho médio: `#5A1F31`
- creme: `#F5F0E8`
- marfim: `#FCFAF6`
- dourado profundo: `#8A682C`
- dourado médio: `#B89248`
- dourado claro: `#D6BD7A`

Dourado deve aparecer como **acento metálico visual**, não como creme amarelado.

### Tipografia base aprovada
- títulos: **Newsreader**
- corpo, navegação e UI: **Inter**

Critério: elegante, mas confortável para leitura longa em tela.

---

## 3. Escala tipográfica
### Desktop
- hero: aproximadamente 52–86 px, dependendo da largura;
- títulos de seção: 42–68 px;
- corpo principal: 17–22 px;
- textos auxiliares: mínimo aproximado de 13–14 px quando relevantes.

### Mobile
- hero: ~33–36 px;
- títulos de seção: ~30–32 px;
- títulos de cards: ~25–31 px;
- corpo: 16–17 px;
- evitar textos funcionais menores que 12 px.

**Regra:** o usuário deve conseguir ler uma headline como frase, sem sentir que cada palavra ocupa uma tela.

---

## 4. Margens e safe area no mobile
Padrão preferencial:
- 24 px laterais na maioria dos celulares;
- 22 px em telas muito estreitas;
- sempre respeitar `env(safe-area-inset-left/right)`;
- nenhum título, pré-headline, card ou formulário pode escapar do mesmo gutter visual.

Qualquer elemento fora de `.wrap` deve receber a mesma margem manualmente.

---

## 5. Relação pré-headline → headline
Esse foi um ponto crítico identificado durante a revisão.

### Regra
- pré-headline deve ocupar uma linha própria;
- no mobile, usar `display:flex` ou `display:block`, nunca depender de margem vertical em `inline-flex`;
- espaço recomendado entre pré-headline e título: 18–22 px;
- labels longas em caixa alta precisam de line-height de ~1.5;
- o título não deve manter margin-top que anule esse respiro.

---

## 6. Cards e mini-infográficos
Cards brancos arredondados são um elemento aprovado da linguagem La Signé.

Usar para:
- resultados desejados;
- etapas;
- sinais do problema;
- pequenas decisões;
- comparação de caminhos.

Exemplos aprovados:
- Mais pessoas com perfil e orçamento.
- Mais propostas em negociação.
- Outros caminhos além da indicação.

### Critérios
- pouco texto;
- leitura imediata;
- borda sutil;
- sombra discreta;
- bom respiro interno;
- não transformar tudo em card.

---

## 7. Fotografia
Preferir fotografia realista editorial:
- mesa de trabalho refinada;
- notebook, telefone, documentos, agenda, caneta;
- cenas de contato e trabalho;
- materiais escuros, madeira, vidro, couro, papel;
- iluminação quente e natural;
- composição sofisticada sem parecer banco de imagem óbvio.

A imagem deve reforçar a mensagem da seção. Não usar imagem apenas para preencher espaço.

---

## 8. Movimento e interação
Movimento é exceção.

### Permitido
- entrada única e discreta no hero;
- hover em botão/card;
- transições pequenas que indiquem interação.

### Evitar
- títulos desaparecendo e reaparecendo;
- scroll reveal em todas as seções;
- movimento repetitivo sem função;
- elementos importantes escondidos até o usuário rolar.

---

## 9. CTA funcional
Nenhum botão principal deve ser decorativo.

Opções válidas:
- formulário curto → WhatsApp com mensagem pré-preenchida;
- WhatsApp direto;
- agendamento real;
- formulário real enviado para CRM/e-mail.

Para La Signé, o fluxo atual preferido é:
1. formulário de qualificação curto;
2. mensagem organizada automaticamente;
3. abertura do WhatsApp da La Signé;
4. alternativa de WhatsApp direto.

Número atual usado no projeto: **+55 19 98293-3000**.

---

## 10. Desktop e mobile devem ser revisados separadamente
### Desktop
Checar:
- equilíbrio entre imagem e copy;
- largura máxima de linha;
- ritmo vertical;
- hierarquia entre seções;
- uso do espaço negativo;
- alinhamentos;
- proporção de cards e imagens.

### Mobile
Checar:
- nenhuma letra cortada;
- gutters consistentes;
- headline não excessiva;
- pré-headline distante o suficiente do título;
- ordem de elementos reavaliada;
- texto antes da imagem quando isso melhora compreensão;
- cards não excessivamente altos;
- botão não estoura largura;
- campos de formulário legíveis;
- sticky nav não cobre conteúdo;
- nenhuma seção depende de hover.

---

## 11. QA obrigatório antes de entregar um site
Antes de apresentar uma versão como final ou quase final:

### Copy
- [ ] A página avança sem voltar ao problema depois de apresentar a solução?
- [ ] Cada seção acrescenta uma nova etapa do argumento?
- [ ] Há repetições desnecessárias?
- [ ] O desejo aparece claramente?
- [ ] As ofertas vendem resultado, não apenas processo?
- [ ] A linguagem é natural e específica?

### Visual
- [ ] Tipografia legível em desktop e mobile?
- [ ] Dourado realmente parece dourado?
- [ ] Imagens carregam?
- [ ] Imagens fazem sentido com a seção?
- [ ] Não há excesso de transições?
- [ ] Cards estão consistentes?

### Mobile
- [ ] Gutter mínimo ~22–24 px?
- [ ] Safe area respeitada?
- [ ] Nenhuma palavra toca/corta margem?
- [ ] Hero ~33–36 px?
- [ ] Títulos internos ~30–32 px?
- [ ] Pré-headline e título separados por ~18–22 px?
- [ ] Botões quebram texto sem estourar?
- [ ] Formulário cabe confortavelmente?

### Conversão
- [ ] Todos os CTAs funcionam?
- [ ] WhatsApp abre com mensagem coerente?
- [ ] Há alternativa para quem não quer preencher formulário?
- [ ] O CTA final retoma a promessa principal?

---

## 12. Regra para futuros projetos
Quando Ana pedir um site novo, começar perguntando ou inferindo qual referência aprovada mais se aproxima do projeto. Depois:

1. definir arquitetura de copy;
2. aprovar direção visual;
3. construir desktop;
4. construir mobile como experiência própria;
5. executar QA completo;
6. somente então entregar.

Se um novo site ou plataforma atingir um nível visual aprovado, registrar como nova referência reutilizável do acervo de interfaces.


## Regra de CTA orientada a desejo
CTAs devem expressar o resultado, avanço ou ação desejada pelo cliente. Não usar diagnóstico, descoberta, análise ou processo interno como promessa do botão.

Preferir:
- Quero atrair clientes todos os meses
- Quero melhorar minhas vendas
- Quero mais clientes e propostas em negociação
- Quero atrair mais clientes certos

Evitar:
- Quero entender o que precisa mudar
- Quero descobrir meu problema
- Quero analisar meu negócio
- Quero começar o processo

### Refinamento desktop aprovado — V19
Em monitores/laptops, a escala editorial não deve competir com a leitura. Títulos muito grandes podem parecer sofisticados no mockup, mas desproporcionais no navegador real.

Regra:
- manter o mobile aprovado intacto;
- fazer ajustes desktop dentro de `@media (min-width:721px)`;
- reduzir títulos principais em aproximadamente 10–20% quando ocuparem altura excessiva;
- preservar hierarquia, mas permitir mais texto visível acima da dobra;
- avaliar o site em navegador real de laptop, não apenas em viewport de desenvolvimento.

Faixas de referência V19:
- hero: `clamp(48px, 5.15vw, 70px)`;
- títulos de seção: `clamp(38px, 4.05vw, 56px)`;
- CTA final: `clamp(42px, 4.6vw, 62px)`;
- subtítulos/cards devem permanecer proporcionais.

### Prova social aprovada — V23
Depoimentos devem ser apresentados como micro-cases:
contexto curto → resultado comercial concreto → fala real → identificação preservada.

Não destacar valores quando eles puderem reduzir a percepção de escala do serviço atual.
Não inventar nomes, cargos, empresas ou detalhes de implementação.
Quando o depoimento pertence a trabalho anterior conduzido pela fundadora, contextualizar com precisão em vez de atribuí-lo retroativamente a uma oferta atual.

No projeto La Signé, a seção de prova social deve ficar entre Método e Soluções.

### Depoimentos refinados — V24
Na La Signé, a seção de depoimentos deve priorizar equilíbrio visual e leitura rápida.
Usar retratos reais quando houver autorização ou envio da cliente.
Preferir cards uniformes com: nome, categoria curta, resultado comercial, contexto curto e uma frase de prova.
Evitar excesso de texto e evitar cards com quantidades muito diferentes de conteúdo.
O título aprovado da seção é: “Resultados de clientes”.
A logo oficial deve ser aplicada no header e footer preservando respiro superior e inferior.
