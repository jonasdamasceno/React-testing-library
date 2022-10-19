import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('testa FavoritePokemons', () => {
  it('testa se há na tela o texto "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
});
