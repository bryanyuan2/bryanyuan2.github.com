import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompSearchbox from './../../../src/app/section/searchbox.tsx';

const PLACEHOLDER = '在這邊找關鍵字';

describe('## js/app/section/searchbox.js testing', () => {
    it('should render the component container', () => {
        const { container } = render(<CompSearchbox />);
        const regionID = container.querySelector('#region-searchbox');
        expect(regionID).toBeInTheDocument();
    });

    it('should render the input with the expected placeholder', () => {
        render(<CompSearchbox />);
        expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    });

    it('should highlight matching text within a whitelisted section while typing', () => {
        render(
            <div>
                <CompSearchbox />
                <div id="region-summary">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = screen.getByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });

        const marks = document.body.querySelectorAll('mark.text-highlight');
        expect(marks).toHaveLength(1);
        expect(marks[0]).toHaveTextContent('World');
    });

    it('should match keywords case-insensitively', () => {
        render(
            <div>
                <CompSearchbox />
                <div id="region-summary">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = screen.getByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'world' } });

        const marks = document.body.querySelectorAll('mark.text-highlight');
        expect(marks).toHaveLength(1);
        expect(marks[0]).toHaveTextContent('World');
    });

    it('should remove the highlight when the input is cleared', () => {
        render(
            <div>
                <CompSearchbox />
                <div id="region-summary">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = screen.getByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(1);

        fireEvent.change(input, { target: { value: '' } });
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(0);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should restore the original text when unmounted while a keyword is active', () => {
        const sibling = document.createElement('div');
        sibling.id = 'region-summary';
        sibling.innerHTML = '<p>Hello World</p>';
        document.body.appendChild(sibling);

        const { unmount } = render(<CompSearchbox />);
        const input = screen.getByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(1);

        unmount();
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(0);
        expect(sibling).toHaveTextContent('Hello World');

        document.body.removeChild(sibling);
    });

    it('should not highlight text inside the header or footer sections', () => {
        render(
            <div>
                <CompSearchbox />
                <div id="region-header">
                    <p>Hello World</p>
                </div>
                <div id="region-footer">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = screen.getByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });

        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(0);
    });
});
