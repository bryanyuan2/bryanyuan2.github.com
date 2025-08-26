import React from 'react';
import CompHeader from './../../../js/app/section/header.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
let reactTestRendererResult;
const mockHeaderJson = '../mock/data/mockHeader.json';

describe('##react-test-renderer## js/app/section/header.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompHeader url={mockHeaderJson} />);
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });
});
