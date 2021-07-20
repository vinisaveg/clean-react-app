import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo invalido: email').should('contain.text', '🔴')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo invalido: field').should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials provided', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))

    cy.getByTestId('submit').click()

    cy.getByTestId('errorWrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('exist')
      .should('have.text', 'Credenciais invalidas')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').focus().type('mango@gmail.com')

    cy.getByTestId('password').focus().type('12345')

    cy.getByTestId('submit').click()

    cy.getByTestId('errorWrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window()
      .then((window) => assert.isOk(window.localStorage.getItem('accessToken')))
      .end()
  })
})
