Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});





    describe('DemoQA - Pruebas en Text Box', () => {
         //se ejecuta antes de cada prueba dentro del bloque
        beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-2').click({force: true})
        });
       

        it('Debe validar los estados iniciales de los radioButtons', () => {
            //Validar que los tres radioButtons estén presentes
                cy.get('input[type="radio"]').should('have.length', 3);
        });

        it('Debe validar los valores de los radio buttons', () => {
           
            cy.get('#yesRadio').should('exist'); // Verifica que el radio button está en la página
            cy.get('#yesRadio').check({ force: true }).should('be.checked');
            cy.get('#yesRadio + label').should('have.text', 'Yes'); // Verifica que el label tenga el texto correcto
        });



        it('Debe reflejar la selección correcta en el mensaje de confirmación', () => {
            // Seleccionar "Yes" y validar el mensaje
            cy.get('#yesRadio').check({ force: true });
            cy.get('p.mt-3 > span.text-success').should('have.text', 'Yes');

            // Seleccionar "Impressive" y validar el mensaje
            cy.get('#impressiveRadio').check({ force: true });
            cy.get('p.mt-3 > span.text-success').should('have.text', 'Impressive');

            // Validar que "No" no se puede seleccionar (está deshabilitado)
            cy.get('#noRadio').should('be.disabled');
        });


    });


