Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
  
  
  
  describe('DemoQA - Pruebas en Text Box', () => {
         //se ejecuta antes de cada prueba dentro del bloque
        beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-1').click({force: true})
        });
        



        it('Debe permitir seleccionar y deseleccionar checkboxes individuales', () => {
            cy.get('.rct-collapse').click()
            cy.get('.rct-node-expanded > ol > :nth-child(1) > .rct-text > .rct-collapse').click()
            cy.get('#tree-node-notes').check({ force: true }).should('be.checked');
            cy.get('#tree-node-notes').uncheck({ force: true }).should('not.be.checked');


        });


        it('Debe reflejar visualmente el estado de los checkboxes', () => {
            cy.get('.rct-collapse').click()
            cy.get('.rct-node-expanded > ol > :nth-child(1) > .rct-text > .rct-collapse').click()

            cy.get('#tree-node-notes').check({ force: true }).should('be.checked');
            cy.get('label[for="tree-node-notes"] .rct-checkbox svg')
            .should('have.class', 'rct-icon-check'); 

            cy.get('#tree-node-notes').uncheck({ force: true }).should('not.be.checked');
            cy.get('label[for="tree-node-notes"] .rct-checkbox svg')
            .should('have.class', 'rct-icon-uncheck'); 

        });

        it('Debe marcar todos los checkboxes descendientes al seleccionar el nodo padre "Home"', () => {
            // Asegúrate de que todos los nodos estén expandidos
            cy.get('.rct-collapse-btn').click({ multiple: true });
        
            // Marca el checkbox padre "Home"
            cy.get('#tree-node-home').check({ force: true });
        
            // Selecciona todos los checkboxes descendientes de "Home" y verifica que estén marcados
            cy.get('#tree-node-home').parent().find('input[type="checkbox"]').each(($el) => {
                cy.wrap($el).should('be.checked');
            });
        });


        it('Debe validar los estados iniciales de los checkboxes', () => {
            cy.get('input[type="checkbox"]').each(($el) => {
                cy.wrap($el).should('not.be.checked'); // Verifica que estén desmarcados al inicio
            });
        });

        //Prueba de CI con Jenkins
        //Prueba de CI con Jenkins 2
        //Prueba de CI con Jenkins 3
        //Prueba de CI con Jenkins 4
        //Prueba de CI con Jenkins 5 sin webhooks
        //Prueba de CI con Jenkins 6 sin webhooks
        //Prueba de CI con Jenkins 7 sin webhooks
        //Prueba con Self-Hosted Runner 8
        //Prueba con Self-Hosted Runner 9
        //Prueba con Self-Hosted Runner 10
       
        
        
        
        
        
        

});
