Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Browser windows en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click({force: true})
        });

        it('Debe mostrar los botones de abrir ventanas/pestañas', () => {
            cy.get('#tabButton').should('be.visible')
            cy.get('#windowButton').should('be.visible')
            cy.get('#messageWindowButton').should('be.visible')
        })


        it('Debe abrir una nueva pestaña con el botón "New Tab"', () => {
            cy.window().then((win) => {
                cy.stub(win, 'open').as('windowOpen')  // intercepta window.open
            })

            cy.get('#tabButton').click()

            cy.get('@windowOpen').should('have.been.called')  // confirma que se llamó
        })


        it('Debería disparar el evento para abrir una nueva ventana', () => {
            // Preparamos un "espía" para el evento window.open
            cy.window().then((win) => {
                cy.spy(win, 'open').as('windowOpen');
            });

            cy.get('#windowButton').click();

            // Verificamos que nuestro espía fue llamado
            cy.get('@windowOpen').should('be.called');
        });


        it('Debe abrir una nueva ventana con un mensaje (sin URL)', () => {
            cy.window().then((win) => {
                cy.spy(win, 'open').as('windowOpen')
            })

            cy.get('#messageWindowButton').click()

            cy.get('@windowOpen').should('be.called')
        })




});