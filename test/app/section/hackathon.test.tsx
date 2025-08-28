import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompHackathon from './../../../js/app/section/hackathon.tsx';
const mockHackathonJson: string = '../mock/data/mockHackathon.json';

describe('## js/app/section/hackathon.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompHackathon url={mockHackathonJson} />);
        const regionID = container.querySelector('#region-hackathon');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompHackathon url={mockHackathonJson} />);
        expect(screen.getByText('Hackathon Profiles & Awards')).toBeInTheDocument();
    });
});
