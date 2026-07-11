import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompEducations from './../../../src/app/section/educations.tsx';
const mockEducationsJson: string = '../mock/data/mockEducations.json';

describe('## js/app/section/educations.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(
            <CompEducations url={mockEducationsJson} />
        );
        await waitFor(() => {
            expect(
                container.querySelector('#region-education')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompEducations url={mockEducationsJson} />);
        expect(await screen.findByText('Education')).toBeInTheDocument();
    });
});
