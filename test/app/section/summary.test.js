import React from 'react';
import CompSummary from './../../../js/app/section/summary.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
let reactTestRendererResult;
const mockSummaryJson = '../mock/data/mockSummary.json';

describe('##react-test-renderer## js/app/section/summary.js testing', function() {
    beforeEach(function(done) {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompSummary url={mockSummaryJson} />);
        reactTestRendererResult = shadow.getRenderOutput();
        done();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component class should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-summary');
    });

    it('component title should be rendered', function() {
        expect(reactTestRendererResult.props.children[0].props.text).to.equal('Summary of Qualifications');
    });
});
