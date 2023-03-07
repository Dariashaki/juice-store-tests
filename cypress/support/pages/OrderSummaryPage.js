import BasePage from "./BasePage";

class OrderSummaryPage extends BasePage {
    getPayButton() {
        return cy.get('#checkoutButton');
    }
}

export default new OrderSummaryPage();
