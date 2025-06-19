Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});


        describe('DemoQA - Pruebas en web tables', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click({force: true})
        });


        it('Debe mostrar los encabezados correctos en la tabla', () => {
             const expectedHeaders = ['First Name', 'Last Name', 'Age', 'Email', 'Salary', 'Department', 'Action'];
    
             // Selector basado en la estructura del encabezado
            cy.get('.rt-thead .rt-tr .rt-th .rt-resizable-header-content').each((header, index) => {
            expect(header.text().trim()).to.equal(expectedHeaders[index]);
            });
        });


        it('Debe filtrar la tabla al ingresar una búsqueda', () => {
            const searchTerm = 'Cierra';
            // Se asume que el input de búsqueda tiene el id "searchBox"
            cy.get('#searchBox').type(searchTerm);
            
            // Verifica que alguna fila contenga el término "Cierra"
            cy.get('.rt-tbody .rt-tr-group')
            .should('contain.text', searchTerm);
        });
        it('Debe restaurar la tabla y mostrar solo filas con contenido al borrar la búsqueda', () => {
            const searchTerm = 'Cierra';

            // Ingresar el término de búsqueda
            cy.get('#searchBox').type(searchTerm);
            
            // Verificar que alguna fila contenga el término "Cierra"
            cy.get('.rt-tbody .rt-tr-group')
            .filter((index, row) => Cypress.$(row).text().trim().length > 0) // Filtrar filas con contenido
            .should('contain.text', searchTerm);

            // Borrar el término de búsqueda
            cy.get('#searchBox').clear();

            // Validar que la tabla vuelve a mostrar solo 3 filas con contenido visible
            cy.get('.rt-tbody .rt-tr-group')
            .filter((index, row) => Cypress.$(row).text().trim().length > 0) // Filtrar filas con contenido
            .should('have.length', 3);  
        });

        it('Debe abrir el formulario al hacer clic en el botón Add', () => {
            
            
            // Clic en el botón de Add
            cy.get('#addNewRecordButton').click();

            // Verificar que el modal es visible
            cy.get('.modal-content').should('be.visible');

            // Validar que el título del modal es "Registration Form"
            cy.get('.modal-title').should('have.text', 'Registration Form');
        });


        it('Debe mostrar los campos requeridos en el formulario de registro', () => {
        
            
            cy.get('#addNewRecordButton').click();

            cy.get('#firstName').should('be.visible');
            cy.get('#lastName').should('be.visible');
            cy.get('#userEmail').should('be.visible');
            cy.get('#age').should('be.visible');
            cy.get('#salary').should('be.visible');
            cy.get('#department').should('be.visible');
        });


        it('Debe mostrar errores si el usuario intenta enviar el formulario vacío', () => {
            
            cy.get('#addNewRecordButton').click();
            
            // Clic en el botón Submit sin llenar los campos
            cy.get('#submit').click();

            // Validar que los campos marquen error
            cy.get('#firstName').should('have.attr', 'required');
            cy.get('#lastName').should('have.attr', 'required');
            cy.get('#userEmail').should('have.attr', 'required');
            cy.get('#age').should('have.attr', 'required');
            cy.get('#salary').should('have.attr', 'required');
            cy.get('#department').should('have.attr', 'required');
        });


        it('Debe permitir ingresar datos y enviar el formulario', () => {
            
            
            cy.get('#addNewRecordButton').click();
            
            cy.get('#firstName').type('John');
            cy.get('#lastName').type('Doe');
            cy.get('#userEmail').type('john.doe@example.com');
            cy.get('#age').type('30');
            cy.get('#salary').type('5000');
            cy.get('#department').type('IT');

            // Enviar el formulario
            cy.get('#submit').click();

            // Verificar que el modal se cerró
            cy.get('.modal-content').should('not.exist');

            // Validar que la tabla ahora contiene el nuevo registro
            cy.get('.rt-tbody .rt-tr-group')
            .should('contain.text', 'John')
            .and('contain.text', 'Doe')
            .and('contain.text', 'john.doe@example.com');   
        });


        const usuarios = [
                        { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: '30', salary: '5000', department: 'IT' },
                        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', age: '28', salary: '4500', department: 'HR' },
                        { firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com', age: '35', salary: '6000', department: 'Finance' },
                        { firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@example.com', age: '29', salary: '5200', department: 'Marketing' },
                        { firstName: 'Chris', lastName: 'Wilson', email: 'chris.wilson@example.com', age: '40', salary: '7000', department: 'Sales' },
                        { firstName: 'Laura', lastName: 'Miller', email: 'laura.miller@example.com', age: '33', salary: '4800', department: 'IT' },
                        { firstName: 'Daniel', lastName: 'Taylor', email: 'daniel.taylor@example.com', age: '31', salary: '5300', department: 'HR' },
                        { firstName: 'Sophia', lastName: 'Anderson', email: 'sophia.anderson@example.com', age: '27', salary: '4100', department: 'Marketing' },
                        { firstName: 'Ryan', lastName: 'Martinez', email: 'ryan.martinez@example.com', age: '36', salary: '6500', department: 'Sales' },
                        { firstName: 'Olivia', lastName: 'Harris', email: 'olivia.harris@example.com', age: '32', salary: '4900', department: 'Finance' }
                        ];

        it('Debe permitir agregar múltiples registros automáticamente', () => {
            cy.wrap(usuarios).each(user => {
            cy.get('#addNewRecordButton').click();
            cy.get('#firstName').type(user.firstName);
            cy.get('#lastName').type(user.lastName);
            cy.get('#userEmail').type(user.email);
            cy.get('#age').type(user.age);
            cy.get('#salary').type(user.salary);
            cy.get('#department').type(user.department);
            cy.get('#submit').click();
            });

            // Validar que la tabla tiene al menos 10 filas después de agregar los datos
            cy.get('.rt-tbody .rt-tr-group').should('have.length.at.least', 10);
        });



        it('Debe mostrar la paginación cuando hay más registros de los que caben en una página', () => {
            

            // Agregar suficientes registros para activar la paginación
            for (let i = 0; i < 10; i++) {
                cy.get('#addNewRecordButton').click();
                cy.get('#firstName').type(`User${i}`);
                cy.get('#lastName').type(`Test${i}`);
                cy.get('#userEmail').type(`user${i}@example.com`);
                cy.get('#age').type(`${20 + i}`);
                cy.get('#salary').type(`${3000 + (i * 500)}`);
                cy.get('#department').type(`Dept${i}`);
                cy.get('#submit').click();
            }

            // Validar que la paginación ahora está activa
            cy.get('.pagination-bottom').should('be.visible');
            cy.get('.-totalPages').should('not.have.text', '1'); // Se espera que haya más de una página
        });


        it('Debe permitir cambiar la cantidad de filas visibles por página', () => {
              

                // Cambiar el número de filas por página a 5
                cy.get('.select-wrap.-pageSizeOptions select').select('5');

                // Validar que ahora se muestran solo 5 registros en la tabla
                cy.get('.rt-tbody .rt-tr-group').should('have.length', 5);
        });



        it('Debe permitir ingresar el número de página manualmente', () => {
              

                // Agregar múltiples registros
                for (let i = 0; i < 15; i++) {
                    cy.get('#addNewRecordButton').click();
                    cy.get('#firstName').type(`User${i}`);
                    cy.get('#lastName').type(`Test${i}`);
                    cy.get('#userEmail').type(`user${i}@example.com`);
                    cy.get('#age').type(`${20 + i}`);
                    cy.get('#salary').type(`${3000 + (i * 500)}`);
                    cy.get('#department').type(`Dept${i}`);
                    cy.get('#submit').click();
                }

                // Cambiar de página manualmente
                cy.get('.-pageJump input').clear().type('2{enter}');

                // Validar que el número de página cambió
                cy.get('.-pageJump input').should('have.value', '2');
        });


        it('Debe abrir el formulario de edición al hacer clic en Edit', () => {

                // Hacer clic en el botón de edición del primer registro
                cy.get('[title="Edit"]').first().click();

                // Verificar que el formulario es visible
                cy.get('.modal-content').should('be.visible');

                // Validar que los campos del formulario contienen los datos originales
                cy.get('#firstName').should('have.value', 'Cierra');
                cy.get('#lastName').should('have.value', 'Vega');
                cy.get('#userEmail').should('have.value', 'cierra@example.com');
        });


        it('Debe permitir editar un registro y actualizar la tabla', () => {
                cy.visit('https://demoqa.com/webtables');

                // Abrir el formulario de edición
                cy.get('[title="Edit"]').first().click();

                // Modificar los valores en los campos del formulario
                cy.get('#firstName').clear().type('Juan');
                cy.get('#lastName').clear().type('Pérez');
                cy.get('#userEmail').clear().type('juan.perez@example.com');
                cy.get('#age').clear().type('30');
                cy.get('#salary').clear().type('5000');
                cy.get('#department').clear().type('IT');

                // Guardar los cambios
                cy.get('#submit').click();

                // Validar que los cambios están reflejados en la tabla
                cy.get('.rt-tbody .rt-tr-group').first()
                .should('contain.text', 'Juan')
                .and('contain.text', 'Pérez')
                .and('contain.text', 'juan.perez@example.com')
                .and('contain.text', '30')
                .and('contain.text', '5000')
                .and('contain.text', 'IT');
        });


        it('Debe mantener los datos originales si se cancela la edición', () => {
                

                // Abrir el formulario de edición
                cy.get('[title="Edit"]').first().click();

                // Modificar pero sin guardar
                cy.get('#firstName').clear().type('Carlos');
                cy.get('#lastName').clear().type('Gómez');

                // Cerrar el modal sin guardar
                cy.get('.close').click();

                // Validar que los datos originales no cambiaron en la tabla
                cy.get('.rt-tbody .rt-tr-group').first()
                .should('contain.text', 'Cierra')
                .and('contain.text', 'Vega')
                .and('contain.text', 'cierra@example.com');
        });



        it('Debe mostrar el botón de eliminar en cada registro', () => {
            // Verificar que cada fila tiene un botón de eliminación
            cy.get('[title="Delete"]').should('be.visible');
        });


        it('Debe validar que los valores eliminados ya no existen en la tabla', () => {
     

            // Capturar los valores del primer registro antes de eliminarlo
            cy.get('.rt-tbody .rt-tr-group').first().invoke('text').as('registroEliminar');

            // Eliminar el primer registro
            cy.get('[title="Delete"]').first().click();

            // Validar que los valores eliminados ya no están en la tabla
            cy.get('@registroEliminar').then((texto) => {
                cy.get('.rt-tbody .rt-tr-group .rt-td').should('not.contain', texto.trim());

            });
        });


        it('Debe reducir el número total de registros tras eliminar uno', () => {
            // Contar registros antes de eliminar
            cy.get('.rt-tbody .rt-tr-group')
                .then((rows) => {
                    const filasNoVacias = Cypress._.filter(rows, (row) => {
                        return Cypress.$(row).text().trim().length > 0;
                    });
                    const cantidadAntes = filasNoVacias.length;

                    // Eliminar el primer registro
                    cy.get('[title="Delete"]').first().click();

                    // Esperar a que la tabla se actualice
                    cy.wait(500);

                    // Contar nuevamente las filas no vacías
                    cy.get('.rt-tbody .rt-tr-group')
                        .then((rowsDespues) => {
                            const filasNoVaciasDespues = Cypress._.filter(rowsDespues, (row) => {
                                return Cypress.$(row).text().trim().length > 0;
                            });
                            const cantidadDespues = filasNoVaciasDespues.length;

                            // Hacer la validación
                            expect(cantidadDespues).to.eq(cantidadAntes - 1);
                        });
                });
        });


        it('Debe mostrar un error de validación para un email inválido', () => {
            cy.get('#addNewRecordButton').click();

            // Llenar otros campos para aislar el error del email
            cy.get('#firstName').type('Test');
            cy.get('#lastName').type('User');
            cy.get('#age').type('30');
            cy.get('#salary').type('1000');
            cy.get('#department').type('Testing');

            // Ingresar un email con formato incorrecto
            cy.get('#userEmail').type('correo-invalido');
            cy.get('#submit').click();

            // El modal no debe cerrarse
            cy.get('.modal-content').should('be.visible');

            // El campo de email debe tener la clase de error de bootstrap o el estilo CSS que indique invalidez
            cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)'); // El color rojo puede variar
        });



        it('Debe mostrar un error si se ingresa texto en los campos de edad y salario', () => {
            cy.get('#addNewRecordButton').click();

            // Llenar otros campos para aislar el error del email
            cy.get('#firstName').type('Test');
            cy.get('#lastName').type('User');
            cy.get('#userEmail').type('correo@gmail.com');
            cy.get('#age').type('treinta'); // Ingresar texto
            cy.get('#salary').type('mil');  // Ingresar texto
            cy.get('#department').type('Testing');
            cy.get('#submit').click();

            // Verificar que los campos numéricos marquen error
            // La clase 'is-invalid' es común en Bootstrap para validación
            cy.get('#age:invalid').should('be.visible');
            cy.get('#salary:invalid').should('be.visible');

            // O verificar el estilo del borde
            cy.get('#age').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Debe ordenar la tabla por "First Name" en orden ascendente y descendente', () => {
            // Asumimos que el selector de la cabecera es correcto
            const firstNameHeaderSelector = '.rt-thead .rt-tr .rt-th:contains("First Name")';

            // Hacer clic para ordenar ascendentemente
            cy.get(firstNameHeaderSelector).click();

            // Verificar que la clase de ordenamiento ascendente esté presente
            cy.get(firstNameHeaderSelector).should('have.class', '-sort-asc');

            // Verificar que el primer registro sea "Alden" (el primero alfabéticamente)
            cy.get('.rt-tbody .rt-tr-group').first().should('contain.text', 'Alden');

            // Hacer clic de nuevo para ordenar descendentemente
            cy.get(firstNameHeaderSelector).click();

            // Verificar la clase de ordenamiento descendente
            cy.get(firstNameHeaderSelector).should('have.class', '-sort-desc');

            // Verificar que el primer registro sea "Kierra" (el último alfabéticamente)
            cy.get('.rt-tbody .rt-tr-group').first().should('contain.text', 'Kierra');
        });


        it('Debe deshabilitar el botón "Previous" en la primera página', () => {
            // Asegurarse de estar en la primera página
            cy.get('.-pageJump input').should('have.value', '1');

            // El botón "Previous" debe estar deshabilitado
            cy.get('.-previous button').should('be.disabled');
        });

        // Ejemplo de comando personalizado en cypress/support/commands.js
        Cypress.Commands.add('addUser', (user) => {
            cy.get('#addNewRecordButton').click();
            cy.get('#firstName').type(user.firstName);
            cy.get('#lastName').type(user.lastName);
            cy.get('#userEmail').type(user.email);
            cy.get('#age').type(user.age);
            cy.get('#salary').type(user.salary);
            cy.get('#department').type(user.department);
            cy.get('#submit').click();
        });

        it('Debe deshabilitar el botón "Next" en la última página', () => {
            // Añadir suficientes registros para tener varias páginas
           cy.wrap(usuarios).each(user => {
                cy.addUser(user);
            });

            // Ir a la última página
            cy.get('.-next button').click(); // Asumiendo que hay 2 páginas

            // El botón "Next" debería estar deshabilitado en la última página
            cy.get('.-next button').should('be.disabled');
        });


        it('Debe mostrar un mensaje de "No rows found" cuando la búsqueda no tiene resultados', () => {
            const searchTerm = 'NoExisto123';

            // 1. Escribes en el buscador. Esto dispara el filtro en la tabla.
            cy.get('#searchBox').type(searchTerm);

            // 2. Ahora, Cypress espera a que el selector '.rt-noData' aparezca en el DOM.
            // Como confirmamos que este es el elemento que aparece, este selector es correcto.
            // Puedes dejar el timeout por defecto o aumentarlo si ves que aún falla por tiempo.
            cy.get('.rt-noData')
                .should('be.visible') // 3. Verifica que el elemento sea visible para el usuario.
                .and('contain.text', 'No rows found'); // 4. Verifica que contenga el texto correcto.
        });

        it('Debe ser insensible a mayúsculas y minúsculas al buscar', () => {
            const searchTermUpper = 'CIERRA';
            const searchTermLower = 'cierra';

            // Búsqueda en mayúsculas
            cy.get('#searchBox').type(searchTermUpper);
            cy.get('.rt-tbody').should('contain.text', 'Cierra');

            // Limpiar y buscar en minúsculas
            cy.get('#searchBox').clear().type(searchTermLower);
            cy.get('.rt-tbody').should('contain.text', 'Cierra');
        });


    











     





       






});





