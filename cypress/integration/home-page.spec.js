describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#")
  })

  it("Shows a header", () => {
    cy.get(".vue-title").should("contain", "Welcome to Vending Machine Stock Management System!");
  });

  describe("Nav Bar", () => {
    it("Shows the required links", () => {
      cy.get(".navbar-nav")
        .eq(0)
        .within(() => {
          cy.get(".nav-item")
            .eq(0)
            .should("contain", "Home");
          cy.get(".nav-item")
            .eq(1)
            .should("contain", "Manage Beverages");
          cy.get(".nav-item")
            .eq(2)
            .should("contain", "Add");
          cy.get(".nav-item")
            .eq(3)
            .should("contain", "Map");
        })

      cy.get(".navbar-nav")
        .eq(1)
        .within(() => {
          cy.get(".nav-item")
            .eq(0)
            .should("contain", "Contact");
          cy.get(".nav-item")
            .eq(1)
            .should("contain", "Login");
          cy.get(".nav-item")
            .eq(2)
            .should("contain", "Logout");
        })
    })
  })

  it("Redirects when links are clicked", () => {
    cy.get('tr > :nth-child(1) > :nth-child(2) > a').click();
    cy.url().should("include", "/login");
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(1)
      .click();
    cy.url().should("include", "/beverages");
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(2)
      .click();
    cy.url().should("include", "/add");
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(3)
      .click();
    cy.url().should("include", "/map");
    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(0)
      .click();
    cy.url().should("include", "/contact");
    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(1)
      .click();
    cy.url().should("include", "/login");
    cy.get(".navbar-nav")
      .eq(1)
      .find(".nav-item")
      .eq(2)
      .click();
    cy.url().should("include", "/logout");
  });
})
