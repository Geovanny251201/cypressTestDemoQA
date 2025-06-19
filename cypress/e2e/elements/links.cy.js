Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
  

   describe('DemoQA - Pruebas en seccion de Links en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click({force: true})
        });

        it('Debe abrir el enlace "Home" en una nueva pestaña y validar la URL', () => {
            cy.get('#simpleLink').should('have.attr', 'target', '_blank');
            cy.get('#simpleLink').click(); 
            cy.url().should('eq', 'https://demoqa.com/links'); // Asegura que aún estamos en la página de links

     
        });

        it('Debe abrir el enlace "HomeTxdBU" en una nueva pestaña y validar la URL', () => {
            // El mismo enfoque que el anterior. Asume que el ID es 'dynamicLink'
            cy.get('#dynamicLink').should('have.attr', 'target', '_blank');
            cy.get('#dynamicLink').click();
            cy.url().should('eq', 'https://demoqa.com/links'); // Aún en la página de links
        });

        it('Debe hacer clic en "Created" y mostrar el mensaje de respuesta 201', () => {
            cy.get('#created').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 201 and status text Created');
        });

        it('Debe hacer clic en "No Content" y mostrar el mensaje de respuesta 204', () => {
            cy.get('#no-content').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 204 and status text No Content');
        });

        it('Debe hacer clic en "Moved" y mostrar el mensaje de respuesta 301', () => {
            cy.get('#moved').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 301 and status text Moved Permanently');
        });

        it('Debe hacer clic en "Bad Request" y mostrar el mensaje de respuesta 400', () => {
            cy.get('#bad-request').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 400 and status text Bad Request');
        });

        it('Debe hacer clic en "Unauthorized" y mostrar el mensaje de respuesta 401', () => {
            cy.get('#unauthorized').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 401 and status text Unauthorized');
        });

        it('Debe hacer clic en "Forbidden" y mostrar el mensaje de respuesta 403', () => {
            cy.get('#forbidden').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 403 and status text Forbidden');
        });

        it('Debe hacer clic en "Not Found" y mostrar el mensaje de respuesta 404', () => {
            cy.get('#invalid-url').click();
            cy.get('#linkResponse')
                .should('be.visible')
                .and('contain.text', 'Link has responded with staus 404 and status text Not Found');
        });

    });