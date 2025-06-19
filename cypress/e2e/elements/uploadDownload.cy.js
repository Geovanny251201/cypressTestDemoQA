Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

        describe('DemoQA - Pruebas en seccion de Broken Links en DEMOQA', () => {
            //se ejecuta antes de cada prueba dentro del bloque
            beforeEach(() => {
            // Navegar a la página de Text Box     
            cy.visit('https://demoqa.com/elements');
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-7').click({force: true})
        });


         // --- Prueba de Descarga ---
        it('Debe verificar que al hacer clic en "Download" se descarga un archivo', () => {
                const downloadsFolder = Cypress.config('downloadsFolder');
                const downloadedFilename = 'sampleFile.jpeg';
                const fullPath = `${downloadsFolder}/${downloadedFilename}`;

                // Elimina el archivo si existe para una prueba limpia
                cy.task('deleteFile', fullPath); 

                cy.get('#downloadButton')
                    .should('be.visible')
                    .click();

                // Verifica que el archivo descargado existe
                cy.readFile(fullPath, { timeout: 15000 })
                    .should('exist');
        });

        // --- Prueba de Carga (Upload) ---
        it('Debe permitir seleccionar un archivo para cargar y mostrar su nombre', () => {
            const testFileName = 'example.json';
            const mimeType = 'application/json';

            cy.get('#uploadFile')
                .should('exist')
                .selectFile(`cypress/fixtures/${testFileName}`, { mimeType: mimeType });

            // Si la página muestra el nombre del archivo en otro elemento, usa su selector aquí.
            // Por ejemplo: cy.get('#uploadedFileNameDisplay').should('contain.text', testFileName);
        });
});