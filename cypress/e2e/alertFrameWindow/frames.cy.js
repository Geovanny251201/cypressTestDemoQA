Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});
import 'cypress-iframe';


        describe('DemoQA - Pruebas en seccion de Alerts en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/frames');
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-2').click({force: true})
        });

        it('Debe verificar el texto dentro del primer iframe', () => {
            // Carga el iframe por su ID o selector (usualmente es iframe tag)
            cy.frameLoaded('#frame1'); // usa el selector correcto del iframe

            // Entra al iframe y verifica el contenido
            cy.iframe('#frame1').find('h1').should('have.text', 'This is a sample page');
        });

        it('Debe verificar el texto dentro del segundo iframe', () => {
            cy.frameLoaded('#frame2');
            cy.iframe('#frame2').find('h1').should('contain.text', 'sample page');
        });







    });