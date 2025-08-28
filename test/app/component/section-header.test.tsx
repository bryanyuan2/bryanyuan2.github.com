import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionHeader from './../../../src/app/component/section-header.tsx';

describe('## js/app/component/section-header.js testing', () => {
    it('should render the component elements', () => {
        render(<SectionHeader setID="test-id" text="Test Header" />);
        expect(screen.getByText('Test Header')).toBeInTheDocument();
    });
});
