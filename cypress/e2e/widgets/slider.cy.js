Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Autocomplete en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/slider');
            // cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click({force: true})

            
        });


        it('Debe mostrar el valor inicial del slider en 0', () => {
            cy.get('input[type="range"]').should('have.value', '25');
            cy.get('#sliderValue').should('have.value', '25');
        });


       it('Mueve el slider con flechas del teclado', () => {
            cy.visit('https://demoqa.com/slider');

            // Hace foco en el slider y presiona flechas
            cy.get('input[type="range"]')
                .focus()
                .type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}'); // 5 pasos = +25

            // Verifica que el valor cambió
            cy.get('#sliderValue').should('have.value', '50');
        });




});