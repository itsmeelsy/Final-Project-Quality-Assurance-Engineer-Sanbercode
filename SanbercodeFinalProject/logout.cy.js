/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Logout Feature',() => {
    it('Pengguna bisa memilih logout dari website' ,() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        loginPage.buttonLogin().click();
        loginPage.menuDashboard().should('have.text','Dashboard');
        loginPage.menuDropdown().click();

        cy.intercept("GET","**/logout").as("logout"); 
        
        loginPage.buttonLogout().contains('Logout').click();

        cy.wait('@logout').then((intercept) => {
            expect(intercept.response.statusCode).to.equal(302);
          });
        
        loginPage.textLogin().should('have.text','Login');

        Cypress.on('uncaught:exception', (err, runnable) => {
            // Mengembalikan `false` untuk mencegah Cypress gagal pada uncaught exceptions
            return false;
          });
          
    })

})