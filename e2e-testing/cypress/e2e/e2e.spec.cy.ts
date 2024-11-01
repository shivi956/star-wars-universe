import { getAddToFavButton, getAllCharacterCards, getCharacterCard, getFavPageButton, getHeightInput, getHomePageButton, getModalSaveButton, getNextButton, getPageButton, getPreviousButton, getSearchBox, selectors } from "./utils/selector";

describe('E2E', () => {
	it('Test whole Star Wars Universe app flow', () => {
		const stub = cy.stub()
		cy.on('window:alert', stub)
		cy.visit('http://localhost:5173/');
		getNextButton().click();
		getPageButton(2).should('have.class', 'bg-blue-500');

		getPreviousButton().click();
		getPageButton(1).should('have.class', 'bg-blue-500');
		getPageButton(9).click();
		getPageButton(9).should('have.class', 'bg-blue-500');
		getPageButton(1).click();
		getPageButton(1).should('have.class', 'bg-blue-500');
		getCharacterCard(1).click();
		getAddToFavButton().click().then(() => {
			expect(stub.getCall(0)).to.be.calledWith('Added to Favourites Successfully')
		});
		getAddToFavButton().should('have.class', 'bg-green-600').and('contain', 'Added to Favourite');
		getHomePageButton().click();
		getSearchBox().type('Darth');
		cy.wait(1000);
		getCharacterCard(1).should('contain', 'Darth');
		getCharacterCard(1).click();
		getAddToFavButton().click().then(() => {
			expect(stub.getCall(1)).to.be.calledWith('Added to Favourites Successfully')
		});;
		getAddToFavButton().should('have.class', 'bg-green-600').and('contain', 'Added to Favourite');
		getHomePageButton().click();
		getFavPageButton().click();
		getAllCharacterCards().should('have.length.greaterThan', 1);
		getCharacterCard(2).find(selectors.buttons.editCard).click();
		getHeightInput().type('{backspace}');
		getHeightInput().type('3');
		getModalSaveButton().click().then(() => {
			expect(stub.getCall(2)).to.be.calledWith('Updated Favourite successfully')
		});
		cy.wait(1000)
		getCharacterCard(2).should('contain', '203');

		getCharacterCard(2).find(selectors.buttons.removeCard).click().then(() => {
			expect(stub.getCall(3)).to.be.calledWith('Removed from Favourites')
		});
		getHomePageButton().click();
	});
});
