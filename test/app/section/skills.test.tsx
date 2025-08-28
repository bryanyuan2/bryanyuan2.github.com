import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompSkills from './../../../js/app/section/skills.tsx';
const mockSkillsJson: string = '../mock/data/mockSkills.json';

describe('## js/app/section/skills.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompSkills url={mockSkillsJson} />);
        const regionID = container.querySelector('#region-skills');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompSkills url={mockSkillsJson} />);
        expect(screen.getByText('Technical Keywords')).toBeInTheDocument();
    });
});
