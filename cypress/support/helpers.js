import user from '../fixtures/user.json';
import loginPage from "./pages/LoginPage";

export function loginWithUI() {
    loginPage.visit();
    loginPage.closePopup();
    loginPage.getEmailField().type(user.email);
    loginPage.getPasswordField().type(user.password);
    loginPage.getSubmitButton().click();
}

export function findProduct(name) {
    return cy.get('body').then(($body) => {
        const $targetProductImage = $body.find('mat-grid-tile img[alt="' + name + '"]');
        if ($targetProductImage.length) {
            return cy.wrap($targetProductImage.parentsUntil('mat-grid-tile').last().parent());
        } else {
            const $nextPageButton = $body.find('button[aria-label="Next page"]:not([disabled="true"])');
            if ($nextPageButton.length) {
                cy.get($nextPageButton).click({ force: true });
                cy.wait(1000);
                return findProduct(name);
            } else {
                throw new Error('Product not found');
            }
        }
    })
}
