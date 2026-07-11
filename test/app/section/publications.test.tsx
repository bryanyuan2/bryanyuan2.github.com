import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompPublications from './../../../src/app/section/publications.tsx';
const mockPublicationsJson: string = '../mock/data/mockPublications.json';

describe('## js/app/section/publications.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(
            <CompPublications url={mockPublicationsJson} />
        );
        await waitFor(() => {
            expect(
                container.querySelector('#region-publications')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompPublications url={mockPublicationsJson} />);
        expect(await screen.findByText('Publications')).toBeInTheDocument();
    });
});
