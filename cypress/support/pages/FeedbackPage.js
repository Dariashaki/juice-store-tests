import BasePage from "./BasePage";

class FeedbackPage extends BasePage {
    visit() {
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/contact');
    }

    getCommentField() {
        return cy.get('#comment');
    }

    getRatingSlider() {
        return cy.get('mat-slider');
    }

    getCaptchaExpression() {
        return cy.get('#captcha').invoke('text');
    }

    getCaptchaField() {
        return cy.get('#captchaControl');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }
}

export default new FeedbackPage();
