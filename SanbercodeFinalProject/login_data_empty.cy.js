/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";


describe('Login Feature',() => {
    it('Pengguna tidak dapat login jika username dan password kosong' ,() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().clear();
        loginPage.inputPassword().clear();    
        loginPage.buttonLogin().click();

        loginPage.required().should('contain','Required');
      })
    })