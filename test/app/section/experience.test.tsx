import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompExperience from '../../../src/app/section/experience.tsx';
const mockExperienceJson: string = '../mock/data/mockExperience.json';

describe('## js/app/section/experience.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(
            <CompExperience url={mockExperienceJson} />
        );
        await waitFor(() => {
            expect(
                container.querySelector('#region-experience')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompExperience url={mockExperienceJson} />);
        expect(await screen.findByText('Work Experience')).toBeInTheDocument();
    });
});
