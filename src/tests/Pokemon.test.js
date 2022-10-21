import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa o componente "Pokemon"', () => {
  it('testa o aparecimento do nome correto do pokemon', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon.innerHTML).toBe('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    const firstPokemon = screen.getByTestId('pokemon-type');
    expect(firstPokemon.innerHTML).toBe('Electric');
  });

  it('o peso correto do pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg');
  });
  it('testa a exibição da imagem do pokemon', () => {
    renderWithRouter(<App />);

    const imgPokemon = screen.getByRole('img', { alt: 'pikachu sprite' });
    expect(imgPokemon.alt).toBe('Pikachu sprite');
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const NextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(NextButton);

    const imgPokemon2 = screen.getByRole('img', { alt: 'charmander sprite' });
    expect(imgPokemon2.alt).toBe('Charmander sprite');
    expect(imgPokemon2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);

    const linkMoreInfo = screen.getByRole('link', { name: /more Details/i });
    expect(linkMoreInfo.href).toMatch(/\/pokemons\/25/i); // creditos ao lucas israel por me lembrar do Matchers "toMatch" e sua utilização
    const NextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(NextButton);
    const linkMoreInfo2 = screen.getByRole('link', { name: /more Details/i });
    expect(linkMoreInfo2.href).toMatch(/\/pokemons\/4/i);
  });
  it('testa o funcionamento do link de mais detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreInfo = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(linkMoreInfo);
    const { pathname } = history.location;
    expect(pathname).toMatch(/\/pokemons\/25/i);
    history.push('/');
  });

  it('o icone deve ser uma imagem com o atributo src /star-icon.svg', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreInfo = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(linkMoreInfo);
    const starIcon = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(starIcon);
    history.push('/favorites');

    const imgStarIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStarIcon.src).toMatch(/star-icon.svg/i);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    const { history } = renderWithRouter(<App />);

    const NextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(NextButton);
    const linkMoreInfo = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(linkMoreInfo);
    const starIcon = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(starIcon);
    history.push('/favorites');
  });
});
