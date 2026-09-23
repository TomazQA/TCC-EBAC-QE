// Seletores validados no projeto anterior (teste-ebac-ui), rodado
// contra a loja real (lojaebac.ebaconline.art.br).

class CartPage {
  addProdutoCarrinho(tamanho, cor, quantidade) {
    cy.get('.button-variable-item-' + tamanho).click();
    cy.get('.button-variable-item-' + cor).click();
    cy.get('.input-text').clear().type(quantidade);
    cy.get('.single_add_to_cart_button').click();
  }

  getSuccessMessage() {
    return cy.get('.woocommerce-message');
  }

  // NOVO - não existia no projeto original, escrito para o CT003 (US-0001).
  // Comportamento real do bloqueio acima de 10 itens ainda não validado
  // contra a loja - ajustar assertivas ao rodar pela primeira vez.
  getErrorMessage() {
    return cy.get('.woocommerce-error');
  }
}

export default new CartPage();
