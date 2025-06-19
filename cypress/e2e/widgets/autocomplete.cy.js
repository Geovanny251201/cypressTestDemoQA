Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Autocomplete en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/auto-complete');
            // cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click({force: true})
        });

        it('Debe seleccionar un color en el campo de múltiples', () => {
                const colorASeleccionar = 'Red';

                cy.get('#autoCompleteMultipleInput').type('R');
                cy.get('.auto-complete__option').should('be.visible');
                cy.contains('.auto-complete__option', colorASeleccionar).click();
                cy.get('.auto-complete__multi-value__label').should('contain.text', colorASeleccionar);
                cy.get('#autoCompleteMultipleInput').should('have.value', '');
        });

        it('Debe seleccionar múltiples colores en el campo de múltiples', () => {
            const color1 = 'Blue';
            const color2 = 'Green';

            cy.get('#autoCompleteMultipleInput').type(color1);
            cy.contains('.auto-complete__option', color1).click();
            cy.get('.auto-complete__multi-value__label').should('contain.text', color1);

            cy.get('#autoCompleteMultipleInput').type(color2);
            cy.contains('.auto-complete__option', color2).click();
            cy.get('.auto-complete__multi-value__label').should('contain.text', color2);

            cy.get('.auto-complete__multi-value__label').should('contain.text', color1);
            cy.get('.auto-complete__multi-value__label').should('contain.text', color2);
        });

        it('Debe seleccionar un color en el campo único', () => {
            const colorASeleccionar = 'Yellow';

            cy.get('#autoCompleteSingleInput').type('Y');
            cy.get('.auto-complete__option').should('be.visible');
            cy.contains('.auto-complete__option', colorASeleccionar).click();
            cy.get('.auto-complete__single-value').should('contain.text', colorASeleccionar);
        });

        it('Debe mostrar sugerencias al escribir en el campo de múltiples', () => {
            cy.get('#autoCompleteMultipleInput').type('B');
            cy.contains('.auto-complete__option', 'Blue').should('be.visible');
            cy.contains('.auto-complete__option', 'Black').should('be.visible');
        });

        it('Debe mostrar sugerencias al escribir en el campo único', () => {
            cy.get('#autoCompleteSingleInput').type('P');
            cy.contains('.auto-complete__option', 'Purple').should('be.visible');
        });

        it('Debe permitir eliminar un color seleccionado del campo de múltiples', () => {
            const colorAEliminar = 'Red';

            cy.get('#autoCompleteMultipleInput').type(colorAEliminar);
            cy.contains('.auto-complete__option', colorAEliminar).click();
            cy.get('.auto-complete__multi-value__label').should('contain.text', colorAEliminar);

            cy.get('.auto-complete__multi-value')
                .contains('.auto-complete__multi-value__label', colorAEliminar)
                .next('.auto-complete__multi-value__remove')
                .click();

            cy.get('.auto-complete__multi-value__label').should('not.exist');
        });

        it('No debe permitir seleccionar el mismo color dos veces', () => {
            const color = 'Blue';
            cy.get('#autoCompleteMultipleInput').type(color);
            cy.contains('.auto-complete__option', color).click();
            cy.get('#autoCompleteMultipleInput').type(color);
            cy.get('.auto-complete__option').should('not.exist');
        });


        it('Debe permitir eliminar todos los colores seleccionados', () => {
            const colors = ['Green', 'Yellow', 'Red'];

            colors.forEach((color) => {
                cy.get('#autoCompleteMultipleInput').type(color);
                cy.contains('.auto-complete__option', color).click();
            });

            cy.get('.auto-complete__multi-value__remove').each(($btn) => {
                cy.wrap($btn).click();
            });

            cy.get('.auto-complete__multi-value__label').should('not.exist');
        });

        it('Debe reemplazar el color anterior al seleccionar otro en el campo único', () => {
            const color1 = 'Red';
            const color2 = 'Blue';

            cy.get('#autoCompleteSingleInput').type(color1);
            cy.contains('.auto-complete__option', color1).click();
            cy.get('.auto-complete__single-value').should('contain.text', color1);

            cy.get('#autoCompleteSingleInput').type(color2);
            cy.contains('.auto-complete__option', color2).click();
            cy.get('.auto-complete__single-value').should('contain.text', color2);
            cy.get('.auto-complete__single-value').should('not.contain.text', color1);
        });

        it('Debe ocultar las sugerencias al hacer clic fuera del input', () => {
            cy.get('#autoCompleteMultipleInput').type('B');
            cy.contains('.auto-complete__option', 'Blue').should('be.visible');
            cy.get('body').click(0, 0); // clic fuera
            cy.get('.auto-complete__option').should('not.exist');
        });

        it.only('Debe cerrar las sugerencias al presionar Escape', () => {
            cy.get('#autoCompleteSingleInput').type('P');
            cy.get('.auto-complete__option').should('be.visible');
            cy.get('#autoCompleteSingleInput').type('{esc}');
            cy.get('.auto-complete__option').should('not.exist');
        });


});