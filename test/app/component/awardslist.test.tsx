import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AwardsList from './../../../src/app/component/awardslist.tsx';

describe('## js/app/component/awardslist.js testing', () => {
    const mockAwards = ['Award 1', 'Award 2'];

    it('should render the component elements', () => {
        render(<AwardsList awards={mockAwards} />);
        expect(screen.getByText('Internal Awards')).toBeInTheDocument();
        expect(screen.getByText('Award 1')).toBeInTheDocument();
        expect(screen.getByText('Award 2')).toBeInTheDocument();
    });
});
