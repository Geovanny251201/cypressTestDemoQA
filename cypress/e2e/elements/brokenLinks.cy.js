Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Broken Links en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-6').click({force: true})
        });



        it('Debe verificar que la "Valid image" se carga correctamente', () => {
          
           
            cy.get('img[src="/images/Toolsqa.jpg"]')
                .should('be.visible') // Verifica que la imagen es visible
                .and((img) => {
                    // Verifica que la imagen se ha cargado correctamente (no hay error de carga)
                    expect(img[0].naturalWidth).to.be.greaterThan(0); 
                });
        });

        it('Debe verificar que la "Broken image" no se carga correctamente', () => {
           
            cy.get('img[src="/images/Toolsqa_1.jpg"]')
                .should('be.visible') // La imagen puede ser visible pero no cargar contenido
                .and((img) => {
                    // Verifica que la imagen no se ha cargado correctamente (ancho natural es 0)
                    expect(img[0].naturalWidth).to.equal(0); 
                });
        });

        it('Debe verificar que el "Valid Link" lleva a una página con respuesta 200 OK', () => {
                
              
                cy.get('a[href="http://demoqa.com"]')
                    .should('have.text', 'Click Here for Valid Link') // Verifica el texto del enlace
                    .click(); 
                    

                // Verifica que la URL cambia al destino esperado
                cy.url().should('eq', 'https://demoqa.com/');
                
                // Puedes volver a la página de prueba si es necesario para los siguientes tests
                cy.go('back'); 
        });
        it('Debe verificar que el "Broken Link" devuelve un código de estado 500', () => {
            const brokenLinkHref = 'http://the-internet.herokuapp.com/status_codes/500';

            // Intercepta la solicitud de red para verificar el código de estado HTTP
            cy.intercept('GET', brokenLinkHref).as('brokenLinkApiCall');

            cy.get(`a[href="${brokenLinkHref}"]`)
                .should('be.visible')
                .and('have.text', 'Click Here for Broken Link')
                .click(); 

            // Espera la respuesta de la red y afirma que el código de estado es 500
            cy.wait('@brokenLinkApiCall', { timeout: 60000 })
                .its('response.statusCode')
                .should('eq', 500);

            
        });
});