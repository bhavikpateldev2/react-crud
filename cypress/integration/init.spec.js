/* = Date: 15-08-2021
   = check for all static text exists in the web page
   ---------------------------------------------------- */
context('Querying Text contents', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.get() - query DOM elements', () => {
    cy.get('.site-title').should('contain', 'React Person Dashboard')
    cy.get('[data-test-id="personlist"]').should('contain', 'Person List')
    cy.get('[data-test-id="addnewuser"]').should('have.class', 'ml-10')
    cy.get('[data-test-id="addnewuser"]')
      .invoke('css', 'margin-left')
      .should('equal', '10px')
  })
})

/* = Date: 15-08-2021
   = person list API test
   ---------------------------------------------------- */
describe('Request Person list', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays list of person from the API', () => {
    cy.request('https://www.swapi.tech/api/people')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers')
      })
  })
})

/* = Date: 15-08-2021
   = Person detail API test
   ---------------------------------------------------- */
describe('Request Person detail' , () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays person detail from the API', () => {
    cy.request('https://www.swapi.tech/api/people/1')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers')
      })
  })
})


/* = Date: 15-08-2021
   = On click, redirect to user detail screen
   ---------------------------------------------------- */
describe('User detail page', () => {
  it('successfullyredirect to page', () => {
    cy.visit('/')
    cy.wait(3000);
    cy.get('[data-test-id="user0"]').click()
    cy.location('pathname').should('eq', '/user/1')
  })
})
