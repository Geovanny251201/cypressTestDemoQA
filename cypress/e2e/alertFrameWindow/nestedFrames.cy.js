Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});
import 'cypress-iframe';


        describe('DemoQA - Pruebas en seccion de Alerts en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/nestedframes');
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-3').click({force: true})
        });


        it('Debe acceder al iframe padre y luego al iframe hijo', () => {
         
            // Paso 1: acceder al iframe padre (id=frame1)
            cy.get('#frame1').then($iframe => {
            const $parentBody = $iframe.contents().find('body');

            // Verifica que el texto del padre esté visible
            cy.wrap($parentBody)
                .contains('Parent frame')
                .should('be.visible');

            // Paso 2: buscar iframe hijo dentro del padre
            const $childIframe = $parentBody.find('iframe');

            const $childBody = $childIframe.contents().find('body');

            // Verifica el texto del iframe hijo
            cy.wrap($childBody)
                .contains('Child Iframe')
                .should('be.visible');
            });
        });

        it('verificar que el contenido del iframe padre está disponible antes de buscar al hijo', () => {
            cy.get('#frame1').should(($iframe) => {
                expect($iframe[0].contentDocument.readyState).to.equal('complete');
            });

            cy.get('#frame1').then($iframe => {
            const $parentBody = $iframe[0].contentDocument.body;
            cy.wrap($parentBody).contains('Texto que no existe').should('not.exist');
            });

        })


});