import React from 'react';
import SectionHeader from './../../../js/app/component/section-header.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';

let reactTestRendererResult;

describe('##react-test-renderer## js/app/component/section-header.js testing', function() {
    beforeEach(function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<SectionHeader setID="test-id" text="Test Header" />);
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('should render the correct text', function() {
        const renderedText = reactTestRendererResult.props.children;
        expect(renderedText).to.equal('Test Header');
    });

    it('should have the correct id', function() {
        const renderedId = reactTestRendererResult.props.id;
        expect(renderedId).to.equal('set-test-id');
    });
});
