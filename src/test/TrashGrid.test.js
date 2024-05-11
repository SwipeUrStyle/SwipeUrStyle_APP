import { render, screen } from '@testing-library/react';
import TrashGrid from '../componentes/TrashGrid';


describe('TrashGrid component', () => {
    test('renders componente de papelera', () => {
        render(<TrashGrid/>);
      });
})