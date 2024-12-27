/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";


describe('Login Feature',() => {
    it('Pengguna tidak dapat login jika username kosong' ,() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().clear();
        loginPage.inputPassword().type('admin123');

        //cy.intercept("GET","**/messages").as("message"); 
        
        loginPage.buttonLogin().click();

        //cy.wait("@message");
        loginPage.required().should('have.text','Required');
      })
    })