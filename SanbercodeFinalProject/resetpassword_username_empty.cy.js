/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";


describe('Forgot Password Feature',() => {
it('Pengguna tidak dapat me-reset password jika username kosong' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    loginPage.forgotPass().click();

    loginPage.textResetPass().should('contain','Reset Password');
    loginPage.inputUsername().clear();  
    loginPage.buttonReset().click();
    loginPage.textRequired().should('contain','Required')   
    
  })
})