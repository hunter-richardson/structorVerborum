import 'cypress';
import 'cypress-map';
import { mount } from 'cypress/vue';
import '../../extensions/array';
import '../../extensions/string';
import Quaerere from '../../facies/quaerere.vue';
import { inflectenda } from '../../praebeunda/enumerationes.js';
import {
  Actus,
  Adiectivum,
  Adverbium,
  Nomen,
  Numeramen,
  Pronomen
  } from '../../praebeunda/verba';

function ullum (res: {
  categoria: string,
  accusativa: string
}): void {
  describe(`${res.accusativa} invenire`, () => {
    it('inveniret', () => {
      const cy: Cypress.Chainable = mount(Quaerere as any)
      // cy.wait(1000)

      cy.get('#quaerenda.categoriae').select(res.categoria)
      // cy.wait(1000)
      cy.get('#quaerenda.categoriae')
        .find('option:selected')
        .should('have.text', res.categoria.capitalize())
      cy.get('#fortuna').click()
      // cy.wait(1000)

      if (inflectenda(res.categoria)) {
        cy.get('#tabula').should('exist')
        cy.get('#fortuna').click()
        // cy.wait(1000)
      }

      cy.get('v-card')
        .should('have.subtitle', res.categoria.capitalize())
        .its('title').should('not.be.empty')
      cy.get(`#doctum.${res.categoria}`).should('exist')
    })
  })
}

describe('omnia invenire', () => {
  ullum({
    categoria: 'coniunctio',
    accusativa: 'coniunctionem'
  }); ullum({
    categoria: 'interiectio',
    accusativa: 'interiectionem'
  }); ullum({
    categoria: 'praepositio',
    accusativa: 'praepositionem'
  }); ullum({
    categoria: Actus.name.toLowerCase(),
    accusativa: 'actum'
  }); ullum({
    categoria: Adiectivum.name.toLowerCase(),
    accusativa: Adiectivum.name.toLowerCase(),
  }); ullum({
    categoria: Adverbium.name.toLowerCase(),
    accusativa: Adverbium.name.toLowerCase(),
  }); ullum({
    categoria: Nomen.name.toLowerCase(),
    accusativa: Nomen.name.toLowerCase(),
  }); ullum({
    categoria: Pronomen.name.toLowerCase(),
    accusativa: Pronomen.name.toLowerCase(),
  }); it('numeramen inveniret', () => {
    const cy: Cypress.Chainable = mount(Quaerere as any)
    // cy.wait(1000)

    cy.get('#quaerenda.categoriae').select('numeramen')
    // cy.wait(1000)
    cy.get('#quaerenda.categoriae')
      .find('option:selected')
      .should('have.text', 'Numeramen')
    cy.get('#fortuna').click()
    // cy.wait(1000)

    let relaturus: string = ''
    cy.get('#tabula').should('exist')
    cy.get('[id^="colamen_"]')
      .sample().its('id')
      .then(id => relaturus = id?.replace('^colamen_', '') ?? '')
    cy.get(`#colamen_${relaturus}`).click()
    // cy.wait(1000)
    cy.get('[id^="aperi_"]').first().click()
    // cy.wait(1000)

    let categoria = relaturus
    if (relaturus !== 'numerus') {
      cy.get('#tabula').should('exist')
      cy.get('fortuna').click()
      // cy.wait(1000)
    } if (relaturus === 'fractionale') {
      categoria = Nomen.name.toLowerCase()
    } else if (/(o|ca)rdinale|(distribu|multiplica)tivum$/.test(relaturus)) {
      categoria = Adiectivum.name.toLowerCase()
    }

    cy.get('v-card').should('have.subtitle', categoria.capitalize())
      .its('title').should('not.be.empty')
    cy.get(`[id^="doctum."]`).should('exist')
  })
})
