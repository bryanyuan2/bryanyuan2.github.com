import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompHackathon from './../../../src/app/section/hackathon.tsx';
const mockHackathonJson: string = '../mock/data/mockHackathon.json';

describe('## js/app/section/hackathon.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(<CompHackathon url={mockHackathonJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-hackathon')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompHackathon url={mockHackathonJson} />);
        expect(
            await screen.findByText('Hackathon Profiles & Awards')
        ).toBeInTheDocument();
    });
});
