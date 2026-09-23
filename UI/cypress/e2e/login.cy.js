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
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });

    // Texto confirmado por print real da loja (painel Minha Conta)
    LoginPage.getDashboardGreeting().should('contain', 'Olá, admin (não é admin? Sair)');
  });

  // CT002 - Caminho negativo: login com senha incorreta
  // Baseado e validado em execução real (teste-ebac-ui/login.cy.js)
  it('CT002 - deve exibir mensagem de erro ao informar senha incorreta', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.invalidUser.username, users.invalidUser.password);
    });

    LoginPage.getErrorMessage().should('exist');
  });
});
