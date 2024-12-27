/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Login Feature',() => {
it('Pengguna tidak dapat login menggunakan data invalid' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text','Login');
    loginPage.inputUsername().type('malia');
    loginPage.inputPassword().type('admin123');

    cy.intercept("GET","**/messages").as("message"); 
    
    loginPage.buttonLogin().click();

    cy.wait('@message').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    });
    loginPage.invalidlogin().should('have.text','Invalid credentials');
  })
    
})