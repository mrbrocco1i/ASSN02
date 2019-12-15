const apiURL = "http://localhost:3000/";

describe("Add Beverages page", () => {
  beforeEach(() => {
    // Delete all donations in the API's datastore
    cy.request(`${apiURL}beverages`)
      .its("body")
      .then(beverages => {
        beverages.forEach(element => {
          cy.request("DELETE", `${apiURL}beverages/deleteById/${element._id}`);
        });
      });
    // Populate API's datastore
    cy.fixture("beverages").then(beverages => {
      let [d1, d2, d3, d4, ...rest] = beverages;
      let four = [d1, d2, d3, d4];
      four.forEach(beverage => {
        cy.request("POST", `${apiURL}beverages/addRecord`, beverage);
      });
    });
    cy.visit("http://localhost:8080/#/add");

  });

  describe('With valid attributes', () => {
    it('Shows success msg', () => {
      cy.get('.vue-title').should('contain', 'Add Beverage')
      cy.get('#type').select("water")
      cy.get('.form__input').eq(0).type(10)
      cy.get('.form__input').eq(1).type('test')
      cy.get('.form__input').eq(2).type('test')
      cy.get('.form__input').eq(3).type(100)
      cy.get('.form__input').eq(4).type(1)
      cy.get('.btn').click()
      cy.get('.typo__p').should('contain', 'Record Added Successfully!')
    })
    after(() => {
      cy.wait(100)
        .visit('http://localhost:8080/#/beverages')
        .get('tbody')
        .wait(500)
        .find('tr')
        .should("have.length", 5);
    })
  })

  describe('With invalid attributes', () => {
    it('Shows errors', () => {
      cy.get('.vue-title').should('contain', 'Add Beverage')
      cy.get('.btn').click()
      cy.get('.typo__p').should('contain', 'Please Fill in the Form Correctly.')
    })
  })
    after(() => {
      cy.wait(100)
        .visit('http://localhost:8080/#/beverages')
        .get('tbody')
        .find('tr')
        .should("have.length", 4);
  })
})

