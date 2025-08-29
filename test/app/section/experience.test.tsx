import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompExperience from '../../../src/app/section/experience.tsx';
const mockExperienceJson: string = '../mock/data/mockExperience.json';

describe('## js/app/section/experience.js testing', () => {
    it('should render the component container', () => {
        const { container } = render(
            <CompExperience url={mockExperienceJson} />
        );
        const regionID = container.querySelector('#region-experience');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompExperience url={mockExperienceJson} />);
        expect(screen.getByText('Work Experience')).toBeInTheDocument();
    });
});
