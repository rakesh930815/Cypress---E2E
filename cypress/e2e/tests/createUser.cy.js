import user from '../../fixtures/user.json'

describe('Create User', () => {
    before('login', () => {
        cy.viewport(1920, 1080)
        cy.login(user.login.userID, user.login.password)
        cy.wait(13000)
    })

    it('Click on create user menu', () => {
        cy.get("a[href='/user/list']").invoke('show').click({force: true})
        cy.get("[title='Create User']").click()
    })
})