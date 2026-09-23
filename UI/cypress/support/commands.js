// Comandos customizados reaproveitados e validados no projeto anterior
// (teste-ebac-ui), rodados contra a loja real (lojaebac.ebaconline.art.br).

Cypress.Commands.add('login', (usuario, senha) => {
  cy.get('#username').type(usuario);
  cy.get('#password').type(senha);
  cy.get('.woocommerce-form > .button').click();
});

Cypress.Commands.add('editarDetalhesConta', (nome, sobrenome, displayName) => {
  cy.get('#account_first_name').clear().type(nome);
  cy.get('#account_last_name').clear().type(sobrenome);
  cy.get('#account_display_name').clear().type(displayName);
  cy.get('.woocommerce-Button').click();
});
