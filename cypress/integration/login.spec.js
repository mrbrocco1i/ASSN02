describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/login");
  })
  it("Shows a header", () => {
    cy.get('.vue-title').should("contain", "Administrator Login");
  });

  describe('Submit', () => {
    describe("With right username and password", () => {
      it('Allows username and  password to be submitted and shows login page', () => {
        cy.get(':nth-child(1) > .form__label').should('contain','Username');
        cy.get(':nth-child(3) > .form__label').should('contain','Password');
        cy.get(':nth-child(1) > .form__input').type('abc');
        cy.get('.form__input').eq(1).type('123');
        cy.get('.btn').click();
        cy.get('.vue-title').should('contain','You have logged in!');
      })
    })
    describe('With wrong username', () => {
      it('Allows username and  password to be submitted and returns error', () => {
        cy.get(':nth-child(1) > .form__label').should('contain','Username');
        cy.get(':nth-child(3) > .form__label').should('contain','Password');
        cy.get(':nth-child(1) > .form__input').type('Corey');
        cy.get('.form__input').eq(1).type('123');
        cy.get('.btn').click();
        cy.get('.typo__p').should('contain', 'No Such Username!');
      })
    })
    describe('With right username but wrong password', () => {
      it('Allows username and  password to be submitted and returns error', () => {
        cy.get(':nth-child(1) > .form__label').should('contain','Username');
        cy.get(':nth-child(3) > .form__label').should('contain','Password');
        cy.get(':nth-child(1) > .form__input').type('abc');
        cy.get('.form__input').eq(1).type('1234');
        cy.get('.btn').click();
        cy.get('.typo__p').should('contain', 'Password is not correct!');
      })
    })
    describe('With invalid attributes', () => {
      it('Returns error', () => {
        cy.get('.btn').click();
        cy.get('form > :nth-child(2)').should('contain','Username is Required')
        cy.get('form > :nth-child(4)').should('contain','Password is Required')
        cy.get('.typo__p').should('contain','Please Fill in the Form Correctly.')
      })
    })
  })
})
