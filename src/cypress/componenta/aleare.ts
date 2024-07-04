import 'cypress';
import { mount } from 'cypress/vue';
import quaerere from '../../facies/quaerere.vue';
import { inflectenda } from '../../miscella/enumerationes';

function ullum (categoria: string): void {
  describe('ullum invenire', () => {
    it('inveniret', () => {
      const cy: Cypress.Chainable = mount(quaerere as any);
      // cy.wait(1000);

      cy.get('#quaerenda.categoriae')
        .select(categoria);
      // cy.wait(1000);
      cy.get('#quaerenda.categoriae')
        .find('option:selected')
        .should('have.text', categoria);
      cy.get('#fortuna')
        .click();
      // cy.wait(1000);

      if (inflectenda(categoria)) {
        cy.get('#tabula')
          .should('exist');
        cy.get('#fortuna')
          .click();
        // cy.wait(1000);
      }

      cy.get('v-card')
        .should('have.subtitle', categoria.capitalize())
        .its('title')
        .should('not.be.empty');
      cy.get(`#doctum.${categoria}`)
        .should('exist');
    });
  });
}

describe('omnia invenire', () => {
  it('coniunctionem inveniret', () => {
    ullum('coniunctio');
  });

  it('interiectionem inveniret', () => {
    ullum('interiectio');
  });

  it('praepositionem inveniret', () => {
    ullum('praepositio');
  });

  it('actum inveniret', () => {
    ullum('actus');
  });

  it('adiectivum inveniret', () => {
    ullum('adiectivum');
  });

  it('adverbium inveniret', () => {
    ullum('adverbium');
  });

  it('nomen inveniret', () => {
    ullum('nomen');
  });

  it('pronomen inveniret', () => {
    ullum('pronoemen');
  });
});
