describe("test input field for", () => {
  it(" invite correct email ", () => {
    let validEmail = "viktoria@gmail.com";
    cy.visit("http://localhost:3000/members/invite");
    cy.get("#member").type(validEmail + "{enter}");
    cy.get(".invite-emails:first span").should("have.text", validEmail);
  });
  it(" invite incorrect email ", () => {
    let invalidEmail = "viktoria";
    cy.visit("http://localhost:3000/members/invite");
    cy.get("#member").type(invalidEmail + "{enter}");
    cy.get(".invite-emails").should("have.length", 0);
  });
  it(" invite already existing email ", () => {
    let duplicateEmail = "viktoria@gmail.com";
    cy.visit("http://localhost:3000/members/invite");
    cy.get("#member").type(duplicateEmail + "{enter}");
    cy.get("#member").type(duplicateEmail + "{enter}");
    cy.get(".invite-emails").should("have.length", 1);
  });
});
