/// <reference types="Cypress" />

describe('Button component', () => {
  beforeEach(() => cy.getComponentOfStoryIframe('button').as('component'));

  context('Primary variant', () => {
    before(() => cy.goToStoryComponent('button--with-primary-variant'));

    it('Has btn class and btn--primary class:', () => {
      cy.get('@component').should('have.attr', 'class', 'btn btn--primary');
    });

    it('Has text inside:', () => {
      cy.get('@component').should('have.text', 'Hello Button');
    });
  });

  context('Secondary variant', () => {
    before(() => cy.goToStoryComponent('button--with-secondary-variant'));

    it('Has btn class, btn--primary class and btn--secondary class:', () => {
      cy.get('@component').should('have.attr', 'class', 'btn btn--primary btn--secondary');
    });

    it('Has text inside:', () => {
      cy.get('@component').should('have.text', 'Hello Button');
    });
  });

  context('Disabled variant', () => {
    before(() => cy.goToStoryComponent('button--with-disabled-prop-activated'));

    it('Has disabled attribute:', () => {
      cy.get('@component').should('have.attr', 'disabled', 'disabled');
    });

    it('Has text inside:', () => {
      cy.get('@component').should('have.text', 'Hello Button');
    });
  });

  context('With emoji', () => {
    before(() => cy.goToStoryComponent('button--with-emoji'));

    it('Has btn class and btn--primary class:', () => {
      cy.get('@component').should('have.attr', 'class', 'btn btn--primary');
    });

    it('Has an emoji:', () => {
      cy.get('@component').children('span').contains('😀');
    });
  });

  context('With custom styles', () => {
    before(() => cy.goToStoryComponent('button--with-custom-styles'));

    it('Has btn class and btn--primary class:', () => {
      cy.get('@component').should('have.attr', 'class', 'btn btn--primary btn--custom');
    });
  });
});
