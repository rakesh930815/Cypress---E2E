import {bookingPage} from "../../pages/bookingPage"
const bookingPageObj = new bookingPage()
import a2abookingData from '../../fixtures/a2abookingData.json'

describe('Successful Booking', () => {
    before('login', ()=>{
        cy.viewport(1920, 1080)
        cy.login(a2abookingData.login.userID, a2abookingData.login.password)
        cy.wait(4000)
        //cy.reload();
        // Check if login is successful
        if(a2abookingData.login.userID == "rakesh2@aeologic.com" && a2abookingData.login.password == "Password@22")
        {
            cy.get(".welcome-admin").then(function($welcomeMsgEle){
                const welcomeTxt = $welcomeMsgEle.text()
                cy.log(welcomeTxt)
            // const userName ='Admin'
            //expect(welcomeTxt).eq('Welcome '+userName)
            expect(welcomeTxt).to.match(/Welcome .+/)
            })
        }
        else
        {
            cy.get('.alert-danger').should('exist').then(() => {
                // If login failed, stop further tests
                throw new Error('Login failed, stopping further test execution');
            });
        }
        cy.wait(8000)
    })

    it.skip('Successfull Booking with vaild details', ()=>{
        cy.get("a[href='/create-booking']").invoke('show').click({force: true})
        cy.viewport(1920, 1080)
        bookingPageObj.selectOrigin(a2abookingData.bookingData.borigin)
        bookingPageObj.selectDestination(a2abookingData.bookingData.bdestination)
        bookingPageObj.selectCommodity(a2abookingData.bookingData.bcommodity)
        bookingPageObj.selectShipper(a2abookingData.bookingData.bshipper)
        bookingPageObj.selectConsignee(a2abookingData.bookingData.bconsignee)
       // bookingPageObj.selectCustomer(a2abookingData.bookingData.bcustomer)
        bookingPageObj.enterPieces(a2abookingData.bookingData.bpieces)
        bookingPageObj.enterWeight(a2abookingData.bookingData.bweight)
        bookingPageObj.selectFltStatus(a2abookingData.bookingData.fltstatus)
        bookingPageObj.selectRouteDestination(a2abookingData.bookingData.broutedest)
        bookingPageObj.selectFltdate(a2abookingData.bookingData.brdate)
        bookingPageObj.selectFltCode(a2abookingData.bookingData.brfltcode)
        bookingPageObj.saveBooking()
        cy.wait(8000)
        // Check if login is successful
        cy.get('.toast-success').then(successMessage => {
            if (successMessage.length > 0) {
                // Positive use case: Login successful
                //cy.get('.dashboard').should('be.visible');
                cy.get('.toast-message').then(function($welcomeMsgEle){
                    const welcomeTxt = $welcomeMsgEle.text()
                    cy.log(welcomeTxt)
                })
                cy.wait(8000)
                cy.get('[name="awb_number"]').then(function($docketNumber){
                    const AWBTxt = $docketNumber.text()
                    cy.log(AWBTxt)
                })//Get AWB
                cy.get("button.execute-btn").click()
                cy.wait(12000)

                cy.get('div > .text-success').then($element => {
                    const text = $element.text().trim(); // Get the text content of the element and remove leading/trailing whitespace
                    if (text === 'AWB is Executed') {
                      cy.log('AWB is Executedfyyguy');
                    } else {
                      cy.get('.toast-error').then($toastElement => {
                        const welcomeTxt = $toastElement.text().trim(); // Get the text content of the toast message
                        cy.log(welcomeTxt);
                      });
                    }
                  });
                  
                //it will work on toast alert
                // cy.get('div > .text-success, .toast-error').then(($toasts) => {
                //     $toasts.each((index, toast) => {
                //         const toastType = Cypress.$(toast).hasClass('toast-message') ? 'Success' : 'Error';
                //         const toastTxt = Cypress.$(toast).text();
                //         cy.log(`${toastType} message: ${toastTxt}`);
                //         // Handle each toast type accordingly
                //         if (toastType === 'Success') {
                //             // Handle success message
                //             cy.log()
                //         } else {
                //             // Handle error message
                //         }
                //     });
                // });
                
                    
                
                cy.get('[name="accept_piece"]').click().wait(2000)
                cy.get('[name="accept_piece"]').should('be.visible').type(a2abookingData.bookingData.bpieces)
                cy.get('[name="accept_piece"]').should('have.value', '10');
                
                cy.get('[name="accept_weight"]').should('be.visible').type(a2abookingData.bookingData.bweight)
                cy.get('[name="accept_weight"]').should('have.value', '10');
                // cy.get('[name="accept_weight"]').should(($input) => {
                //     // Wait for the input field to be visible and have a value
                //     expect($input).to.have.lengthOf(1); // Ensure only one element is found
                //     expect($input.val().trim()).to.equal('10'); // Check if the value matches '10' after trimming whitespace
                //   });
                  
                cy.get('[title="Accept"]').click()
                cy.wait(20000)
                // validation check of accept
                cy.get('div > .text-success').then($element => {
                    const text = $element.text().trim(); // Get the text content of the element and remove leading/trailing whitespace
                    cy.log(text)
                    if (text === 'AWB is Accepted') {
                      cy.log('AWB is Acceptedfyyguy');
                    } else {
                      cy.get('.toast-error').then($toastElement => {
                        const welcomeTxt = $toastElement.text().trim(); // Get the text content of the toast message
                        cy.log(welcomeTxt);
                        throw new Error('Element not found');
                      });
                    }
                  });
                
            } else {
                // Negative use case: Login failed
                cy.get('.toast-error').should('be.visible');
                // Additional negative use case steps if needed
            }
        });

        //Export Manifest////////////////////////////////////////////////////////////////////////
        cy.get("a[href='/export-manifest']").invoke('show').click({force: true})
        cy.viewport(1920, 1080)
        bookingPageObj.selectOrigin(a2abookingData.bookingData.borigin)
        bookingPageObj.enterFltID(a2abookingData.export.efltID)
        bookingPageObj.selectFltdate(a2abookingData.bookingData.brdate)
        bookingPageObj.onExportSearch()
        //cy.get(".toast-error").should('have.text',' Please select Proper Station. ')
        cy.get('.lock-icon-text').then(function($welcomeMsgEle){
            const welcomeTxt = $welcomeMsgEle.text()
            //cy.log(welcomeTxt)
           // expect(welcomeTxt).eq('Flight Locked, Please remember to unlock when done.')
            if (welcomeTxt === 'Flight Locked, Please remember to unlock when done.') {
                cy.get('[href="#AWB"]').should('be.visible')
                cy.wait(2000)
                cy.get("input[id^='mat-checkbox']").check({force: true})
                cy.get('.save-booking button.save-booking').click()
              } else {
                cy.get('.fas.fa-lock').click()
                // bookingPageObj.enterFltID(a2abookingData.export.efltID)
                // bookingPageObj.selectFltdate(a2abookingData.bookingData.brdate)
                bookingPageObj.onExportSearch()
                cy.get('[href="#AWB"]').should('be.visible')
                cy.wait(2000)
                cy.get("input[id^='mat-checkbox']").check({force: true})
                cy.get('.save-booking button.save-booking').click()
              }
        })
        cy.wait(5000)
        // cy.get('[href="#AWB"]').should('be.visible')
        // cy.get('[for="mat-checkbox-4-input"]').check({force: true})
        // cy.get('.save-booking button.save-booking').click()

        //validation check for Add to Manifest
        // cy.get('.toast-success').then(successMessage => {
        //     if (successMessage.length > 0) {
        //         cy.get('.toast-message').then(function($welcomeMsgEle){
        //             const welcomeTxt = $welcomeMsgEle.text()
        //             cy.log(welcomeTxt)
        //          })
        //     }
        // })

        // let arr = [];
        // cy.get('button[type="submit"]')
        //     .each((el) => {
        //         arr.push(el.text())
        //     })
        //     .then(() => {
        //         for(let index =0; index < arr.length; index++){
        //             if(arr[index] === 'Manifest'){
        //                 cy.get(`button[type="submit"]:contains(${arr[index]})`).click({ force: true })
        //                 break;
        //             }
        //         }
        //     })

        //Flight Manifested
        cy.get('button[type="submit"]') // Replace 'common-class-name' with the actual class name
            .then(($buttons) => {
                const buttonText = 'Manifest'; // Replace with the desired button text
                cy.wrap($buttons)
                .each(($btn, index) => {
                    if ($btn.text().trim() === buttonText) {
                    cy.get('button[type="submit"]')
                        .eq(index)
                        .click();
                    }
                });
            });
            cy.wait(5000)
            //Flight Departed
            cy.get('button[type="submit"]') // Replace 'common-class-name' with the actual class name
            .then(($buttons) => {
                const buttonText = 'Depart Flt'; // Replace with the desired button text
                cy.wrap($buttons)
                .each(($btn, index) => {
                    if ($btn.text().trim() === buttonText) {
                    cy.get('button[type="submit"]')
                        .eq(index)
                        .click();
                    }
                });
            });

            //Arrival Manifest////////////////////////////////////////////////////////////////////////
        
        
    })

    it('export', () => {
        cy.get("a[href='/arrival-details']").invoke('show').click({force: true})
        cy.viewport(1920, 1080)
        bookingPageObj.selectOrigin(a2abookingData.Arrival.aorigin)
        bookingPageObj.arrivalFltID(a2abookingData.Arrival.afltID)
        bookingPageObj.arrivalFltDate(a2abookingData.Arrival.afltDate)
        bookingPageObj.onArrivalSearch()
        cy.get('.lock-icon-text').then(function($welcomeMsgEle){
            const welcomeTxt = $welcomeMsgEle.text()
            if (welcomeTxt === 'Flight Locked, Please remember to unlock when done.') {
                cy.wait(2000)
                
                cy.get('tr .awb_number_in').then(($AWB) => {
                    const text = $AWB.text().trim();
                    cy.log(`Text: '${text}'`);
                
                    const values = text.split(' ');
                    const desiredValue = values.find(value => value.includes('775-60036082'));
                
                    cy.log(`Desired Value: '${desiredValue}'`);
                
                    if (desiredValue === "775-60036082") {
                        cy.wait(2000)
                        cy.log("Checkbox should be checked.");
                
                        // Find the checkbox associated with the desired value and check it
                        cy.get('tbody [name^="awbchecked"]')
                            .filter((index, element) => Cypress.$(element).siblings('.awb_number_in').text().includes('775-60036082'))
                            .find('span')
                            .check();
                    } else {
                        cy.log("Checkbox should not be checked.");
                    }
                });
                
                
                
                

                // cy.get('button[type="submit"]') // Replace 'common-class-name' with the actual class name
                //     .then(($buttons) => {
                //         const buttonText = 'Arrive'; // Replace with the desired button text
                //         cy.wrap($buttons)
                //         .each(($btn, index) => {
                //             if ($btn.text().trim() === buttonText) {
                //             cy.get('button[type="submit"]')
                //                 .eq(index)
                //                 .click();
                //             }
                //         });
                //     });
              } else {
                cy.get('.fas.fa-lock').click()
                bookingPageObj.onArrivalSearch()
                cy.wait(2000)
                cy.get("input[id^='mat-checkbox']").check({force: true})
                cy.get('button[type="submit"]') // Replace 'common-class-name' with the actual class name
                    .then(($buttons) => {
                        const buttonText = 'Arrive'; // Replace with the desired button text
                        cy.wrap($buttons)
                        .each(($btn, index) => {
                            if ($btn.text().trim() === buttonText) {
                            cy.get('button[type="submit"]')
                                .eq(index)
                                .click();
                            }
                        });
                    });
              }
        })

    })


})