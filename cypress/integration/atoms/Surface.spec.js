/// <reference types="Cypress" />

describe('Surface component', () => {

  context('With text', () => {
    before(() => cy.goToStoryComponent('surface--with-text'));

    it('Contains some text:', () => {
      cy.getComponentOfStoryIframe('.surface__container')
        .should('have.text', 'Hello Surface');
    });
  });

  context('With component', () => {
    before(() => {
      cy.goToStoryComponent('surface--with-component');
    });

    beforeEach(() => {
      cy.getComponentOfStoryIframe('.surface__container').as('component');
    });

    it('Has n children: 4', () => {
      cy.get('@component').children().should('have.length', 4);
    });

    it('Has 2 children of type: "label"', () => {
      cy.get('@component').children('label').should('have.length', 2);
    });

    it('Has 2 children of type: "input"', () => {
      cy.get('@component').children('input').should('have.length', 2);
    });
  });

  context('With custom styles', () => {
    before(() => {
      cy.goToStoryComponent('surface--with-class-name-prop');
    });

    beforeEach(() => {
      cy.getComponentOfStoryIframe('.surface__container').as('component');
    });

    it('Has n children: 4', () => {
      cy.getComponentOfStoryIframe('.surface__container')
        .children().should('have.length', 4);
    });

    it('Has 1 child with id: "address"', () => {
      cy.get('@component').children('#address').should('have.length', 1);
    });

    it('Has 1 child with id: "city"', () => {
      cy.get('@component').children('#city').type('Bogotá D.C.').should('contain.value', 'Bogotá D.C.');
    });
  });
});
