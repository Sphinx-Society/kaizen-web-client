/// <reference types="Cypress" />

// Tests built around our Storybook
describe('Storybook', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006');
  });

  context('Component:Surface', () => {
    beforeEach(() => {
      cy.get('#explorersurface');
    });

    it('should visit Surface with text', () => {
      cy.get('#surface--with-text').click();

      // Now get the iframe for the components and make assertions on that.
      cy.get('#storybook-preview-iframe').then(($iframe) => {
        const doc = $iframe.contents();
        cy.wrap(doc.find('.surface__container')).should('have.text', 'Hello Surface');
      });
    });
  });
});