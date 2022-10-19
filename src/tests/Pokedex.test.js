import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa o componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });
  it('testa o texto do button next pokemon', () => {
    renderWithRouter(<App />);

    const NextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(NextButton).toBeInTheDocument();
    userEvent.click(NextButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
  it('testa o botao all', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });
  it('testa os botoes de filtro', () => {
    renderWithRouter(<App />);

    const numberButtons = 7;
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton.length).toBe(numberButtons);
  });
  it('testa o botao de filtro de tipo', () => {
    renderWithRouter(<App />);

    const filterButtonType = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(filterButtonType);
    expect(filterButtonType.innerHTML).toBe('Psychic');
  });
});
