import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompCertification from './../../../src/app/section/certification.tsx';
const mockCertificationJson: string = '../mock/data/mockCertification.json';

describe('## js/app/section/certification.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(
            <CompCertification url={mockCertificationJson} />
        );
        await waitFor(() => {
            expect(
                container.querySelector('#region-certification')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompCertification url={mockCertificationJson} />);
        expect(await screen.findByText('Certification')).toBeInTheDocument();
    });
});
