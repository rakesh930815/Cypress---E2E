//npimport { loginPage } from "../../pages/loginPage";
//const loginObj = new loginPage()
import loginData from '../../fixtures/loginData.json'

describe('Login Test',()=>{
    it('jkj', () =>{
        cy.visit("/")
        cy.request({
            url: "https://qaspicexpress.kargo360tech.com/admin/api/webLogin",
            method: "POST",
            body : {
                email: "cmFrZXNoMkBhZW9sb2dpYy5jb20=", password: "UGFzc3dvcmRAMjI=", source: "WEB", isWeb: true
            }
        }).its('body')
       // .then(res => cy.log(res.result.access_token))
       .then(res => localStorage.setItem('userToken', res.result.access_token))

       
    })
})

// describe('Login Test1',()=>{
//     it('test', () =>{
//        cy.visit("/")
//     })
// })