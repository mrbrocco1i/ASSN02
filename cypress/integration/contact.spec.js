const apiURL = "http://localhost:3000/"

describe('contact', () => {
  beforeEach(() => {
    cy.request(`${apiURL}comment`)
      .its("body")
      .then(comments => {
        comments.forEach(element => {
          cy.request("DELETE",`${apiURL}deleteCmt/${element._id}`)
        })
      })
    cy.fixture("comments").then(comments => {
      let [c1,c2] = comments;
      let two = [c1,c2];
      two.forEach(comment => {
        cy.request("POST", `${apiURL}addComment`, comment)
      })
    })
    cy.visit("http://localhost:8080/#/contact")
  })

  it('Shows a header', () => {
    cy.get('.vue-title').should('contain','Contact')
  })

  describe('submit form', () => {
    describe("With valid attributes", () => {
      it('Allows comment to be submitted', () => {
        cy.get('.form__label').should('contain','Leave')
        cy.get('.error').should('contain', 'Required')
        cy.get('.form__input').type('Too expensive!');
        cy.get('.error').should('not.exist');
        cy.contains("Thank you!").should('not.exist');
        cy.get('.btn').click();
        cy.contains('Thank you!').should('exist');
      })
    })

    describe("With invalid/blank attributes", () => {
      it("Shows error until all attributes are valid", () => {
        cy.get('.btn').click();
        cy.get('.error').should('contain','Required')
        cy.get('.typo__p').contains('Please Fill in');
        cy.get('.form__input').type('Too expensive!');
        cy.get('.error').should('not.exist')
      })
    })
  })
})
