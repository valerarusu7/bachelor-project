describe("register", () => {
  it(" register ", () => {
    let companyName = "viatest";
    let website = "viatest.com";
    let firstName = "test first  name";
    let lastName = "test last  name";
    let email = "testemail2@gmai.com";
    let password = "123456789Aa!";
    let repeatPassword = "123456789Aa!";

    cy.visit("http://localhost:3000/auth/become-a-customer");
    cy.get("#company_name").type(companyName);
    cy.get("#company_website").type(website);
    cy.get("#first_name").type(firstName);
    cy.get("#first_name").type(firstName);
    cy.get("#last_name").type(lastName);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#re_password").type(repeatPassword);
    cy.get(".submit:first").click();
  });
  it(" invalid ", () => {
    let companyName = "viatest";
    let website = "viatest";
    let firstName = "test first  name";
    let lastName = "test last  name";
    let email = "testemail2@gmai.com";
    let password = "123456!";
    let repeatPassword = "123456Aa!";
    cy.visit("http://localhost:3000/auth/become-a-customer");
    cy.get("#company_name").type(companyName);
    cy.get("#company_website").type(website);
    cy.get("#first_name").type(firstName);
    cy.get("#first_name").type(firstName);
    cy.get("#last_name").type(lastName);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#re_password").type(repeatPassword);
    cy.get(".submit:first").click();
  });
});
