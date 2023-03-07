import BasePage from "./BasePage";

class CreateAddressPage extends BasePage {
    visit() {
        return cy.visit('/address/create');
    }

    getCountryField() {
        return cy.get('input[placeholder="Please provide a country."]');
    }

    getNameField() {
        return cy.get('input[placeholder="Please provide a name."]');
    }

    getPhoneField() {
        return cy.get('input[placeholder="Please provide a mobile number."]');
    }

    getZipCodeField() {
        return cy.get('input[placeholder="Please provide a ZIP code."]');
    }

    getAddressField() {
        return cy.get('textarea[placeholder="Please provide an address."]');
    }

    getCityField() {
        return cy.get('input[placeholder="Please provide a city."]');
    }

    getSubmitButton() {
        return cy.get('#submitButton')
    }
}

export default new CreateAddressPage();
