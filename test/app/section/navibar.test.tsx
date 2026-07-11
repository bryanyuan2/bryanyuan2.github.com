import React from 'react';
import {
    render,
    screen,
    waitFor,
    fireEvent,
    act
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CompNavibar from './../../../src/app/section/navibar.tsx';
const mockNavibarJson: string = '../mock/data/mockNavibar.json';

type IntersectionObserverCallback = (
    entries: Partial<IntersectionObserverEntry>[]
) => void;

class MockIntersectionObserver {
    static instances: MockIntersectionObserver[] = [];
    callback: IntersectionObserverCallback;
    elements: Element[] = [];
    disconnect = jest.fn();
    unobserve = jest.fn();

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
        MockIntersectionObserver.instances.push(this);
    }

    observe(el: Element) {
        this.elements.push(el);
    }
}

describe('## js/app/section/navibar.js testing', () => {
    let originalIntersectionObserver: unknown;

    beforeEach(() => {
        MockIntersectionObserver.instances = [];
        originalIntersectionObserver = (
            global as { IntersectionObserver?: unknown }
        ).IntersectionObserver;
        (global as { IntersectionObserver?: unknown }).IntersectionObserver =
            MockIntersectionObserver;
    });

    afterEach(() => {
        (
            global as { IntersectionObserver?: unknown }
        ).IntersectionObserver = originalIntersectionObserver;
        document.body.innerHTML = '';
    });

    it('should render the component container', async () => {
        const { container } = render(<CompNavibar url={mockNavibarJson} />);
        await waitFor(() => {
            expect(
                container.querySelector('#region-navibar')
            ).toBeInTheDocument();
        });
    });

    it('should render a link for each navibar item fetched from the JSON data', async () => {
        render(<CompNavibar url={mockNavibarJson} />);
        expect(await screen.findByText('Summary')).toBeInTheDocument();
        expect(screen.getByText('Skills')).toBeInTheDocument();
        expect(screen.getByText('Summary').closest('a')).toHaveAttribute(
            'href',
            '#set-desc'
        );
    });

    it('should not mark a link active when it is clicked', async () => {
        render(<CompNavibar url={mockNavibarJson} />);
        const link = await screen.findByText('Summary');
        fireEvent.click(link);
        expect(link.closest('a')).not.toHaveClass('navibar-link-active');
    });

    it('should observe the section element for each navibar item once data loads', async () => {
        document.body.appendChild(
            Object.assign(document.createElement('div'), { id: 'set-desc' })
        );
        document.body.appendChild(
            Object.assign(document.createElement('div'), { id: 'set-skills' })
        );

        render(<CompNavibar url={mockNavibarJson} />);
        await screen.findByText('Summary');

        await waitFor(() => {
            expect(MockIntersectionObserver.instances).toHaveLength(1);
        });
        const observer = MockIntersectionObserver.instances[0];
        expect(observer.elements.map((el) => el.id)).toEqual([
            'set-desc',
            'set-skills'
        ]);
    });

    it('should mark the link active when its section intersects the viewport', async () => {
        render(<CompNavibar url={mockNavibarJson} />);
        const summaryLink = await screen.findByText('Summary');

        await waitFor(() => {
            expect(MockIntersectionObserver.instances).toHaveLength(1);
        });
        const observer = MockIntersectionObserver.instances[0];

        act(() => {
            observer.callback([
                { isIntersecting: true, target: { id: 'set-desc' } as Element }
            ]);
        });

        await waitFor(() => {
            expect(screen.getByText('Summary').closest('a')).toHaveClass(
                'navibar-link-active'
            );
        });
        expect(screen.getByText('Skills').closest('a')).not.toHaveClass(
            'navibar-link-active'
        );
    });

    it('should disconnect the observer on unmount', async () => {
        const { unmount } = render(<CompNavibar url={mockNavibarJson} />);
        await screen.findByText('Summary');

        await waitFor(() => {
            expect(MockIntersectionObserver.instances).toHaveLength(1);
        });
        const observer = MockIntersectionObserver.instances[0];

        unmount();
        expect(observer.disconnect).toHaveBeenCalled();
    });
});
