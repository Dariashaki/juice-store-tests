import BasePage from "./BasePage";

class LoginPage extends BasePage {
    visit() {
        return cy.visit('/login');
    }

    getEmailField() {
        return cy.get('#email');
    }

    getPasswordField() {
        return cy.get('#password');
    }

    getSubmitButton() {
        return cy.get('#loginButton');
    }
}

export default new LoginPage();