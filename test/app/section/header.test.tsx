import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompHeader from './../../../src/app/section/header.tsx';
const mockHeaderJson: string = '../mock/data/mockHeader.json';

describe('## js/app/section/header.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(<CompHeader url={mockHeaderJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-header')
            ).toBeInTheDocument();
        });
    });
});
