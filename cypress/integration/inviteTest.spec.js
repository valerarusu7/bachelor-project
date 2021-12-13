describe("test input field for", () => {
  it(" invite email ", () => {
    let validEmail = "viktoria@gmail.com";
    cy.visit("http://localhost:3000/members/invite");
    cy.get("#member").type(validEmail + "{enter}");
    cy.get(".invite-emails:first span").should("have.text", validEmail);
  });
});
