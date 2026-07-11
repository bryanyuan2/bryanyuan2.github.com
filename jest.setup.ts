import * as fs from 'fs';
import * as path from 'path';

// Sections fetch their JSON data via relative URLs (e.g. '../mock/data/mockFoo.json')
// that are meant to resolve against the page/module location in a browser. jsdom has
// no real server to serve them from, so route fetch() through the filesystem instead,
// resolving the url relative to the currently running test file.
global.fetch = jest.fn((url: string) => {
    const testPath = expect.getState().testPath as string;
    const filePath = path.resolve(path.dirname(testPath), url);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data)
    } as Response);
}) as unknown as typeof fetch;
