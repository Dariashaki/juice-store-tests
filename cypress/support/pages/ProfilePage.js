class ProfilePage {
    visit() {
        return cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/profile');
    }

    verifyTitle() {
        return cy.get('h1').should('contain', 'User Profile');
    }

    getEmailField() {
        return cy.get('#email');
    }
}

export default new ProfilePage();
