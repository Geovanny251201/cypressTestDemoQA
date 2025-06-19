Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
  
  
  
  describe('DemoQA - Pruebas en CheckBox', () => {
         //se ejecuta antes de cada prueba dentro del bloque
        beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-8').click({force: true})
        });


        it('Debe habilitar el botón después de 5 segundos', () => {
            cy.get('#enableAfter').should('be.disabled');
            cy.get('#enableAfter', { timeout: 7000 }).should('be.enabled');
        });


        it('Debe mostrar el botón después de 5 segundos', () => {
            // Esperar hasta que el botón exista y luego verificar visibilidad
            cy.get('#visibleAfter', { timeout: 7000 }) // espera hasta 7 segundos
                .should('be.visible');
        });


        it('Debe cambiar de color después de 5 segundos', () => {

            // Espera hasta que el botón tenga la clase "text-danger"
            cy.get('#colorChange', { timeout: 7000 })
                .should('have.class', 'text-danger');
        });

        it('Debe encontrar el texto con ID aleatorio usando su contenido', () => {

            cy.contains('This text has random Id')  // Busca el contenido exacto
            .should('exist')
            .and('be.visible');
        });





});
        