Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Broken Links en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/accordian');
            // cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click({force: true})
        });


        it('Debe mostrar el contenido de "What is Lorem Ipsum?" al cargar la página', () => {
            cy.get('#section1Content').should('be.visible');
        });

        it('Debe ocultar el contenido de "Where does it come from?" y "Why do we use it?" al cargar la página', () => {
            cy.get('#section2Content').should('not.be.visible');
            cy.get('#section3Content').should('not.be.visible');
        });


        it('Debe mostrar "Where does it come from?" y ocultar las otras secciones', () => {
            cy.get('#section2Heading').click();
            cy.get('#section2Content').should('be.visible');
            cy.get('#section1Content').should('not.be.visible');
            cy.get('#section3Content').should('not.be.visible');
        });


        it('Debe mostrar "Why do we use it?" cuando se hace clic en esa sección', () => {
            cy.get('#section3Heading').click();
            cy.get('#section3Content').should('be.visible');
            cy.get('#section1Content').should('not.be.visible');
            cy.get('#section1Content').should('not.be.visible');
            cy.get('#section2Content').should('not.be.visible');
            cy.get('#section2Content').should('not.be.visible');
        });


        it('No debe permitir múltiples secciones abiertas al hacer clic rápido', () => {
            cy.get('#section2Heading').click();
            cy.get('#section3Heading').click();
            cy.get('#section1Content').should('not.be.visible');
            cy.get('#section2Content').should('not.be.visible');
            cy.get('#section3Content').should('be.visible');
        });

        it.only('Debe restaurar el estado inicial al recargar la página', () => {
            cy.get('#section3Heading').click();
            cy.get('#section3Content').should('be.visible');
            cy.reload();
            cy.get('#section1Content').should('be.visible');
            cy.get('#section2Content').should('not.be.visible');
        });




});