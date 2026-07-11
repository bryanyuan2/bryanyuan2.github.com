import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompSummary from './../../../src/app/section/summary.tsx';
const mockSummaryJson: string = '../mock/data/mockSummary.json';

describe('## js/app/section/summary.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(<CompSummary url={mockSummaryJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-summary')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompSummary url={mockSummaryJson} />);
        expect(
            await screen.findByText('Summary of Qualifications')
        ).toBeInTheDocument();
    });
});
