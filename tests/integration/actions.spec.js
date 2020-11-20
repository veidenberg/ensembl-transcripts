
/// <reference types="cypress" />

describe('Loading example gene', () => {
  //clear cache before the tests
  before(() => {
    cy.clearLocalStorage()
  })

  //check that the development server is running
  it('successfully loads', () => {
    cy.visit('http://localhost:8000')
  })

  /*
    action: user submits empty gene ID
    result: app renders the example gene
  */

  it('shows error message', () => {
    cy.get('.searchbox input').focus().clear().type('{enter}');
    cy.get('.search .error').should('contain', 'Empty gene ID');
  })

  it('loads example gene ID', () => {
    cy.get('.searchbox input').should('have.value', 'ENSG00000157764')
  })

  it('shows gene name', () => {
    cy.get('.genename').should('contain', 'BRAF');
  })

  it('draws 21 transcripts', () => {
    cy.get('.transcript').should('have.length', 21)
  })

  /*it('clears error message', () => {
    cy.wait(4000); //error message display duration
    cy.get('.search .error').should('to.be.empty');
  })*/

  it('shows gene ID in history', () => {
    cy.get('.history li').should('contain', 'ENSG00000157764')
  })
})