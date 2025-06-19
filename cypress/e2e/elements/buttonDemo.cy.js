Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});


   describe('DemoQA - Pruebas en seccion de Buttons en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-4').click({force: true})
        });


        it('Debe realizar un doble clic y mostrar el mensaje correcto', () => {
                // Selector para el botón de doble clic (asumiendo que tiene el ID 'doubleClickBtn')
                // O podrías usar cy.contains('Double Click Me').dblclick() si no hay ID
                cy.get('#doubleClickBtn').dblclick(); 

                // Verificar que el mensaje de éxito aparezca (reemplaza con el ID o clase real del mensaje)
                // Por ejemplo, si el mensaje es "You have done a double click" y está en un div con ID 'doubleClickMessage'
                cy.get('#doubleClickMessage') 
                    .should('be.visible')
                    .and('contain.text', 'You have done a double click');
        });

        it('Debe realizar un clic derecho y mostrar el mensaje correcto', () => {
            // Click derecho en el botón "Right Click Me" 
            cy.get('#rightClickBtn').rightclick();

          
            cy.get('#rightClickMessage') 
                .should('be.visible')
                .and('contain.text', 'You have done a right click');
        });

         it('Debe realizar un clic normal y mostrar el mensaje correcto', () => {
                
                cy.get('#lt5XM').click();

                cy.get('#clickMessage') 
                    .should('be.visible')
                    .and('contain.text', 'You have done a dynamic click');
        });











  });




