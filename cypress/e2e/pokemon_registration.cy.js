import { faker } from '@faker-js/faker';
import registrationFormPage from '../support/pages/registrationFormPage';

describe('Pokemon League Registration Form', () => {
  beforeEach(() => {
    registrationFormPage.visit();
  });

  it('TC01: Verify that the registration form loads correctly', () => {
    cy.get('fieldset').should('be.visible');
    registrationFormPage.getNameField().should('be.visible');
    registrationFormPage.getStarterPokemonDropdown().should('be.visible');
    registrationFormPage.getSubmitButton().should('be.visible');
  });

  it('TC02: Verify that a user can enter a valid name', () => {
    const randomUsername = faker.person.fullName();
    registrationFormPage.typeName(randomUsername);
    registrationFormPage.getNameField().should('have.value', randomUsername);
  });

  it('TC03: Verify that the name field is mandatory', () => {
    registrationFormPage.selectPokemon('bulbasaur');
    registrationFormPage.submitForm();
    registrationFormPage.getErrorMessageForField('Name').should('be.visible');
  });

  it('TC04: Verify that a user can select one of the four starter Pokemon', () => {
    const starterPokemons = [
      { display: 'bulbasaur', value: 'bulbasaur' },
      { display: 'charmander', value: 'charmander' },
      { display: 'squirtle', value: 'squirtle' },
      { display: 'Pikachu', value: 'asdf' },
    ];

    starterPokemons.forEach((pokemon) => {
      registrationFormPage.selectPokemon(pokemon.value);
      registrationFormPage.getStarterPokemonDropdown().should('have.value', pokemon.value);
    });
  });

  it('TC05: Verify that the Pokemon selection field is mandatory', () => {
    const randomUsername = faker.person.fullName();
    registrationFormPage.typeName(randomUsername);
    registrationFormPage.submitForm();
    registrationFormPage.verifyFieldIsInvalid('starter_pokemon');
  });

  it('TC06: Verify that the stats of the selected Pokemon are displayed', () => {
    const randomUsername = faker.person.fullName();
    registrationFormPage.typeName(randomUsername);
    registrationFormPage.selectPokemon('asdf');
    registrationFormPage.submitForm();
    registrationFormPage.getStatsHeader().should('be.visible');
  });

  it('TC07: Verify that the form cannot be submitted if any required field is missing', () => {
    // Scenario 1: Name filled, Pokemon selection empty
    const randomUsername = faker.person.fullName();
    registrationFormPage.typeName(randomUsername);
    registrationFormPage.submitForm();
    registrationFormPage.verifyFieldIsInvalid('starter_pokemon');

    // Scenario 2: Name field empty, Pokemon selected
    registrationFormPage.getNameField().clear();
    registrationFormPage.selectPokemon('charmander');
    registrationFormPage.submitForm();
    registrationFormPage.getErrorMessageForField('Name').should('be.visible');
  });

  it('TC08: Verify that the form can be submitted successfully with valid inputs', () => {
    const randomUsername = faker.person.fullName();
    registrationFormPage.typeName(randomUsername);
    registrationFormPage.selectPokemon('charmander');
    registrationFormPage.submitForm();
    registrationFormPage.getSuccessMessage().should('be.visible');
  });

  it('TC09: Verify the alert message for successful registration', () => {
    const randomUsername = faker.person.fullName();
    registrationFormPage.typeName(randomUsername);
    registrationFormPage.selectPokemon('charmander');
    registrationFormPage.submitForm();
    registrationFormPage.getSuccessMessage().should('be.visible');
    registrationFormPage.getWelcomeMessage().should('be.visible');
  });

  it('TC10: Verify the alert message for unsuccessful registration due to missing fields', () => {
    registrationFormPage.submitForm();
    registrationFormPage.getErrorMessageForField('Name').should('be.visible');
    registrationFormPage.getErrorMessageForField('Starter Pokemon').should('be.visible');
  });

 });
