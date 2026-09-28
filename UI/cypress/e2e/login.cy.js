import LoginPage from '../pages/LoginPage';

describe('US-0002 - Login na plataforma', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  afterEach(() => {
    cy.screenshot();
  });

  // CT001 - Caminho feliz: login com credenciais válidas
  // Baseado e validado em execução real (teste-ebac-ui/login.cy.js)
  it('CT001 - deve realizar login com sucesso usando credenciais válidas', () => {
    LoginPage.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));

    // Texto confirmado por print real da loja (painel Minha Conta)
    LoginPage.getDashboardGreeting().should('contain', 'Olá, admin (não é admin? Sair)');
  });

  // CT002 - Caminho negativo: login com senha incorreta
  // Baseado e validado em execução real (teste-ebac-ui/login.cy.js)
  it('CT002 - deve exibir mensagem de erro ao informar senha incorreta', () => {
    LoginPage.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('INVALID_PASSWORD'));

    LoginPage.getErrorMessage().should('exist');
  });
});
