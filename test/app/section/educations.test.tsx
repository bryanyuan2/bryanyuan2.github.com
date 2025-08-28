import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompEducations from './../../../src/app/section/educations.tsx';
const mockEducationsJson: string = '../mock/data/mockEducations.json';

describe('## js/app/section/educations.js testing', () => {
    it('should render the component container', () => {
        const { container } = render(
            <CompEducations url={mockEducationsJson} />
        );
        const regionID = container.querySelector('#region-education');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompEducations url={mockEducationsJson} />);
        expect(screen.getByText('Education')).toBeInTheDocument();
    });
});
