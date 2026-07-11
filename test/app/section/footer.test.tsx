import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompFooter from './../../../src/app/section/footer.tsx';
const mockFooterJson: string = '../mock/data/mockFooter.json';

describe('## js/app/section/footer.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(<CompFooter url={mockFooterJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-footer')
            ).toBeInTheDocument();
        });
    });
});
