Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Date Picker en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/date-picker');
            // cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click({force: true})
        });

        it('Debe permitir ingresar una fecha válida manualmente en Select Date', () => {
            cy.get('#datePickerMonthYearInput')
            .clear()
            .type('12/25/2023')
            .should('have.value', '12/25/2023');
        });

        it('Debe limpiar el campo si se escribe una fecha inválida y se presiona Enter', () => {
            const textoInvalido = 'invalid-date';

            cy.get('#datePickerMonthYearInput')
                .clear()
                .type(textoInvalido); // Simula presionar Enter

                cy.get('#datePickerMonthYearInput').type('{enter}');

            // Esperamos que después de presionar Enter, el campo se limpie
            cy.get('#datePickerMonthYearInput').should('have.value', '');
        });

        it('Debe seleccionar una fecha desde el calendario desplegable', () => {
            cy.get('#datePickerMonthYearInput').click();
            cy.get('.react-datepicker__day--015') // Día 15 del mes visible
                .click();
            cy.get('#datePickerMonthYearInput').should('contain.value', '/15/');
        });

        it('Debe permitir ingresar una fecha y hora manualmente', () => {
            const nuevaFecha = 'July 04, 2025 2:30 PM';
            cy.get('#dateAndTimePickerInput')
                .clear()
                .type(nuevaFecha)
                .should('have.value', nuevaFecha);
        });


        it('Debe permitir seleccionar fecha y hora desde el selector visual', () => {
            cy.get('#dateAndTimePickerInput').click();

            // Selecciona día 1 del mes actual
            cy.get('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)')
                .first()
                .click();

            // Asegura que la lista de horas ya está
            cy.get('.react-datepicker__time-list-item').should('exist');

            // Selecciona la hora "00:15", que se convierte a "12:15 AM"
            cy.contains('.react-datepicker__time-list-item', '00:15')
                .scrollIntoView()
                .should('be.visible')
                .click();

            // Verifica que el valor final incluya "12:15 AM"
            cy.get('#dateAndTimePickerInput').should('contain.value', '12:15 AM');
        });


        it('Debe ignorar caracteres especiales o letras no válidas en el campo de fecha', () => {
            cy.get('#datePickerMonthYearInput')
            .clear()
            .type('@@/ab/####')
            .type('{enter}')
            .should('have.value', '');
        });

        it('Debe permitir cambiar de mes y seleccionar una fecha diferente', () => {
            cy.get('#datePickerMonthYearInput').click();

            // Ir al mes siguiente
            cy.get('.react-datepicker__navigation--next').click();

            // Seleccionar día 10 del nuevo mes
            cy.get('.react-datepicker__day--010:not(.react-datepicker__day--outside-month)').click();

            cy.get('#datePickerMonthYearInput').should('contain.value', '/10/');
        });


        it('Debe mostrar la hora seleccionada en formato AM/PM', () => {
            cy.get('#dateAndTimePickerInput').click();

            // Selecciona cualquier día
            cy.get('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)')
                .first()
                .click();

            // Selecciona una hora conocida
            cy.contains('.react-datepicker__time-list-item', '15:45')
                .scrollIntoView()
                .click();

            cy.get('#dateAndTimePickerInput').should('contain.value', 'PM');
        });


        it.only('Debe permitir seleccionar días de otro mes (aunque estén marcados como "fuera del mes")', () => {
            cy.get('#datePickerMonthYearInput').click();

            cy.get('.react-datepicker__day--outside-month')
                .first()
                .then(($day) => {
                const rawDay = $day.text();
                //Si rawDay es "1", padStart(2, '0') lo convierte en "01". Si es "15", sigue siendo "15"
                const formattedDay = rawDay.padStart(2, '0'); // "1" => "01"

                cy.wrap($day).click();

                cy.get('#datePickerMonthYearInput')
                    .should('contain.value', `/${formattedDay}/`);
                });
        });











});