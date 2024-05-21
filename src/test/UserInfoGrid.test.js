import { render, screen } from '@testing-library/react';
import UserInfoGrid from '../componentes/UserInfoGrid';

describe('UserInfoGrid component', () => {
    test('renders componente de informacion de usuario', () => {
        render(<UserInfoGrid/>);
      });
})