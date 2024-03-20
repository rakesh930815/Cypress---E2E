export class loginPage{

weblocators={
    UserID:"input[formcontrolname='name']",
    Password:"input[formcontrolname='password']",
    Login:"button[type='submit']"
}

openURL(){
    cy.visit(Cypress.env('URL'))
}

enterUserID(email){
    cy.get(this.weblocators.UserID).type(email)
}

enterPassword(pwd){
    cy.get(this.weblocators.Password).type(pwd)
}

clickOnLogin(){
    cy.get(this.weblocators.Login).click()
}

}