Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});



        describe('DemoQA - Pruebas en seccion de practice forms en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/forms');
            cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click({force: true})
        });


        it('Debe mostrar errores de validación para campos obligatorios vacíos', () => {
            cy.visit('https://demoqa.com/automation-practice-form')

            // Hacemos clic en Submit sin llenar nada
            cy.get('#submit').click()

            // Validamos que el formulario haya activado la validación
            cy.get('#userForm').should('have.class', 'was-validated')

            // Verificamos que los campos obligatorios tengan el atributo 'required'
            cy.get('#firstName').should('have.attr', 'required')
            cy.get('#lastName').should('have.attr', 'required')
            cy.get('#userNumber').should('have.attr', 'required')

            // Validación del grupo Gender
            cy.get('#gender-radio-1').should('have.attr', 'required')

            // Confirmamos que no aparece el modal de éxito
            cy.get('.modal-content').should('not.exist')
        })



        it('Debe enviar el formulario correctamente con todos los campos obligatorios', () => {
         

            cy.get('#firstName').type('John')
            cy.get('#lastName').type('Doe')
            cy.get('#userEmail').type('john@example.com')
            cy.get('#gender-radio-1').check({ force: true }) // Male
            cy.get('#userNumber').type('1234567890')

            // Fecha de nacimiento
            cy.get('#dateOfBirthInput').click()
            cy.get('.react-datepicker__year-select').select('1990')
            cy.get('.react-datepicker__month-select').select('January')
            cy.get('.react-datepicker__day--015').click()

            // Asignaturas
            cy.get('.subjects-auto-complete__value-container').type('Math{enter}')

            // Hobbies
            cy.get('#hobbies-checkbox-1').check({ force: true }) // Sports

            // Subir archivo
            cy.get('#uploadPicture').selectFile('cypress/fixtures/sampleFile.jpeg');

            // Verificar que se muestre el nombre del archivo
            cy.get('#uploadPicture').then(($input) => {
                expect($input[0].files[0].name).to.equal('sampleFile.jpeg');
            });

            cy.get('#currentAddress').type('123 Main Street')

           // Estado y ciudad
            /// Hacer clic en el dropdown de State
            cy.get('#state').click();

            // Seleccionar el estado deseado
            cy.get('.css-11unzgr').contains('Uttar Pradesh').click();


            // Hacer clic en el dropdown de City
                cy.get('#city').click();

                // Seleccionar la ciudad correspondiente
                cy.get('.css-11unzgr').contains('Agra').click();

            // Enviar
            cy.get('#submit').click()

            // Verifica que el modal de éxito aparezca
            cy.get('.modal-title').should('contain', 'Thanks for submitting the form')
        })


        it('Debe mostrar error si el email tiene un formato incorrecto', () => {
            

            cy.get('#firstName').type('John')
            cy.get('#lastName').type('Doe')
            cy.get('#userEmail').type('correoSinArroba.com') // inválido
            cy.get('#gender-radio-1').check({ force: true })
            cy.get('#userNumber').type('1234567890')
            cy.get('#submit').click()

            // El campo email debe estar marcado como inválido
            cy.get('#userEmail:invalid').should('exist')

            // El modal de éxito NO debe mostrarse
            cy.get('.modal-content').should('not.exist')
        })


        it('Debe rechazar números de teléfono con más de 10 dígitos', () => {
            cy.get('#userNumber').type('1234567890123')
            cy.get('#userNumber').should('have.value', '1234567890') // sólo acepta los primeros 10
        })


        it('Debe permitir seleccionar una fecha de nacimiento desde el date picker', () => {
        

            cy.get('#dateOfBirthInput').click()
            cy.get('.react-datepicker__year-select').select('1985')
            cy.get('.react-datepicker__month-select').select('June')

            cy.get('.react-datepicker__day--010:not(.react-datepicker__day--outside-month)').click()

            cy.get('#dateOfBirthInput').should('have.value', '10 Jun 1985')
        })


        it('Debe limpiar el formulario después de enviarlo y cerrar el modal', () => {
            

            // Llenar campos básicos
            cy.get('#firstName').type('Bunny')
            cy.get('#lastName').type('Tester')
            cy.get('#userEmail').type('bunny@test.com')
            cy.get('input[name="gender"][value="Male"]').check({ force: true })
            cy.get('#userNumber').type('1234567890')

            // Seleccionar fecha de nacimiento
            cy.get('#dateOfBirthInput').click()
            cy.get('.react-datepicker__year-select').select('1990')
            cy.get('.react-datepicker__month-select').select('May')
            cy.get('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click()

            // Asignaturas (subjects)
            cy.get('.subjects-auto-complete__value-container').type('Math{enter}')

            // Hobbies
            cy.contains('label', 'Reading').click()

            // Subir archivo
            cy.get('#uploadPicture').selectFile('cypress/fixtures/sampleFile.jpeg');

            // Dirección
            cy.get('#currentAddress').type('123 Testing St')

            // Estado y ciudad
            cy.get('#state').click().get('#react-select-3-option-0').click() // Uttar Pradesh
            cy.get('#city').click().get('#react-select-4-option-0').click() // Agra

            // Enviar el formulario
            cy.get('#submit').click({ force: true })

            // Verificar que el modal de confirmación aparece
            cy.get('.modal-content').should('be.visible')

            // Cerrar el modal
            cy.get('#closeLargeModal').click()

            // Esperar que el modal desaparezca
            cy.get('.modal-content').should('not.exist')

            // Verificar que el formulario se limpió
            cy.get('#firstName').should('have.value', '')
            cy.get('#lastName').should('have.value', '')
            cy.get('#userEmail').should('have.value', '')
            cy.get('#userNumber').should('have.value', '')
            cy.get('#dateOfBirthInput').should('not.have.value', '15 May 1990') // Debe estar en blanco o valor por defecto
            cy.get('.subjects-auto-complete__multi-value').should('not.exist')
            cy.get('#currentAddress').should('have.value', '')
        })







});
