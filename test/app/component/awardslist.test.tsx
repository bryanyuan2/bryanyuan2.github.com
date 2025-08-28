import React from 'react';
import AwardsList from './../../../js/app/component/awardslist.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';

let reactTestRendererResult;

describe('##react-test-renderer## js/app/component/awardslist.js testing', function() {
    beforeEach(function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(
            <AwardsList awards={['Award 1', 'Award 2']} />,
        );
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('should render the correct awards content', function() {
        const renderedHtml = reactTestRendererResult.props.children.props.dangerouslySetInnerHTML.__html;
        expect(renderedHtml).to.include('Award 1');
        expect(renderedHtml).to.include('Award 2');
        expect(renderedHtml).to.include('Internal Awards');
    });
});
