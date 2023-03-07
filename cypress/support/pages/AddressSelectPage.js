import BasePage from "./BasePage";

class AddressSelectPage extends BasePage {
    visit() {
        cy.visit('/address/select');
    }

    getAddAddressButton() {
        return cy.get('button[aria-label="Add a new address"]');
    }

    getAddressOptions() {
        return cy.get('mat-radio-button');
    }

    getContinueButton() {
        return cy.get('button:contains("Continue")');
    }
}

export default new AddressSelectPage();
