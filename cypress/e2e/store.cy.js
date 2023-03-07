import { faker } from '@faker-js/faker';
import cartPage from "../support/pages/CartPage";
import searchPage from "../support/pages/SearchPage";
import addressSelectPage from "../support/pages/AddressSelectPage";
import createAddressPage from "../support/pages/CreateAddressPage";
import deliveryMethodPage from "../support/pages/DeliveryMethodPage";
import paymentPage from "../support/pages/PaymentPage";
import orderSummaryPage from "../support/pages/OrderSummaryPage";
import { loginWithUI } from "../support/helpers";

const address = {
    country: faker.address.country(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    zip: faker.address.zipCode('######'),
    phone: faker.phone.number('##########'),
};

const card = {
    name: faker.random.word(),
    number: faker.finance.creditCardNumber('################'),
    expiryMonth: faker.datatype.number({
        min: 1,
        max: 12
    }),
    expiryYear: faker.datatype.number({
        min: 2080,
        max: 2099,
    }),
};

console.log({
    address,
    card
})

describe('Store', () => {
    beforeEach(() => {
        loginWithUI();
        cy.wait(1000);
    });

    it('order product', () => {
        searchPage.addProductToCart('OWASP Juice Shop Sticker Single');
        cy.log('Added product to cart');

        cy.log('Opening cart page');
        cartPage.visit();

        cy.log('Checking out');
        cartPage.getCheckoutButton().click();

        cy.log('Adding a new address');
        addressSelectPage.getAddAddressButton().click();

        // Create new address
        createAddressPage.getCountryField().type(address.country);
        createAddressPage.getNameField().type(address.address);
        createAddressPage.getPhoneField().type(address.phone);
        createAddressPage.getZipCodeField().type(address.zip);
        createAddressPage.getAddressField().type(address.address);
        createAddressPage.getCityField().type(address.city);
        createAddressPage.getSubmitButton().click();

        // Select newly added address
        cy.log('Selecting newly added address');
        addressSelectPage.getAddressOptions().first().click();
        addressSelectPage.getContinueButton().click();

        cy.log('Selecting delivery method');
        deliveryMethodPage.getDeliveryOptions().first().click();
        deliveryMethodPage.getContinueButton().click();

        cy.log('Adding new card');
        paymentPage.getNewCardToggle().click();
        paymentPage.getCardNameField().type(card.name);
        paymentPage.getCardNumberField().type(card.number);
        paymentPage.getExpiryMonthSelect().select(card.expiryMonth.toString());
        paymentPage.getExpiryYearSelect().select(card.expiryYear.toString());
        paymentPage.getSubmitCardButton().click();
        cy.log('Added new card');

        paymentPage.getCardOptions().first().click();
        cy.log('Selected newly added card');

        paymentPage.getContinueButton().click();

        cy.log('Paying for order');
        orderSummaryPage.getPayButton().click();

        cy.get('h1.confirmation').should('contain', 'Thank you for your purchase!');
    });
});
