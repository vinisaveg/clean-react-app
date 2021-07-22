import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('Should present EmailInUseError on 403', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 403,
      body: {
        error: faker.random.words()
      }
    })

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())

    const password = faker.random.alphaNumeric(10)

    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('exist').should('have.text', 'Esse e-mail ja esta em uso')

    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 400,
      body: {
        error: faker.random.words()
      }
    })

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())

    const password = faker.random.alphaNumeric(10)

    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('have.text', 'Algo de errado aconteceu. Tente novamente em breve')

    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid()
      }
    })

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())

    const password = faker.random.alphaNumeric(10)

    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('have.text', 'Algo de errado aconteceu. Tente novamente em breve')

    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    })

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())

    const password = faker.random.alphaNumeric(10)

    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password).type('{enter}') // use instead of cy.getByTestId('submit').click()

    cy.getByTestId('errorWrap').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window()
      .then((window) => assert.isOk(window.localStorage.getItem('accessToken')))
      .end()
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /signup/, {
      statusCode: 200
    }).as('request')

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())

    const password = faker.random.alphaNumeric(10)

    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)

    cy.getByTestId('submit').dblclick()

    cy.get('@request.all').should('have.length', 1)
  })
})
