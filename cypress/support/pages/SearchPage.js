import BasePage from "./BasePage";
import { findProduct } from "../helpers";

export class SearchPage extends BasePage {
    visit() {
        return cy.visit('/');
    }

    addProductToCart(name) {
        const product = findProduct(name);
        product.find('button').first().click({ force: true })
    }
}

export default new SearchPage();
