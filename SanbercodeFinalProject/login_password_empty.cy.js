/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Login Feature',() => {
it('Pengguna tidak dapat login jika password kosong' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text','Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().clear();

    //cy.intercept("GET","**/messages").as("message"); 
    
    loginPage.buttonLogin().click();

    //cy.wait("@message");
    loginPage.required().should('have.text','Required');
  
  })
})