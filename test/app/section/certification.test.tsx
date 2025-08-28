import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompCertification from './../../../js/app/section/certification.tsx';
const mockCertificationJson: string = '../mock/data/mockCertification.json';

describe('## js/app/section/certification.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompCertification url={mockCertificationJson} />);
        const regionID = container.querySelector('#region-certification');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompCertification url={mockCertificationJson} />);
        expect(screen.getByText('Certification')).toBeInTheDocument();
    });
});