import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompCertification from './../../../js/app/section/communities.tsx';
const mockCommunitiesJson: string = '../mock/data/mockCommunities.json';

describe('## js/app/section/communities.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompCertification url={mockCommunitiesJson} />);
        const regionID = container.querySelector('#region-communities');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompCertification url={mockCommunitiesJson} />);
        expect(screen.getByText('Communities')).toBeInTheDocument();
    });
});