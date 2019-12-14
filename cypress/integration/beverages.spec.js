const apiURL = "http://localhost:3000/";

describe("Manage Beverages page", () => {
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
    cy.visit("http://localhost:8080/#/beverages");

  });
  describe('delete function', () => {
    describe("For a confirmed delete operation", () => {
      it("reduces the no. of beverages by 1", () => {
        cy.get("tbody")
          .wait(500)
          .find("tr")
          .should("have.length", 4);
        // Click trash/delete link of 3rd donation in list
        cy.get("tbody")
          .find("tr")
          .eq(2)
          .find("td")
          .eq(8)
          .find("a")
          .click();
        // Click confirmation button
        cy.get("button")
          .contains("Delete")
          .click();
        cy.get("tbody")
          .find("tr")
          .should("have.length", 3);
      });
    });
    describe("For a cancelled delete operation", () => {
      it("leaves the list unchanged", () => {
        cy.wait(500)
        cy.get("tbody")
          .wait(500)
          .find("tr")
          .should("have.length", 4);
        // Click trash/delete link of 3rd donation in list
        cy.get("tbody")
          .find("tr")
          .eq(2)
          .find("td")
          .eq(8)
          .find("a")
          .click();
        // Click cancel button
        cy.get("button")
          .contains("Cancel")
          .click();
        cy.get("tbody")
          .find("tr")
          .should("have.length", 4);
      });
    });
  })

  describe("add function", () => {
    it ('Shows amount increased by 1', () => {
      cy.get('tbody')
        .wait(500)
        .find('tr')
        .eq(0)
        .find("td")
        .eq(6)
        .find('a')
        .click();
    })
    after(() => {
      cy.visit("http://localhost:8080/")
      cy.wait(500)
      cy.visit("http://localhost:8080/#/beverages")
      cy.wait(500)
      cy.get('tbody')
        .wait(500)
        .find('tr')
        .eq(0)
        .find("td")
        .eq(4)
        .should('contain',21)
    })
  })

  describe('edit', () => {
    describe('With valid attributes', () => {
      it('Shows success msg', () => {
        cy.get('tbody')
          .wait(500)
          .find('tr')
          .eq(0)
          .find("td")
          .eq(7)
          .find('a')
          .click();
        cy.wait(500)
        cy.get('.vue-title').should('contain','Update Beverage')
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
        cy.wait(500)
          .visit('http://localhost:8080/#/beverages')
          .wait(500)
          .get('tbody')
          .find('tr')
          .eq(0)
          .find('td')
          .eq(1)
          .should('contain', 'test')
      })
    })

    describe('With invalid attributes', () => {
      it('Shows errors', () => {
        cy.get('tbody')
          .wait(500)
          .find('tr')
          .eq(0)
          .find("td")
          .eq(7)
          .find('a')
          .click();
        cy.wait(100)
        cy.get('.vue-title').should('contain','Update Beverage')
        cy.get('.btn').click()
        cy.get('.typo__p').should('contain', 'Please Fill in the Form Correctly.')
      })
      after(() => {
        cy.wait(100)
          .visit('http://localhost:8080/#/beverages')
          .wait(100)
          .get('tbody')
          .wait(500)
          .find('tr')
          .eq(0)
          .find('td')
          .eq(1)
          .should('contain', 'FIJI Natural Artesian Water Bottles')
      })
    })
  })
});
