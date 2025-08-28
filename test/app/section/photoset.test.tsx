import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompPhotoset from './../../../js/app/section/photoset.tsx';
const mockPhotosetJson: string = '../mock/data/mockPhotoset.json';

describe('## js/app/section/photoset.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompPhotoset url={mockPhotosetJson} text="Photoset" />);
        const regionID = container.querySelector('#region-photoset');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the component title', () => {
        render(<CompPhotoset url={mockPhotosetJson} text="Photoset" />);
        expect(screen.getByText('Photoset')).toBeInTheDocument();
    });
});