import { faker } from '@faker-js/faker';
import profilePage from "../support/pages/ProfilePage";
import registrationPage from "../support/pages/RegistrationPage";
import user from '../fixtures/user.json';
import { loginWithUI } from "../support/helpers";

const fakeUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    securityAnswer: faker.name.firstName()
}

describe('Account', () => {
    beforeEach(() => {
        cy.setCookie('welcomebanner_status', 'dismiss');
        cy.setCookie('cookieconsent_status', 'dismiss');
    });

    it('Registration', () => {
        registrationPage.visit();
        cy.log('Opened registration page');

        registrationPage.getEmailField().type(fakeUser.email);
        registrationPage.getPasswordField().type(fakeUser.password);
        registrationPage.getRepeatPasswordField().type(fakeUser.password);

        registrationPage.getSecurityQuestionSelect().click();
        registrationPage.getSecurityQuestionOptions().eq(0).click();
        registrationPage.getSecurityAnswerField().type(fakeUser.securityAnswer);

        registrationPage.getSubmitButton().click();
        cy.log('Registration completed');

        cy.location('hash').should('eq', '#/login');
        cy.log('Registration verified');
    });

    it('Login', () => {
        loginWithUI(user.email, user.password);
        cy.log('Login completed');

        cy.wait(1000); // якщо одразу перейти на профайл, то буде помилка
        profilePage.visit();
        profilePage.verifyTitle();
        profilePage.getEmailField().should('have.value', user.email);
        cy.log('Login verified');
    });

    it('Do not login', () => {
        loginWithUI(faker.internet.email(), faker.internet.password());

        cy.get('app-login').should('contain', 'Invalid email or password');
        cy.log('Login error verified');
    });
});
