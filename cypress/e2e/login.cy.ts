import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl
const realEmail = Cypress.env('realEmail')
const realPassword = Cypress.env('realPassword')
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    const password = faker.lorem.word(4)
    const email = faker.lorem.word()
    cy.getByTestId('email').focus().type(email)
    cy.getByTestId('email-status').should('have.attr', 'title', 'Valor inválido').should('contain.text', '🔴')
    cy.getByTestId('password').focus().type(String(password))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Valor inválido').should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    const password = faker.lorem.word(5)
    const email = faker.internet.email()
    cy.getByTestId('email').focus().type(email)
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')
    cy.getByTestId('password').focus().type(String(password))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
    const password = faker.lorem.word(5)
    const email = faker.internet.email()
    cy.getByTestId('email').focus().type(email)
    cy.getByTestId('password').focus().type(String(password))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save AccessToken if valid credentials are provided', () => {
    cy.getByTestId('email').focus().type(realEmail)
    cy.getByTestId('password').focus().type(String(realPassword))
    cy.getByTestId('submit').click()
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
