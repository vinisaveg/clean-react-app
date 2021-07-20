describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('errorWrap').should('not.have.descendants')
  })
})
