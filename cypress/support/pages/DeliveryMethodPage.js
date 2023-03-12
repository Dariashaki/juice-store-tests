import BasePage from "./BasePage";

class DeliveryMethodPage extends BasePage {
    visit() {
        return cy.visit('/delivery-method');
    }

    getDeliveryOptions() {
        return cy.get('mat-radio-button');
    }
    
    getContinueButton() {
        return cy.get('button:contains("Continue")');
    }
}

export default new DeliveryMethodPage();
