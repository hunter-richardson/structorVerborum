import 'cypress';
import { mount } from 'cypress/vue';
import calculare from '../../facies/calculare.vue';

type Optanda = {
  primus: string,
  operator: string,
  secundus: string,
  eventus: string,
};

function ullum (optanda: Optanda): void {
  describe('mathematicam calculare', () => {
    it('calcularet', () => {
      const cy: Cypress.Chainable = mount(calculare as any);
      // cy.wait(1000);

      cy.get('#praesentes.romanus')
        .should('have.text', 'N');
      // cy.wait(1000);

      Array.from(optanda.primus)
        .forEach(littera => {
          cy.get(`#actus_${littera}`)
            .click();
          // cy.wait(1000);
          cy.get('#praesentes.romanus')
            .its('text')
            .should('not.contain', 'N');
          // cy.wait(1000);
        });

      cy.get('#praesentes.romanus')
        .should('have.text', optanda.primus);
      cy.get(`#actus_${optanda.operator}`)
        .click();
      // cy.wait(1000);
      cy.get('#praevii.romanus')
        .should('have.text', optanda.primus);

      Array.from(optanda.secundus)
        .forEach(littera => {
          cy.get(`#actus_${littera}`)
            .click();
          // cy.wait(1000);
          cy.get('#praesentes.romanus')
            .its('text')
            .should('not.contain', 'N');
          // cy.wait(1000);
        });

      cy.get('#praesentes.romanus')
        .should('have.text', optanda.primus);
      cy.get(`#actus_=`)
        .click();
      // cy.wait(1000);
      cy.get('#praevii.romanus')
        .should('have.text', optanda.eventus);

      cy.get('#aequa')
        .click();
      // cy.wait(10000);
      cy.get('v-card')
        .should('have.subtitle', 'Numerus')
        .should('have.title', optanda.eventus);
      cy.get('#doctum.numerus')
        .should('exist');
    });
  });
}

describe('mathematicas calculare', () => {
  it('adderet', () => {
    ullum({
      primus: 'I',
      operator: '+',
      secundus: 'II',
      eventus: 'III'
    });
  });

  it('subtraheret', () => {
    ullum({
      primus: 'V',
      operator: '-',
      secundus: 'III',
      eventus: 'II'
    });
  });

  it('multiplicaret', () => {
    ullum({
      primus: 'II',
      operator: '•',
      secundus: 'III',
      eventus: 'VI'
    });
  });

  it('divideret', () => {
    ullum({
      primus: 'X',
      operator: '÷',
      secundus: 'II',
      eventus: 'V'
    });
  });

  it('maneret', () => {
    ullum({
      primus: 'XII',
      operator: '%',
      secundus: 'V',
      eventus: 'II'
    });
  });
});
