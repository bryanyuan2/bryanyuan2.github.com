import React from 'react';
import CompHeader from './../../../js/app/section/header.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
import {ReactTestRendererJSON} from 'react-test-renderer';

let reactTestRendererResult: ReactTestRendererJSON | null;
const mockHeaderJson: string = '../mock/data/mockHeader.json';

describe('##react-test-renderer## js/app/section/header.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompHeader url={mockHeaderJson} />);
        reactTestRendererResult = shadow.getRenderOutput() as ReactTestRendererJSON;
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });
});
