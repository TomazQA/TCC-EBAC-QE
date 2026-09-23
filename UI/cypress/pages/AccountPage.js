// Seletores validados no projeto anterior (teste-ebac-ui), rodado
// contra a loja real (lojaebac.ebaconline.art.br).

class AccountPage {
  visitEditAccount() {
    cy.visit('minha-conta/edit-account');
  }

  editarDetalhes(nome, sobrenome, displayName) {
    cy.get('#account_first_name').clear().type(nome);
    cy.get('#account_last_name').clear().type(sobrenome);
    cy.get('#account_display_name').clear().type(displayName);
    cy.get('.woocommerce-Button').click();
  }

  // NOVO - não existia no projeto original, escrito para o CT002 (US-0008).
  // Comportamento real de e-mail duplicado ainda não validado contra a
  // loja - ajustar assertivas ao rodar pela primeira vez.
  editarEmail(email) {
    cy.get('#account_email').clear().type(email);
    cy.get('.woocommerce-Button').click();
  }

  getSuccessMessage() {
    return cy.get('.woocommerce-message');
  }

  getErrorMessage() {
    return cy.get('.woocommerce-error');
  }
}

export default new AccountPage();
