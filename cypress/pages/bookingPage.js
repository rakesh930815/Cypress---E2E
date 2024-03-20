///<refrence:types="Cypress" />

export class bookingPage{

    weblocators = {
        booking_origin: "[formcontrolname='station_code']",
        booking_destination: "input[name='destination']",
        booking_commodity: "input[name='commodity_code']",
        booking_shipper: "input[name='shipperCode']",
        booking_consignee: "input[name='consigneeCode']",
        booking_customer: "input[name='customer']",
        booking_pieces: "input[name='total_pieces']",
        booking_weight: "input[name='gross_weight']",
        bookingflt_status: "td div select.route_type",
        bookingroute_destination: "td div.has-float-label input.mat-autocomplete-trigger",
        bookingflt_date: "input[placeholder='DD-MM-YYYY']",
        bookingflt_day: "span.selected",
        bookingflt_code: "td div div div select.form-control.route_type",
        booking_save: "[title='Save Booking']",
        //export
        export_menu: "a[href='/export-manifest']",
        export_fltid: '[formcontrolname="flight_id"]',
       // export_fltdate: '[formcontrolname="flight_date"]',
        export_search: '.fa.fa-search',
        //Arrival
        arrival_fltid: '[name="arrivalFormFlight_id"]',
        arrival_fltdate: '[name="arrivalFormFlight_date"]',
        arrival_search: '[title="Search"]',
        arrival_reset: '[title="Refresh"]'
    }

    selectOrigin(origin){
        cy.get(this.weblocators.booking_origin).select(origin)
        cy.wait(3000)
    }

    selectDestination(destination){
        // cy.get(this.weblocators.booking_destination).type('BL')
        // cy.get(".mat-option-text div").each(($el, index, $list) => {
        //     if($el.text() === 'BLR')
        //     {
        //         cy.wrap($el).click({force:true})
        //     }
        // });

        // Type the initial characters to filter the options
        cy.get(this.weblocators.booking_destination).type(destination);

        // Wait for the options to appear
        cy.get(".mat-option-text").should('be.visible');

        // Use contains() to find the desired option and click on it
        cy.contains('.mat-option-text', 'BLR').click();
        cy.wait(3000)
    }

    selectCommodity(commodity){
        cy.get(this.weblocators.booking_commodity).type(commodity);
        cy.get(".mat-option-text").should('be.visible');
        cy.contains('.mat-option-text', 'GEN -- General').click();
    }

    selectShipper(shipper){
        // cy.get(this.weblocators.booking_shipper).type(shipper);
        // cy.get(".mat-option-text").should('be.visible');
        // cy.contains('.mat-option-text', 'INDDELDO').click();

        cy.get(this.weblocators.booking_shipper).type(shipper);
        cy.get(".mat-option-text").should('be.visible');

        try {
        cy.contains('.mat-option-text', 'INDDELDO').click();
        } catch (error) {
        // Handle the failure here
        if (error) {
            // If there's an error, handle it here
            // You can retry, log the error, or perform any other action
            // For example:
            cy.log('Failed to click on INDDELDO. Trying alternative action.');
            // Perform alternative action here
        } else {
            // If no error, it means the click was successful
            // Perform any necessary actions after successful click
        }
        }

        
    }

    selectConsignee(consignee){
        cy.get(this.weblocators.booking_consignee).type(consignee);
        cy.get(".mat-option-text").should('be.visible');
        cy.contains('.mat-option-text', 'INDBLRDO').click();
    }

    // selectCustomer(customer){
    //     cy.get(this.weblocators.booking_customer).type(customer);
    //     cy.get(".mat-option-text").should('be.visible');
    //     cy.contains('.mat-option-text', 'ASADELDO').click();
    // }

    enterPieces(pieces){
        cy.get(this.weblocators.booking_pieces).type(pieces);
    }

    enterWeight(weight){
        cy.get(this.weblocators.booking_weight).type(weight);
        cy.wait(4000)
    }

    selectFltStatus(fltstatus){
        cy.get(this.weblocators.bookingflt_status).select(fltstatus);
        //cy.get("span.mat-option-text").should('be.visible');
        //cy.contains('span.mat-option-text', 'BLR').click();
    }

    selectRouteDestination(rdestination){
        cy.get(this.weblocators.bookingroute_destination).type(rdestination);
        cy.get("span.mat-option-text").should('be.visible');
        cy.contains('span.mat-option-text', 'BLR').click();
    }

    selectFltdate(bfltdate){
        cy.get(this.weblocators.bookingflt_date).click().clear()
        //cy.get(this.weblocators.bookingflt_day).click()
        cy.get(this.weblocators.bookingflt_date).type(bfltdate)
        
    }

    selectFltCode(bdate){
        cy.get("td.pos-relative").click()
        cy.get(this.weblocators.bookingflt_code).should('exist').select(bdate)

        // cy.get().then(function($welcomeMsgEle){
        //     const welcomeTxt = $welcomeMsgEle.text()
        //     cy.log(welcomeTxt)
        //    // const userName ='Admin'
        //     //expect(welcomeTxt).eq('Welcome '+userName)
        //     expect(welcomeTxt).to.match(/Welcome .+/)
        // })

        // cy.get(this.weblocators.bookingflt_code)
        //     .select(bdate)
        //     .should('have.value', bdate) // Assert that the select element has the selected value
        //     .then(() => {
        //         cy.log('Successfully selected the bookingflt_code');
        //     })
        //     .should('not.throw'); // This will ensure that if any error occurred during the command chain, it will be caught

    }

    saveBooking(){
        cy.get(this.weblocators.booking_save).click()
    }

    //export
    
    enterFltID(eflt)
    {
        cy.get(this.weblocators.export_fltid).type(eflt)
    }

    // enterFltDate()
    // {
    //     cy.get(this.weblocators.bookingflt_date).type('09-03-2024')
    // }

    onExportSearch()
    {
        cy.get(this.weblocators.export_search).click()
    }

    //Arrival
    
    arrivalFltID(aflt)
    {
        cy.get(this.weblocators.arrival_fltid).type(aflt)
    }

    arrivalFltDate(afltdate)
    {
        cy.get(this.weblocators.arrival_fltdate).click().clear()
        //cy.get(this.weblocators.bookingflt_day).click()
        cy.get(this.weblocators.arrival_fltdate).type(afltdate)
    }

    onArrivalSearch()
    {
        cy.get(this.weblocators.arrival_search).click()
    }

    onArrivalReset()
    {
        cy.get(this.weblocators.arrival_reset).click()
    }

    

}