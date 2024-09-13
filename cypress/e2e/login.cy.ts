import { faker } from '@faker-js/faker'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function randomize (array: any[]) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
  beforeEach(() => {

    const baseUrl = Cypress.config('baseUrl')
    cy.log(`Base URL configurada: ${baseUrl}`) // Logando no Cypress
    console.log(`Base URL configurada: ${baseUrl}`) // Logando no console
    
    cy.visit('/login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-wrap')
      .should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')
    cy.getByTestId('email-label')
      .should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password-wrap')
      .should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('have.attr', 'readOnly')
    cy.getByTestId('password-label')
      .should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    const password = faker.lorem.word(4)
    const email = faker.lorem.word()
    cy.getByTestId('email').focus().type(email)
    cy.getByTestId('email-wrap')
      .should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('email-label')
      .should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password').focus().type(String(password))
    cy.getByTestId('password-wrap')
      .should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password-label')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    const password = faker.lorem.word(5)
    const email = faker.internet.email()
    cy.getByTestId('email').focus().type(email)
    cy.getByTestId('email-wrap')
      .should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')
    cy.getByTestId('password').focus().type(String(password))
    cy.getByTestId('password-wrap')
      .should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if Unexpected error', () => {
    cy.intercept('POST', /login/, {
      statusCode: randomize([400, 402, 403, 500]),
      body: {
        error: faker.lorem.sentence()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(String(faker.internet.password()))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present error if invalid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.lorem.sentence()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(String(faker.internet.password()))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save AccessToken if valid credentials are provided on enter', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(String(faker.internet.password())).type('{enter}')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should present error if invalid data returned', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        invalidPropety: faker.string.uuid()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(String(faker.internet.password()))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
