describe("map", () => {
  beforeEach( () => {
    cy.visit("http://localhost:8080/#/map")
  })

  it("Shows a header", () => {
    cy.get('.vue-title').should('contain', 'Google Map')
  })
  it("Shows a comment", () => {
    cy.get('#app1 > :nth-child(2)').should('contain', 'Check')
  })
})
