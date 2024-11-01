export const selectors = {
    buttons: {
        next: '[data-testid="nextButton"]',
        previous: '[data-testid="previousButton"]',
        home: '[data-testid="homePage"]',
        favPage: '[data-testid="favPage"]',
        modalSave: '[data-testid="modalSave"]',
        addToFav: '[data-testid="addToFavButton"]',
        editCard: '[data-testid="editCard"]',
        removeCard: '[data-testid="removeCard"]',
    },
    inputs: {
        searchBox: '[data-testid="searchBox"]',
        height: '#height',
    },
    pages: {
        container: '.container',
    },
    characterCards: {
        card: (index: number) => `[data-testid="character-card"]:nth-child(${index})`,
        all: () => '[data-testid="character-card"]',
        // You can also add methods for character cards if needed
    },
};

export const getContainer = () => cy.get(selectors.pages.container);
export const getNextButton = () => cy.get(selectors.buttons.next);
export const getPreviousButton = () => cy.get(selectors.buttons.previous);
export const getPageButton = (pageNumber: number) => cy.get(`[data-testid="page${pageNumber}Button"]`);
export const getCharacterCard = (index: number) => cy.get(selectors.characterCards.card(index));
export const getAllCharacterCards = () => cy.get(selectors.characterCards.all());
export const getAddToFavButton = () => cy.get(selectors.buttons.addToFav);
export const getHomePageButton = () => cy.get(selectors.buttons.home);
export const getSearchBox = () => cy.get(selectors.inputs.searchBox);
export const getFavPageButton = () => cy.get(selectors.buttons.favPage);
export const getEditCardButton = () => cy.get(selectors.buttons.editCard);
export const getHeightInput = () => cy.get(selectors.inputs.height);
export const getModalSaveButton = () => cy.get(selectors.buttons.modalSave);
export const getRemoveCardButton = () => cy.get(selectors.buttons.removeCard);