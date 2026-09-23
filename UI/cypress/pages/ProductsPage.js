// Seletores validados no projeto anterior (teste-ebac-ui), rodado
// contra a loja real (lojaebac.ebaconline.art.br).

class ProductsPage {
  visitarUrl() {
    cy.visit('produtos');
  }

  buscarProduto(nomeProduto) {
    cy.get('[name="s"]').eq(1).type(nomeProduto);
    cy.get('.button-search').eq(1).click();
  }

  buscarProdutoLista(nomeProduto) {
    cy.get('.products > .row').contains(nomeProduto).click();
  }

  visitarProduto(nomeProduto) {
    const urlFormatada = nomeProduto.replace(/ /g, '-');
    cy.visit(`produtos/${urlFormatada}`);
  }

  // NOVO - não existia no projeto original, escrito para o CT003 (US-0004).
  // Comportamento real (mensagem/tela de "nenhum resultado") ainda não
  // validado contra a loja - ajustar assertivas ao rodar pela primeira vez.
  buscarProdutoSemResultado(termoAleatorio) {
    cy.get('[name="s"]').eq(1).type(termoAleatorio);
    cy.get('.button-search').eq(1).click();
  }
}

export default new ProductsPage();
