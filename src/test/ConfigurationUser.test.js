import { render } from '@testing-library/react';
import ConfigurationsUser from '../componentes/ConfigurationsUser';

describe('Configuration User component', () => {
    test('renders componente de configuracion usuario', () => {
        render(<ConfigurationsUser/>);
      });
})