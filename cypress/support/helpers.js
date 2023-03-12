import user from '../fixtures/user.json';
import loginPage from "./pages/LoginPage";

export function loginWithUI(email, password) {
    loginPage.visit();
    cy.log(`Logging in as ${email}`);
    loginPage.getEmailField().type(email);
    loginPage.getPasswordField().type(password);
    loginPage.getSubmitButton().click();
}

export function headlessLogin() {
    return cy.request({
        method: 'POST',
        url: 'https://juice-shop-sanitarskyi.herokuapp.com/rest/user/login',
        body: {
            email: user.email,
            password: user.password,
        },
    }).then((response) => {
        const token = response.body.authentication.token;
        cy.setCookie('token', token);
        window.localStorage.setItem('token', token);
        window.sessionStorage.setItem('bid', '25');
    });
}

export function findProduct(name) {
    cy.wait(1000);
    return cy.get('body').then(($body) => {
        const $targetProductImage = $body.find('mat-grid-tile img[alt="' + name + '"]');
        if ($targetProductImage.length) {
            return cy.wrap($targetProductImage.parentsUntil('mat-grid-tile').last().parent());
        } else {
            const $nextPageButton = $body.find('button[aria-label="Next page"]:not([disabled="true"])');
            if ($nextPageButton.length) {
                cy.get($nextPageButton).click({ force: true });
                return findProduct(name);
            } else {
                throw new Error('Product not found');
            }
        }
    })
}
