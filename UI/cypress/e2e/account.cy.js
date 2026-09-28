import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage';

describe('US-0008 - Detalhes da Conta', () => {
  beforeEach(() => {
    AccountPage.visitEditAccount();

    LoginPage.login(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));
  });

  // CT001 - Caminho feliz: editar dados pessoais com sucesso
  // Baseado e validado em execução real (teste-ebac-ui/detalhes-conta.cy.js)
  //
  // Proteção: o afterEach reverte nome/sobrenome/display name para os
  // valores originais da conta admin (confirmados por print real da loja:
  // First name "admin", Last name "admin", Display name "admin"), para
  // não deixar dado de teste "sujo" afetando outros specs (ex.: a
  // saudação verificada em login.cy.js).
  it('CT001 - deve completar detalhes da conta com sucesso', () => {
    AccountPage.editarDetalhes('Admin', 'Teste', 'admin.qe');

    AccountPage.getSuccessMessage().should('contain', 'Detalhes da conta modificados com sucesso.');
  });

  // CT002 - Caminho negativo: impedir e-mail já utilizado por outra conta
  //
  // Depende de uma conta secundária existir no ambiente com o e-mail
  // configurado em DUPLICATE_EMAIL (cypress.env.json), criada manualmente
  // via Register, fora do fluxo automatizado, para nunca reutilizar a
  // conta principal (ADMIN_EMAIL) neste teste.
  //
  // Proteção: independente do resultado, o afterEach abaixo garante que
  // o e-mail da conta admin volte ao valor original (ADMIN_EMAIL), para
  // não repetir o incidente em que o e-mail principal foi trocado por engano.
  it('CT002 - não deve permitir e-mail já utilizado por outra conta', () => {
    AccountPage.editarEmail(Cypress.env('DUPLICATE_EMAIL'));

    AccountPage.getErrorMessage().should('exist');
  });

  afterEach(() => {
    AccountPage.visitEditAccount();
    AccountPage.editarDetalhes('admin', 'admin', 'admin');

    AccountPage.visitEditAccount();
    AccountPage.editarEmail(Cypress.env('ADMIN_EMAIL'));
  });
});
