import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../pages';

describe('testa o componente About', () => {
  it('testa se há um titulo h2 com o texto "pokedex"', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { name: /pokédex/i });
    expect(h2).toBeInTheDocument();
  });

  it(
    'testa se há uma imagem da pokedex',
    () => {
      renderWithRouter(<About />);

      const image1 = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });

      expect(image1).toBeInTheDocument();
      expect(image1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    },
  );
});
