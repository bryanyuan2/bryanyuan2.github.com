import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompSearchbox from './../../../src/app/section/searchbox.tsx';

const PLACEHOLDER = '在這邊找關鍵字';
const mockCommonsJson: string = '../mock/data/mockHeader.json';

describe('## js/app/section/searchbox.js testing', () => {
    it('should render the component container', async () => {
        const { container } = render(<CompSearchbox url={mockCommonsJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-searchbox')
            ).toBeInTheDocument();
        });
    });

    it('should render the input with the expected placeholder', async () => {
        render(<CompSearchbox url={mockCommonsJson} />);
        expect(await screen.findByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    });

    it('should render the avatar fetched from the JSON data', async () => {
        render(<CompSearchbox url={mockCommonsJson} />);
        const avatar = await screen.findByRole('img');
        expect(avatar).toHaveClass('searchbox-avatar');
        expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('should highlight matching text within a whitelisted section while typing', async () => {
        render(
            <div>
                <CompSearchbox url={mockCommonsJson} />
                <div id="region-summary">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = await screen.findByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });

        const marks = document.body.querySelectorAll('mark.text-highlight');
        expect(marks).toHaveLength(1);
        expect(marks[0]).toHaveTextContent('World');
    });

    it('should match keywords case-insensitively', async () => {
        render(
            <div>
                <CompSearchbox url={mockCommonsJson} />
                <div id="region-summary">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = await screen.findByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'world' } });

        const marks = document.body.querySelectorAll('mark.text-highlight');
        expect(marks).toHaveLength(1);
        expect(marks[0]).toHaveTextContent('World');
    });

    it('should remove the highlight when the input is cleared', async () => {
        render(
            <div>
                <CompSearchbox url={mockCommonsJson} />
                <div id="region-summary">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = await screen.findByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(1);

        fireEvent.change(input, { target: { value: '' } });
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(0);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should restore the original text when unmounted while a keyword is active', async () => {
        const sibling = document.createElement('div');
        sibling.id = 'region-summary';
        sibling.innerHTML = '<p>Hello World</p>';
        document.body.appendChild(sibling);

        const { unmount } = render(<CompSearchbox url={mockCommonsJson} />);
        const input = await screen.findByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(1);

        unmount();
        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(0);
        expect(sibling).toHaveTextContent('Hello World');

        document.body.removeChild(sibling);
    });

    it('should not highlight text inside the header or footer sections', async () => {
        render(
            <div>
                <CompSearchbox url={mockCommonsJson} />
                <div id="region-header">
                    <p>Hello World</p>
                </div>
                <div id="region-footer">
                    <p>Hello World</p>
                </div>
            </div>
        );

        const input = await screen.findByPlaceholderText(PLACEHOLDER);
        fireEvent.change(input, { target: { value: 'World' } });

        expect(document.body.querySelectorAll('mark.text-highlight')).toHaveLength(0);
    });
});
