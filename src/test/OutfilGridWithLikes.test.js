import { render, screen } from '@testing-library/react';
import OutfitGridWithLikes from '../componentes/OutfitGridWithLikes';


describe('OutfitGridWithLikes component', () => {
    test('renders componente de outfits guardados', () => {
        render(<OutfitGridWithLikes/>);
      });
})