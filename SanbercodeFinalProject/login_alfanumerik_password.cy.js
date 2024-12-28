
/// <reference types="cypress"/>
import loginPage from "../inputdata.cy";

describe('Login Feature',() => {
    it('Pengguna dapat login menggunakan password alfanumerik' ,() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    loginPage.textLogin().should('have.text','Login');
    loginPage.inputUsername().type('Admin');
    loginPage.inputPassword().type('admin123');

    var regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/;  //untuk alfanumerik: harus ada huruf dan angka
    cy.get('[name="password"]').invoke('val').should('match', regex);

    //intercept
    cy.intercept("GET","**/messages").as("message"); 
    cy.intercept("GET","**/employees/action-summary").as("actionsummary"); 
    cy.intercept("POST","**/push").as("push");
    cy.intercept("GET","**/shortcuts").as("shortcuts"); 
    cy.intercept("GET","**/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc").as("feed");
    cy.intercept("GET","**/subunit").as("subunit");
    cy.intercept("GET","**/locations").as("locations");

    loginPage.buttonLogin().click();

    //intercept
    cy.wait("@subunit").then((intercept) => {

    var responseBody = intercept.response.body;

    expect(responseBody).to.have.property('data').that.is.an('array');

    responseBody.data.forEach((response) => {
      // Memastikan bahwa setiap item dalam array 'data' memiliki properti 'subunit'
      expect(response).to.have.property('subunit');
      expect(response.subunit).to.have.property('id');
      expect(response.subunit).to.have.property('name');
      
      expect(response).to.have.property('count').that.is.a('number');
  
    // Memastikan bahwa meta berisi informasi yang valid
      expect(responseBody.meta).to.have.property('otherEmployeeCount');
      expect(responseBody.meta).to.have.property('unassignedEmployeeCount');
      expect(responseBody.meta).to.have.property('totalSubunitCount');

      expect(intercept.response.statusCode).to.equal(200); 
    });
    

    cy.wait('@message').then((intercept) => {
      expect(intercept.response.statusCode).to.equal(304);
    });

    var alias = [
     "@actionsummary","@push","@shortcuts","@feed","@locations"
    ];
    alias.forEach((alias) => {
      cy.wait(alias).then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        });
    });
    loginPage.menuDashboard().should('have.text','Dashboard');

  });
});

});
