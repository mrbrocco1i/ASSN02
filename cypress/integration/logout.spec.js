describe('logout', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/logout");
  })

  describe('before login', () => {
    it('Shows a prompt', () => {
      cy.get('.vue-title').should("contain", "You have logged out!");
    })
  })

  describe('after login', () => {
    it('Shows a button', () => {
      cy.visit("http://localhost:8080/#/login")
      cy.get(':nth-child(1) > .form__input').type('abc');
      cy.get(':nth-child(2) > .form__input').type('123');
      cy.get('.btn').click();
    })
    after(() => {
      cy.wait(1000)
      cy.visit('http://localhost:8080/#/logout')
      cy.get('.vue-title').should('contain','Are you sure?');
      cy.get('.btn').click();
      cy.get('.typo__p').should('contain','logged out!');
    })
  })
})
