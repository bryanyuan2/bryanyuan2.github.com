import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompHeader from './../../../js/app/section/header.tsx';
const mockHeaderJson: string = '../mock/data/mockHeader.json';

describe('## js/app/section/header.js testing', () => {

    it('should render the component container', () => {
        const { container } = render(<CompHeader url={mockHeaderJson} />);
        const regionID = container.querySelector('#region-header');
        expect(regionID).toBeInTheDocument();
    });
});