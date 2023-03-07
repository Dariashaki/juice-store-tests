class BasePage {
    closePopup() {
        cy.get('.close-dialog').click();
    }
}

export default BasePage;
