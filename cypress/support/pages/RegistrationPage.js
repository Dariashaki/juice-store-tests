import BasePage from "./BasePage";

class RegistrationPage extends BasePage {
    /*
    cy.visit('/register');
        cy.log('Opened registration page');
        cy.get('.close-dialog').click();

        cy.get('#emailControl').type(user.email);
        cy.get('#passwordControl').type(user.password);
        cy.get('#repeatPasswordControl').type(user.password);

        cy.get('mat-select[name="securityQuestion"]').click();
        cy.get('#mat-option-0').click();
        cy.get('#securityAnswerControl').type(user.securityAnswer);

        cy.get('#registerButton').click();
        cy.log('Registration completed');

     */

    visit() {
        return cy.visit('/register');
    }

    getEmailField() {
        return cy.get('#emailControl');
    }

    getPasswordField() {
        return cy.get('#passwordControl');
    }

    getRepeatPasswordField() {
        return cy.get('#repeatPasswordControl');
    }

    getSecurityQuestionSelect() {
        return cy.get('mat-select[name="securityQuestion"]');
    }

    getSecurityQuestionOptions() {
        return cy.get('mat-option');
    }

    getSecurityAnswerField() {
        return cy.get('#securityAnswerControl');
    }

    getSubmitButton() {
        return cy.get('#registerButton');
    }
}

export default new RegistrationPage();