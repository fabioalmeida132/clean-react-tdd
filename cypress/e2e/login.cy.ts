describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should ', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório')
  })
})
