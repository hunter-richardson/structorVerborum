import 'cypress';
import { mount } from 'cypress/vue';
import numerare from '../../../facies/numerare.vue';

describe('Romano Anglicum numerum convertere', () => {
  it('converteret', () => {
    const cy: Cypress.Chainable = mount(numerare as any);
    //    cy.wait(1000);

    cy.get('#effectus')
      .should('have.text', 'N');
    cy.get('#integer')
      .type('42');
    //    cy.wait(1000);
    cy.get('#effectus')
      .should('have.text', 'XLII');
    //    cy.wait(1000);
    cy.get('#numerator')
      .type('7');
    //    cy.wait(1000);
    cy.get('#effectus')
      .should('have.text', 'XLIIS·');
    //    cy.wait(1000);
    cy.get('#aequa')
      .click();
    //    cy.wait(10000);
    cy.get('v-card')
      .should('have.subtitle', 'Numerus')
      .should('have.title', 'XLIIS·');
    cy.get('#doctum.numerus')
      .should('exist');
  });
});
