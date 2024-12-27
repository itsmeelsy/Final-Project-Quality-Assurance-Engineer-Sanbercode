/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";


describe('Forgot Password Feature',() => {
it('Pengguna dapat mereset password' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.intercept("GET","**/messages").as("messages");
    
    loginPage.forgotPass().click();

    cy.wait('@messages').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    });

    loginPage.textResetPass().should('contain','Reset Password');
    loginPage.inputUsername().type('Admin');

    cy.intercept("POST","**/requestResetPassword").as("request");
    cy.intercept("GET","**/sendPasswordReset").as("send");
    
    loginPage.buttonReset().click();

    cy.wait('@request').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(302);
    });
    
    loginPage.textSendLink().should('contain','Reset Password link sent successfully');
    
    cy.wait('@send').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(200);
    });
  })
})