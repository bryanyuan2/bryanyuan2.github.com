import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompSummary from './../../../js/app/section/summary.tsx';
const mockSummaryJson: string = '../mock/data/mockSummary.json';

describe('## js/app/section/summary.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompSummary url={mockSummaryJson} />);
        const regionID = container.querySelector('#region-summary');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompSummary url={mockSummaryJson} />);
        expect(screen.getByText('Summary of Qualifications')).toBeInTheDocument();
    });
});