import loginPage from "../pages/loginPage"
const loginObjects = new loginPage()
Cypress.Commands.add("login",()=>{
    cy.visit('/')
    cy.get(loginObjects.enterUserID).type(Cypress.env('userName'))
})