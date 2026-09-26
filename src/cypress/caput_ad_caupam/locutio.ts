import 'cypress';
import '../../extensions/array.ts';
import { enclitica } from '../../miscella/enumerationes';

export interface  Verbum {
  categoria: string
  lemma: string
  valores?: string[]
  sequendum?: Verbum
}

export interface Res {
  locutio: string
  verba: Verbum[]
}

export function loquatur (res: Res) {
  describe('locutionem facere', () => {
    it('loquitur', () => {
      cy.visit('index.html')
      cy.get('#quaerere').click()
      // cy.wait(1000)

      res.verba.forEach(verbum => {
        let categoria: string = verbum.categoria
        cy.get('#quaerenda.categoriae')
          .select(categoria)
        // cy.wait(1000)
        cy.get('#quaerenda.lemmae')
          .type(verbum.lemma)
        // cy.wait(1000)
        cy.get('[id^="aperi_"]')
          .first().click()
        // cy.wait(1000)

        if (verbum.valores) {
          verbum.valores.except(enclitica)
            .forEach(valor =>
              cy.get(`#colamen_${valor}`).click())
          cy.get('[id^="selige_"]')
            .first().click()
          // cy.wait(1000)
        }

        if (verbum.sequendum &&
            verbum.sequendum.lemma !== 'participium') {
          categoria = verbum.sequendum.categoria
          cy.get(`#${verbum.sequendum.lemma}`).click()
          // cy.wait(1000)
          verbum.sequendum.valores?.except(enclitica)
            .forEach(valor =>
              cy.get(`#colamen_${valor}`).click())
              cy.get('[id^="selige_"]')
                .first().click()
          // cy.wait(1000)
        }

        cy.get('v-card')
          .should('have.subtitle', categoria)
          .its('title').should('not.be.empty')
        cy.get(`doctum_${categoria}`).should('exist')

        if (verbum.sequendum?.lemma === 'participium') {
          categoria = verbum.sequendum.categoria
          cy.get('#participium').click()
          // cy.wait(1000)
          verbum.sequendum.valores?.except(enclitica)
            .forEach(valor =>
              cy.get(`#colamen_${valor}`).click())
              cy.get('[id^="selige_"]')
                .first().click()
          // cy.wait(1000)
        }

        const encliticum: string = verbum.valores?.intersection(enclitica).first() ?? ''
        if (encliticum) {
          cy.get('#enclitica').select(encliticum)
        }

        // cy.wait(1000)
        cy.get('#adde').click()
      })

      cy.get('body').click()
      // cy.wait(1000)
      cy.get('#refer').click()
      cy.window().then(fenestra => {
        fenestra.navigator.clipboard.readText().then((scriptum) => {
          expect(scriptum).to.eq(res.locutio)
        })
      })
    })
  })
}
