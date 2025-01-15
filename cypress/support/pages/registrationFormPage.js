class RegistrationFormPage {
    visit() {
      cy.visit('https://audiostack-qa-test.netlify.app/');
    }
  
    getNameField() {
      return cy.get('input[name="name"]');
    }
  
    getStarterPokemonDropdown() {
      return cy.get('select[name="starter_pokemon"]');
    }
    
    getSubmitButton() {
      return cy.contains('Submit');
    }
  
    getErrorMessageForField(field) {
      return cy.contains(`${field} is required`);
    }
  
    getStatsHeader() {
      return cy.contains('Your starter Pokemon Details');
    }
  
    getSuccessMessage() {
      return cy.contains('Registration Successful');

    }
  
    getWelcomeMessage() {
      return cy.contains('Welcome to the Pokemon League!');
    }
  
    submitForm() {
      this.getSubmitButton().click({ force: true, delay:1000 });
    }
  
    selectPokemon(pokemon) {
      this.getStarterPokemonDropdown().select(pokemon);
      cy.wait(1000);
    }
  
    typeName(name) {
      this.getNameField().type(name);
    }
  
    verifyFieldIsInvalid(field) {
      this.getStarterPokemonDropdown().should('have.attr', 'aria-invalid', 'true');
    }
  }
  
export default new RegistrationFormPage();
  