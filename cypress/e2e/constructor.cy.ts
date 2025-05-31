const testURL = 'http://localhost:4000';

const burgerConstructor = '[data-cy=burger-constructor]';

const mainIngredientConstructor = '[data-cy=ingredients-main]';
const saucesConstructor = '[data-cy=ingredients-sauces]';
const bunsConstructor = '[data-cy=ingredients-buns]';

const orderButton = '[data-cy=order-button]';
const orderNumber = '[data-cy=order-number]';

const closeModal = '[data-cy=close-modal]';
const closeOverlay = '[data-cy=close-overlay]';

describe('тест доступности приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1440, 800);
    cy.visit(testURL);
  });

  it('тест добавления ингредиентов', () => {
    cy.get(mainIngredientConstructor).contains('Добавить').click();
    cy.get(bunsConstructor).contains('Добавить').click();
    cy.get(saucesConstructor).contains('Добавить').click();
    cy.get(burgerConstructor).contains('Ингредиент 2').should('exist');
    cy.get(burgerConstructor).contains('Ингредиент 4').should('exist');
  });
});

describe('тест работы модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1440, 800);
    cy.visit(testURL);
  });

  it('тест открытия модального окна', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('тест закрытия модального окна по кнопке', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(closeModal).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('тест закрытия модального окна по нажатию оверлея', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(closeOverlay).click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('тест создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem('refreshToken', 'mockedRefreshToken');
    cy.setCookie('accessToken', 'mockedAccessToken');
    cy.viewport(1440, 800);
    cy.visit(testURL);
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('тест оформление заказа', () => {
    cy.get(bunsConstructor).contains('Добавить').click();
    cy.get(mainIngredientConstructor).contains('Добавить').click();
    cy.get(saucesConstructor).contains('Добавить').click();

    cy.get(orderButton).click();
    cy.get(orderNumber).contains('123456').should('exist');

    cy.get(closeModal).click();
    cy.get(orderNumber).should('not.exist');

    cy.get(burgerConstructor).contains('Ингредиент 1').should('not.exist');
    cy.get(burgerConstructor).contains('Ингредиент 2').should('not.exist');
    cy.get(burgerConstructor).contains('Ингредиент 4').should('not.exist');
  });
});
