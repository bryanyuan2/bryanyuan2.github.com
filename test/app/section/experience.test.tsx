import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompWorks from '../../../js/app/section/experience.tsx';
const mockWorksJson: string = '../mock/data/mockExperience.json';

describe('## js/app/section/works.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompWorks url={mockWorksJson} />);
        const regionID = container.querySelector('#region-experience');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompWorks url={mockWorksJson} />);
        expect(screen.getByText('Work Experience')).toBeInTheDocument();
    });
});