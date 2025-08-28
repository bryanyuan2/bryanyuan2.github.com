import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoBar from './../../../js/app/component/infobar.tsx';

const mockInfoBar = {
    github: 'https://github.com/example',
    speakerdeck: 'https://speakerdeck.com/example',
    youtube: 'https://youtube.com/example'
};

describe('## js/app/component/infobar.js testing', () => {
    it('should render the component elements', () => {
        render(<InfoBar info={mockInfoBar} />);
        expect(screen.getByText('github').closest('a')).toHaveAttribute('href', 'https://github.com/example');
        expect(screen.getByText('speakerdeck').closest('a')).toHaveAttribute('href', 'https://speakerdeck.com/example');
        expect(screen.getByText('youtube').closest('a')).toHaveAttribute('href', 'https://youtube.com/example');
    });
});