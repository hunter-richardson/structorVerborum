import 'cypress';
import 'cypress-map';
import { mount } from 'cypress/vue';
import quaerere from '../../facies/quaerere.vue';
import { inflectenda } from '../../miscella/enumerationes';

function ullum (res: {
  categoria: string,
  accusativa: string;
}): void {
  describe(res.accusativa.concat(' invenire'), () => {
    it('inveniret', () => {
      const cy: Cypress.Chainable = mount(quaerere as any);
      // cy.wait(1000);

      cy.get('#quaerenda.categoriae')
        .select(res.categoria);
      // cy.wait(1000);
      cy.get('#quaerenda.categoriae')
        .find('option:selected')
        .should('have.text', res.categoria.capitalize());
      cy.get('#fortuna')
        .click();
      // cy.wait(1000);

      if (inflectenda(res.categoria)) {
        cy.get('#tabula')
          .should('exist');
        cy.get('#fortuna')
          .click();
        // cy.wait(1000);
      }

      cy.get('v-card')
        .should('have.subtitle', res.categoria.capitalize())
        .its('title')
        .should('not.be.empty');
      cy.get(`#doctum.${res.categoria}`)
        .should('exist');
    });
  });
}

describe('omnia invenire', () => {
  ullum({
    categoria: 'coniunctio',
    accusativa: 'coniunctionem'
  });

  ullum({
    categoria: 'interiectio',
    accusativa: 'interiectionem'
  });

  ullum({
    categoria: 'praepositio',
    accusativa: 'praepositionem'
  });

  ullum({
    categoria: 'actus',
    accusativa: 'actum'
  });

  ullum({
    categoria: 'adiectivum',
    accusativa: 'adiectivum',
  });

  ullum({
    categoria: 'adverbium',
    accusativa: 'adverbium',
  });

  ullum({
    categoria: 'nomen',
    accusativa: 'nomen',
  });

  ullum({
    categoria: 'pronomen',
    accusativa: 'pronomen',
  });

  it('numeramen inveniret', () => {
    const cy: Cypress.Chainable = mount(quaerere as any);
    // cy.wait(1000);

    cy.get('#quaerenda.categoriae')
      .select('numeramen');
    // cy.wait(1000);
    cy.get('#quaerenda.categoriae')
      .find('option:selected')
      .should('have.text', 'Numeramen');
    cy.get('#fortuna')
      .click();
    // cy.wait(1000);

    let referendum: string = '';
    cy.get('#tabula').should('exist');
    cy.get('[id^="colamen_"]')
      .sample().its('id')
      .then(id => referendum = id?.replace('^colamen_', '') ?? '');
    cy.get(`#colamen_${referendum}`).click();
    // cy.wait(1000);
    cy.get('[id^="aperi_"]')
      .first().click();
    // cy.wait(1000);

    let categoria = referendum;
    if (referendum !== 'numerus') {
      cy.get('#tabula').should('exist');
      cy.get('fortuna').click();
      // cy.wait(1000);
    } if (referendum === 'fractionale') {
      categoria = 'nomen';
    } else if (/(o|ca)rdinale|(distribu|multiplica)tivum$/.test(referendum)) {
      categoria = 'adiectivum';
    }

    cy.get('v-card')
      .should('have.subtitle', categoria.capitalize())
      .its('title').should('not.be.empty');
    cy.get(`[id^="doctum."]`).should('exist');
  });
});
