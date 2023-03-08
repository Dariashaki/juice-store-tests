import { faker } from '@faker-js/faker';
import loginPage from "../support/pages/LoginPage";
import profilePage from "../support/pages/ProfilePage";
import registrationPage from "../support/pages/RegistrationPage";
import user from '../fixtures/user.json';

user.email = faker.internet.email();
user.password = faker.internet.password();
user.securityAnswer = faker.name.firstName();

describe('Account', () => {
    it('Registration', () => {
        registrationPage.visit();
        registrationPage.closePopup();
        cy.log('Opened registration page');

        registrationPage.getEmailField().type(user.email);
        registrationPage.getPasswordField().type(user.password);
        registrationPage.getRepeatPasswordField().type(user.password);

        registrationPage.getSecurityQuestionSelect().click();
        registrationPage.getSecurityQuestionOptions().eq(0).click();
        registrationPage.getSecurityAnswerField().type(user.securityAnswer);

        registrationPage.getSubmitButton().click();
        cy.log('Registration completed');

        cy.location('hash').should('eq', '#/login');
        cy.log('Registration verified');
    });

    it('Login', () => {
        loginPage.visit();
        loginPage.closePopup();
        cy.log('Opened login page');

        loginPage.getEmailField().type(user.email);
        loginPage.getPasswordField().type(user.password);
        loginPage.getSubmitButton().click();
        cy.log('Login completed');

        cy.wait(1000); // якщо одразу перейти на профайл, то буде помилка
        profilePage.visit();
        profilePage.verifyTitle();
        profilePage.getEmailField().should('have.value', user.email);
        cy.log('Login verified');
    });

    it('Do not login', () => {
        loginPage.visit();
        loginPage.closePopup();
        cy.log('Opened login page');

        loginPage.getEmailField().type(faker.internet.email());
        loginPage.getPasswordField().type(faker.internet.password());
        loginPage.getSubmitButton().click();
        cy.log('Login completed');

        cy.get('app-login').should('contain', 'Invalid email or password');
        cy.log('Login error verified');
    });
});
