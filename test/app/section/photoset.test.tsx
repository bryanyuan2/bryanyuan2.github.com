import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompPhotoset from './../../../src/app/section/photoset.tsx';
const mockPhotosetJson: string = '../mock/data/mockPhotoset.json';

describe('## js/app/section/photoset.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(
            <CompPhotoset url={mockPhotosetJson} text="Photoset" />
        );
        await waitFor(() => {
            expect(
                container.querySelector('#region-photoset')
            ).toBeInTheDocument();
        });
    });

    it('should render the component title', async () => {
        render(<CompPhotoset url={mockPhotosetJson} text="Photoset" />);
        expect(await screen.findByText('Photoset')).toBeInTheDocument();
    });
});
