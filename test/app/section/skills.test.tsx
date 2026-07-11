import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompSkills from './../../../src/app/section/skills.tsx';
const mockSkillsJson: string = '../mock/data/mockSkills.json';

describe('## js/app/section/skills.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(<CompSkills url={mockSkillsJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-skills')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompSkills url={mockSkillsJson} />);
        expect(await screen.findByText('Technical Keywords')).toBeInTheDocument();
    });
});
