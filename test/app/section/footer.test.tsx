import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompFooter from './../../../src/app/section/footer.tsx';
const mockFooterJson: string = '../mock/data/mockFooter.json';

describe('## js/app/section/footer.js testing', () => {
    it('should render the component container', () => {
        const { container } = render(<CompFooter url={mockFooterJson} />);
        const regionID = container.querySelector('#region-footer');
        expect(regionID).toBeInTheDocument();
    });
});
