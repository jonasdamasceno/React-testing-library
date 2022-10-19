import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App', () => {
  test('testa se ha um link com o texto "home" na tela', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByRole('link', { name: /home/i });
    expect(linkElement).toBeInTheDocument();
  });
  test('testa se ha um link com o texto "about" na tela', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
  });
  test('testa se ha um link com o texto "Favorite Pokemons" na tela', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
  });
});