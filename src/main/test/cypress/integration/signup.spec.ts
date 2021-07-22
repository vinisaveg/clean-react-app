import faker from 'faker'

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    cy.getByTestId('name-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    cy.getByTestId('passwordConfirmation-status')
      .should('have.attr', 'title', 'Campo obrigatorio')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('name-status').should('have.attr', 'title', 'Campo invalido: field').should('contain.text', '🔴')

    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo invalido: email').should('contain.text', '🔴')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo invalido: field').should('contain.text', '🔴')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('passwordConfirmation-status')
      .should('have.attr', 'title', 'Campo invalido: passwordConfirmation')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('name-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')

    const password = faker.random.alphaNumeric(6)

    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    cy.getByTestId('passwordConfirmation-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })
})
