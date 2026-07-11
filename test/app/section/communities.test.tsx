import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompCertification from './../../../src/app/section/communities.tsx';
const mockCommunitiesJson: string = '../mock/data/mockCommunities.json';

describe('## js/app/section/communities.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(
            <CompCertification url={mockCommunitiesJson} />
        );
        await waitFor(() => {
            expect(
                container.querySelector('#region-communities')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompCertification url={mockCommunitiesJson} />);
        expect(await screen.findByText('Communities')).toBeInTheDocument();
    });
});
