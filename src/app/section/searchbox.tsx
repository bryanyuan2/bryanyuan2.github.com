import React, { useState, useEffect } from 'react';

const HIGHLIGHT_CLASS = 'text-highlight';

// header/footer are chrome, not CV content, so they're deliberately left off the whitelist
const SEARCHABLE_REGION_IDS = [
    'region-summary',
    'region-skills',
    'region-experience',
    'region-photoset',
    'region-certification',
    'region-hackathon',
    'region-communities',
    'region-publications',
    'region-education'
];

function getSearchableRoots(): HTMLElement[] {
    return SEARCHABLE_REGION_IDS.flatMap((id) =>
        Array.from(document.querySelectorAll<HTMLElement>(`[id="${id}"]`))
    );
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyHighlight(root: HTMLElement, keyword: string): void {
    const pattern = new RegExp(escapeRegExp(keyword), 'gi');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parentTag = node.parentElement?.tagName;
            if (
                parentTag === 'SCRIPT' ||
                parentTag === 'STYLE' ||
                parentTag === 'MARK'
            ) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const textNodes: Text[] = [];
    let current = walker.nextNode();
    while (current) {
        textNodes.push(current as Text);
        current = walker.nextNode();
    }

    textNodes.forEach((node) => {
        const text = node.textContent || '';
        pattern.lastIndex = 0;
        if (!pattern.test(text)) {
            return;
        }
        pattern.lastIndex = 0;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(text))) {
            if (match.index > lastIndex) {
                fragment.appendChild(
                    document.createTextNode(text.slice(lastIndex, match.index))
                );
            }
            const mark = document.createElement('mark');
            mark.className = HIGHLIGHT_CLASS;
            mark.textContent = match[0];
            fragment.appendChild(mark);
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        node.parentNode?.replaceChild(fragment, node);
    });
}

function clearHighlights(root: HTMLElement): void {
    const marks = root.querySelectorAll(`mark.${HIGHLIGHT_CLASS}`);
    marks.forEach((mark) => {
        const parent = mark.parentNode;
        if (!parent) {
            return;
        }
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
        parent.normalize();
    });
}

interface SearchboxData {
    title?: string;
    avatar?: string;
    searchBoxPlaceholder?: string;
}

interface SearchboxProps {
    url: string;
}

const Searchbox: React.FC<SearchboxProps> = ({ url }) => {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState<SearchboxData>({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [url]);

    useEffect(() => {
        const roots = getSearchableRoots();
        const trimmed = keyword.trim();
        if (trimmed) {
            roots.forEach((root) => applyHighlight(root, trimmed));
        }

        return () => roots.forEach((root) => clearHighlights(root));
    }, [keyword]);

    return (
        <div id="region-searchbox">
            <div className="searchbox-wrapper">
                {data.avatar && (
                    <img
                        className="searchbox-avatar"
                        src={data.avatar}
                        alt={data.title}
                    />
                )}
                <input
                    type="text"
                    className="searchbox-input"
                    placeholder={data.searchBoxPlaceholder}
                    aria-label={data.searchBoxPlaceholder}
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                />
            </div>
        </div>
    );
};

export default Searchbox;
