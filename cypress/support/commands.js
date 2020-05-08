/// <reference types="Cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('goToStoryComponent', (nameComponent) => {
  cy.visit(nameComponent).get(`#${nameComponent}`).click();
});

Cypress.Commands.add('getComponentOfStoryIframe', (querySelector) => {
  // Now get the iframe for the components and make assertions on that.
  cy.get('#storybook-preview-iframe').then(($iframe) => {
    const element = cy.wrap($iframe.contents().find(querySelector));
    return element;
  });
});
