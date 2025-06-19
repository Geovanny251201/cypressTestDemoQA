Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Alerts en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/alerts');
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click({force: true})
        });

        it('Debe mostrar una alerta simple al hacer clic en el botón', () => {
            const stub = cy.stub();
            cy.on('window:alert', stub);

            cy.get('#alertButton').click().then(() => {
                expect(stub.getCall(0)).to.be.calledWith('You clicked a button');
            });
        });

        it('Debe mostrar una alerta después de 5 segundos al hacer clic en el botón', () => {
            const stub = cy.stub();
            cy.on('window:alert', stub);

            cy.get('#timerAlertButton').click();
            cy.wait(6000); // espera a que aparezca la alerta

            cy.then(() => {
                expect(stub).to.have.been.calledOnce;
                expect(stub.getCall(0)).to.be.calledWith('This alert appeared after 5 seconds');
            });
        });


        it('Debe mostrar un confirm y aceptar (OK)', () => {
            cy.window().then((win) => {
            cy.stub(win, 'confirm').returns(true).as('confirmStub');
            });

            cy.get('#confirmButton').click();
            cy.get('#confirmResult').should('contain', 'You selected Ok');
        });

        it('Debe mostrar un confirm y cancelar', () => {
            cy.window().then((win) => {
            cy.stub(win, 'confirm').returns(false).as('confirmStub');
            });

            cy.get('#confirmButton').click();
            cy.get('#confirmResult').should('contain', 'You selected Cancel');
        });


        it('Debe mostrar un prompt y aceptar con texto', () => {
            // Simulamos lo que el navegador debería hacer cuando se llama a window.prompt
            cy.window().then((win) => {
                cy.stub(win, 'prompt').returns('Pruebita').as('promptStub');
            });

            // Click en el botón que dispara el prompt
            cy.get('#promtButton').click();

            // Verificamos que el texto introducido se muestre en la página
            cy.get('#promptResult')
            .should('contain', 'Pruebita');
        });


       
       









    });