class CartPage {
    visit() {
        return cy.visit('/basket');
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton');
    }
}

export default new CartPage();
