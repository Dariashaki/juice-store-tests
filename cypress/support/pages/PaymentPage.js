import BasePage from "./BasePage";

class PaymentPage extends BasePage {
    getNewCardToggle() {
        return cy.get('mat-panel-title:contains("Add new card")').parent();
    }

    getCardNameField() {
        return cy.get('mat-form-field:contains("Name") input');
    }

    getCardNumberField() {
        return cy.get('mat-form-field:contains("Card Number") input');
    }

    getExpiryMonthSelect() {
        return cy.get('mat-form-field:contains("Expiry Month") select');
    }
    getExpiryMonthOptions() {
        return cy.get('mat-form-field:contains("Expiry Month") select option');
    }

    getExpiryYearSelect() {
        return cy.get('mat-form-field:contains("Expiry Year") select');
    }

    getExpiryYearOptions() {
        return cy.get('mat-form-field:contains("Expiry Year") select option');
    }

    getSubmitCardButton() {
        return cy.get('#submitButton');
    }

    getCardOptions() {
        return cy.get('mat-radio-button');
    }

    getContinueButton() {
        return cy.get('button:contains("Continue")');
    }
}

export default new PaymentPage();
