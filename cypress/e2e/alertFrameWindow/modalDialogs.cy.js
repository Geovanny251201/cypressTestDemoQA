Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});
import 'cypress-iframe';


        describe('DemoQA - Pruebas en seccion de Alerts en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/modal-dialogs');
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-4').click({force: true})
        });

        it('Debe abrir el Small Modal y verificar el título y botón de cierre', () => {
            cy.contains('Small modal').click();

            // Verifica que el modal esté visible
            cy.get('.modal-content').should('be.visible');

            // Verifica título del modal
            cy.get('#example-modal-sizes-title-sm')
                .should('be.visible')
                .and('have.text', 'Small Modal');

            // Verifica contenido del modal
            cy.get('.modal-body')
                .should('contain.text', 'This is a small modal');

            // Cierra el modal
            cy.get('#closeSmallModal').click();

            // Verifica que el modal ya no está visible
            cy.get('.modal-content').should('not.exist');
        });


        it('Debe abrir el Large Modal y verificar el título y botón de cierre', () => {
            cy.contains('Large modal').click();

            cy.get('.modal-content').should('be.visible');
            cy.get('#example-modal-sizes-title-lg')
                .should('be.visible')
                .and('have.text', 'Large Modal');

            cy.get('.modal-body')
                .should('contain.text', 'Lorem Ipsum');

            cy.get('#closeLargeModal').click();
            cy.get('.modal-content').should('not.exist');
        });

        it('No debe haber modales visibles al inicio', () => {
            cy.get('.modal-content').should('not.exist');
        });

        it('Los botones de abrir modal deben estar habilitados', () => {
            cy.contains('Small modal').should('be.enabled');
            cy.contains('Large modal').should('be.enabled');
        });

});