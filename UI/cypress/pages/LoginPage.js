// Seletores validados no projeto anterior (teste-ebac-ui), rodado
// contra a loja real (lojaebac.ebaconline.art.br).

class LoginPage {
  visit() {
    cy.visit('minha-conta');
  }

  fillUsername(username) {
    cy.get('#username').type(username);
    return this;
  }

  fillPassword(password) {
    cy.get('#password').type(password);
    return this;
  }

  submit() {
    cy.get('.woocommerce-form > .button').click();
    return this;
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  getErrorMessage() {
    return cy.get('.woocommerce-error');
  }

  getDashboardGreeting() {
    return cy.get('.woocommerce-MyAccount-content > :nth-child(2)');
  }
}

export default new LoginPage();
