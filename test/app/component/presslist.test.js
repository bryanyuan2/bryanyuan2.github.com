import React from 'react';
import PressList from './../../../js/app/component/presslist.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';

let reactTestRendererResult;

describe('##react-test-renderer## js/app/component/presslist.js testing', function() {
    beforeEach(function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(
            <PressList press={[{link: 'https://example.com', title: 'Example Title', source: 'Example Source'}]} />
        );
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('should render the correct press content', function() {
        const renderedHtml = reactTestRendererResult.props.children.props.dangerouslySetInnerHTML.__html;
        expect(renderedHtml).to.include('Example Title');
        expect(renderedHtml).to.include('Example Source');
        expect(renderedHtml).to.include('https://example.com');
    });
});
