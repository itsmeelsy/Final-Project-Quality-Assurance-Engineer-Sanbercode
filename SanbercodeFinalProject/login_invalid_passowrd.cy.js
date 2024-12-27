/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Login Feature',() => {
it('Pengguna tidak dapat login menggunakan invalid password' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text','Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('adminsaja');

    cy.intercept("GET","**/messages").as("message"); 
    
    loginPage.buttonLogin().click();

    cy.wait('@message').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    });
    loginPage.invalidlogin().should('have.text','Invalid credentials');
  })
})