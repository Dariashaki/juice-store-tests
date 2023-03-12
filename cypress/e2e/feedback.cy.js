import { faker } from "@faker-js/faker";
import * as math from "mathjs";
import feedbackPage from "../support/pages/FeedbackPage";

describe('Feedback', () => {
    beforeEach(() => {
        cy.setCookie('welcomebanner_status', 'dismiss');
        cy.setCookie('cookieconsent_status', 'dismiss');
    });

    it('Leave feedback', () => {
        feedbackPage.visit();
        feedbackPage.getCommentField().type(faker.random.words(5));
        feedbackPage.getRatingSlider().click(faker.helpers.arrayElement(['left', 'center', 'right']));
        feedbackPage.getCaptchaExpression().then(expression => {
            feedbackPage.getCaptchaField().type(math.evaluate(expression));
        });
        feedbackPage.getSubmitButton().click();
        cy.get('simple-snack-bar').contains('Thank you');
    });
});
