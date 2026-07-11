import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompNavibar from './../../../src/app/section/navibar.tsx';
const mockNavibarJson: string = '../mock/data/mockNavibar.json';

describe('## js/app/section/navibar.js testing', () => {
    it('should render the component container', () => {
        const { container } = render(<CompNavibar url={mockNavibarJson} />);
        const regionID = container.querySelector('#region-navibar');
        expect(regionID).toBeInTheDocument();
    });

    it('should render a link for each navibar item fetched from the JSON data', async () => {
        render(<CompNavibar url={mockNavibarJson} />);
        expect(await screen.findByText('Summary')).toBeInTheDocument();
        expect(screen.getByText('Skills')).toBeInTheDocument();
        expect(screen.getByText('Summary').closest('a')).toHaveAttribute(
            'href',
            '#set-desc'
        );
    });
});
