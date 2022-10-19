import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste a exibição detalhada do pokémon selecionado é mostrado na tela:', () => {
  it('A página deve conter um texto <name> Details', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreInfo = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(linkMoreInfo);

    const pageDetailsPikachu = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pageDetailsPikachu).toBeInTheDocument();
    expect(linkMoreInfo).not.toBeInTheDocument();
    history.push('/');

    const NextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(NextButton);
    const linkMoreInfo2 = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(linkMoreInfo2);
    const pageCharmander = screen.getByRole('heading', { name: /Charmander Details/i });
    expect(pageCharmander).toBeInTheDocument();
    expect(linkMoreInfo2).not.toBeInTheDocument();
  });
  it('testa de há um elemento h2 com o texto summary', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsPikachu = '/pokemons/25';
    history.push(pageDetailsPikachu);
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it(`A seção de detalhes deve conter um parágrafo com o resumo 
  do pokémon específico sendo visualizado.`, () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsPikachu = '/pokemons/25';
    history.push(pageDetailsPikachu);
    const sectionPDetaisl = screen
      .getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(sectionPDetaisl).toBeInTheDocument();
    const pageCharmander = '/pokemons/4';
    history.push(pageCharmander);
    const sectionCharmander = screen
      .getByText(/The flame on its tail shows the strength of its life force/i);
    expect(sectionCharmander).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os mapas
   contendo as localizações do pokémon:`, () => {
  it('testa se há um elemento h2 com o texto Game Locations of', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsCaterpie = '/pokemons/10';
    history.push(pageDetailsCaterpie);
    const gameLocations = screen
      .getByRole('heading', { name: /game locations of Caterpie/i });
    expect(gameLocations).toBeInTheDocument();
  });
  it('testa se todas as localizações são mostradas na secção detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsCaterpie = '/pokemons/10';
    history.push(pageDetailsCaterpie);
    const imgMapLocalization = screen.getAllByAltText('Caterpie location');
    const imgMapName = imgMapLocalization[0].nextSibling;
    const imgMapName2 = imgMapLocalization[1].nextSibling;
    const imgMapName3 = imgMapLocalization[2].nextSibling;
    const imgMapName4 = imgMapLocalization[3].nextSibling;
    expect(imgMapLocalization[0].src).toBe('https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png');
    expect(imgMapName.innerHTML).toMatch('Johto Route 30');
    expect(imgMapLocalization[1].src).toBe('https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png');
    expect(imgMapName2.innerHTML).toMatch('Johto Route 31');
    expect(imgMapLocalization[2].src).toBe('https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png');
    expect(imgMapName3.innerHTML).toMatch('Ilex Forest');
    expect(imgMapLocalization[3].src).toBe('https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png');
    expect(imgMapName4.innerHTML).toMatch('Johto National Park');
  });
});
describe(`Teste se o usuário pode favoritar
   um pokémon através da página de detalhes`, () => {
  it('testa se o pokémon é favoritado', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsCharmander = '/pokemons/4';
    history.push(pageDetailsCharmander);
    const checkbox = screen.getByRole('checkbox', { id: /favorite/i });
    expect(checkbox).toBeInTheDocument();
  });
  it('Cliques alternados no checkbox devem adicionar e remover o pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsAlakazam = '/pokemons/65';
    history.push(pageDetailsAlakazam);
    const checkbox = screen.getByRole('checkbox', { id: /favorite/i });
    userEvent.click(checkbox);
    history.push('/favorites');
    const PokemonName = screen.getAllByTestId('pokemon-name');
    expect(PokemonName[0].innerHTML).toMatch('Alakazam');
  });
  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { history } = renderWithRouter(<App />);
    const pageDetailsAlakazam = '/pokemons/65';
    history.push(pageDetailsAlakazam);
    const checkboxText = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxText).toBeInTheDocument();
  });
});
