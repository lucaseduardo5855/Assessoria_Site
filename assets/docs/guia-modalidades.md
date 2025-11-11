## Guia de Modalidades da Z4

Este passo a passo explica três pontos principais para você manter e evoluir as páginas de modalidades:

1. **Como o clique em uma modalidade leva para outra página.**
2. **Como a estrutura (layout) de cada modalidade está organizada.**
3. **Como foi construída a estilização no arquivo `css/modalidade.css`.**

---

### 1. Navegação: do card para a página da modalidade

- **Arquivo responsável:** `assets/index.html`.
- Na seção `Modalidades Esportivas`, cada card é um link (`<a class="servico-link" href="corrida.html">`).
- O atributo `href` indica qual arquivo HTML será aberto. Exemplo:
  - `href="corrida.html"` → abre `assets/corrida.html`.
  - `href="musculacao.html"` → abre `assets/musculacao.html`.
- Para adicionar uma nova modalidade, basta criar um novo arquivo HTML (mesmo padrão dos demais) e acrescentar um card com `href="nova-modalidade.html"` na lista.
- **Resumo:** o clique funciona porque o navegador abre o arquivo indicado no `href`. Não há JavaScript; é só HTML.

---

### 2. Estrutura das páginas de modalidade
Todos os arquivos (`corrida.html`, `trail-run.html`, `musculacao.html`, `treinamento-funcional.html`) seguem o mesmo esqueleto:

1. **`<head>`** – importa fontes do Google, ícones do Font Awesome e a folha de estilos `css/modalidade.css`.
2. **`<header class="top-bar">`** – barra superior com botão de voltar e logo.
3. **`<section class="modalidade-hero ...">`** – faixa inicial com título e texto motivacional. A classe extra define a cor (ex.: `corrida-hero`, `trail-hero`).
4. **`<main>`** – contém o bloco principal:
   - `div.modalidade-layout.reverse` ajusta a ordem do grid (texto antes da foto).
   - `section.modalidade-content` traz título, parágrafos e lista de benefícios com ícones.
   - `div.action-buttons` inclui o botão “Falar com a equipe” com link para WhatsApp.
   - `figure.modalidade-photo` exibe a imagem da modalidade.
5. **`<footer class="modalidade-footer">`** – rodapé com identificação e link rápido de contato.

Para replicar para outra modalidade:

1. Copie um arquivo existente.
2. Atualize título, textos, ícone/benefícios e links do WhatsApp.
3. Troque a imagem dentro de `figure.modalidade-photo`.
4. Se quiser cores diferentes no topo, crie uma nova classe de hero no CSS (ver próximo tópico) e aplique em `<section class="modalidade-hero nova-hero">`.

---

### 3. Estilos no `modalidade.css`

Os estilos foram pensados para reaproveitar o máximo possível entre as páginas.

- **Variáveis de cor:** definidas no `:root` para usar os mesmos tons em todo o layout.
- **`body`, `a`, `.top-bar`, `.back-link`, `.logo-link`:** regras gerais de tipografia, espaçamento e efeitos de hover.
- **Hero (`.modalidade-hero`):**
  - Base com gradiente escuro para garantir contraste.
  - Cada modalidade ganha uma classe específica, como `.corrida-hero`, `.trail-hero`, `.musculacao-hero`, `.funcional-hero`, que definem gradientes diferentes (ou imagens de fundo, se desejar).
  - `modalidade-hero-content` centraliza o texto e define larguras máximas.
- **Layout principal (`.modalidade-layout`):**
  - Grid com duas colunas: conteúdo e foto.
  - A classe `reverse` apenas inverte o peso das colunas para destacar o texto primeiro.
- **Conteúdo (`.modalidade-content`):**
  - Usa `display: grid` para manter espaçamento uniforme entre os elementos.
  - Títulos em caixa alta, parágrafos com entrelinhas confortáveis.
- **Benefícios (`.benefits-simple`):**
  - Lista sem marcadores (`list-style: none`).
  - Cada item recebe um ícone (`.benefit-icon`) + texto (`.benefit-text` com `<span>` para o título).
  - Os ícones vêm do Font Awesome, por isso a importação no `<head>`.
- **Botões (`.action-button`):**
  - Gradiente em azul, bordas arredondadas e sombra para destacar o CTA.
  - Efeito hover levanta o botão levemente.
- **Responsividade (`@media`):**
  - Ajusta o grid para uma coluna em telas menores.
  - Reduz padding do topo e reorganiza rodapé e hero em dispositivos móveis.

**Dica:** sempre que criar uma nova classe de hero, mantenha a estrutura:

```css
.modalidade-hero.nova-modalidade-hero {
    background: linear-gradient(...); /* ou gradient + imagem */
}
```

Assim você garante que o estilo base continua valendo e só altera as cores ou a imagem.

---

### Checklist rápido para criar uma nova modalidade

1. Duplicar um arquivo existente e renomear (ex.: `nova-modalidade.html`).
2. Ajustar textos, benefícios, ícones e links.
3. Colocar a nova imagem dentro da pasta `assets/img` e atualizar o `<img>`.
4. Criar, se necessário, uma nova classe de hero no `modalidade.css`.
5. Adicionar o novo card na seção `Modalidades Esportivas` do `index.html` com `href="nova-modalidade.html"`.

Seguindo estes passos, todas as páginas manterão o mesmo visual profissional e o fluxo de navegação continuará funcionando perfeitamente.

