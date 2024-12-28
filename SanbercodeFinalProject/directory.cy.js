/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Directory Features',() => {
    it('Pengguna dapat mencari data pekerja dengan meng-input Nama, memilih Job Tittle dan Locations' ,() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');  
        loginPage.buttonLogin().click();      
        loginPage.menuDashboard().should('have.text','Dashboard');

        cy.intercept("GET","**/viewDirectory").as("viewDirectory"); 
        // cy.intercept("GET","**/employees?limit=14&offset=0").as("employees"); 

        loginPage.menuSidebar().contains('Directory').click();

        cy.wait('@viewDirectory').then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
          });

        // cy.wait('@employees').then((intercept) => {
        //     expect(intercept.response.statusCode).to.equal(200);
        // });

        loginPage.textDirectory().should('have.text','Directory');

        loginPage.nameEmployee().type('Jonathan');
        loginPage.selectName().contains('Hadi').click();

        loginPage.jobTittleMenu().eq(0).click();
        loginPage.selectJob().contains('Software Engineer').click();

        loginPage.locationsMenu().eq(1).click();
        loginPage.selectLocations().contains('New York Sales Office').click();

        loginPage.buttonSelect().click();
        loginPage.viewEmployee().should('contain','Jonathan  Hadi');

        // loginPage.buttonResetEmployee().click();
        // loginPage.recordsFound().should('contain','Records Found');

    });

    //Reset pencarian
    it('Pengguna dapat mereset hasil pencarian data pekerja' ,() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');  
        loginPage.buttonLogin().click();      
        loginPage.menuDashboard().should('have.text','Dashboard');

        cy.intercept("GET","**/viewDirectory").as("viewDirectory"); 
        cy.intercept("GET","**/employees?limit=14&offset=0").as("employees"); 

        loginPage.menuSidebar().contains('Directory').click();

        cy.wait('@viewDirectory').then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
          });

        cy.wait('@employees').then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });

        loginPage.textDirectory().should('have.text','Directory');

        loginPage.nameEmployee().type('Jonathan');
        loginPage.selectName().contains('Hadi').click();

        loginPage.jobTittleMenu().eq(0).click();
        loginPage.selectJob().contains('Software Engineer').click();

        loginPage.locationsMenu().eq(1).click();
        loginPage.selectLocations().contains('New York Sales Office').click();
        
        loginPage.buttonSelect().click();

        loginPage.viewEmployee().should('contain','Jonathan  Hadi');
        loginPage.buttonSelect().click();
        loginPage.buttonResetEmployee().click();
        loginPage.recordsFound().should('contain','Records Found');

    });
    
});