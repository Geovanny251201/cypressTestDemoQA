Cypress.on('uncaught:exception', (err, runnable) => {
  return false
  });



describe.only('DemoQA - Pruebas en Text Box', () => {

    //se ejecuta antes de cada prueba dentro del bloque
    beforeEach(() => {
      // Navegar a la página de Text Box
      cy.visit('https://demoqa.com/elements');
      cy.get(':nth-child(1) > .element-list > .menu-list > #item-0').click({force: true})
    });
    
  
    it('Debería completar el formulario con datos válidos', () => {
      // Completar los campos
      cy.get('#userName').type('John Doe');
      cy.get('#userEmail').type('john.doe@example.com');
      cy.get('#currentAddress').type('123 Main Street');
      cy.get('#permanentAddress').type('456 Secondary Street');
  
      // Hacer clic en "Submit"
      cy.get('#submit').click();
  
      // Verificar que los datos se muestren correctamente en la salida
      cy.get('#output').should('be.visible');
      cy.get('#name').should('contain', 'John Doe');
      cy.get('#email').should('contain', 'john.doe@example.com');
    });


    it('Debería mostrar errores si los campos están vacíos', () => {

      cy.get('#submit').click();
      cy.get('#output').should('have.text', ''); // No debería generarse ninguna salida
    });

    it('Debería validar que el título sea "Text Box"', () => {
      // Verificar que el título del formulario sea "Text Box"
      cy.get('.text-center').should('have.text', 'Text Box');
    });

   




});
  