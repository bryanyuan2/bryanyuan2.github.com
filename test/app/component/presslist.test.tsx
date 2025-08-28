import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PressList from './../../../src/app/component/presslist.tsx';

const mockPressList = [
    {
        link: 'https://example.com',
        title: 'Example Title',
        source: 'Example Source'
    }
];

describe('## js/app/component/presslist.js testing', () => {
    it('should render the component elements', () => {
        render(<PressList press={mockPressList} />);

        const linkElement = screen.getByRole('link', {});
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://example.com');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
