import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage';

describe('US-0008 - Detalhes da Conta', () => {
  beforeEach(() => {
    AccountPage.visitEditAccount();

    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
  });

  it('CT001 - deve completar detalhes da conta com sucesso', () => {
    AccountPage.editarDetalhes('Admin', 'Teste', 'admin.qe');

    AccountPage.getSuccessMessage().should('contain', 'Detalhes da conta modificados com sucesso.');
  });

  it('CT002 - não deve permitir e-mail já utilizado por outra conta', () => {
    const emailJaExistente = 'qa.duplicado@teste.com';

    AccountPage.editarEmail(emailJaExistente);

    AccountPage.getErrorMessage().should('exist');
  });

  afterEach(() => {
    AccountPage.visitEditAccount();
    AccountPage.editarDetalhes('admin', 'admin', 'admin');

    AccountPage.visitEditAccount();
    AccountPage.editarEmail('admin@admin.com');
  });
});
