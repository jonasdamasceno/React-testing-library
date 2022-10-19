import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('testa o componente NotFound', () => {
  test('testa se há um H2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole(
      'heading',
      { name: /Page requested not found/i },
    );
    expect(textNotFound).toBeInTheDocument();
  });
  it('testa se o componente renderiza uma imagem do pikachu', () => {
    renderWithRouter(<NotFound />);

    const imagePikachu = screen.getByRole('img', { name: /pikachu/i });

    expect(imagePikachu).toBeInTheDocument();
    expect(imagePikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
