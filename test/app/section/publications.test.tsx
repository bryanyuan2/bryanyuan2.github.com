import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompPublications from './../../../js/app/section/publications.tsx';
const mockPublicationsJson: string = '../mock/data/mockPublications.json';

describe('## js/app/section/publications.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompPublications url={mockPublicationsJson} />);
        const regionID = container.querySelector('#region-publications');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompPublications url={mockPublicationsJson} />);
        expect(screen.getByText('Publications')).toBeInTheDocument();
    });
});
