/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Forgot Password Feature',() => {
it('Pengguna dapat menuju halaman reset password' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('have.text','Login');

    cy.intercept("GET","**/requestPasswordResetCode").as("resetpassword"); 
    cy.intercept("GET","**/messages").as("messages");
    cy.intercept("GET","**/requestPasswordResetCode").as("request");

    loginPage.forgotPass().click();

    cy.wait('@resetpassword').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    });
    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    });
    cy.wait('@request').then((intercept) => {
      expect(intercept.response.body).to.be.a('string');
    })

    loginPage.textResetPass().should('contain','Reset Password');

  })
})