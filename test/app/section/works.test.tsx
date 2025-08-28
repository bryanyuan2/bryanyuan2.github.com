import React from 'react';
import CompWorks from './../../../js/app/section/works.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
import {ReactTestRendererJSON} from 'react-test-renderer';

let reactTestRendererResult: ReactTestRendererJSON | null;
const mockWorksJson: string = '../mock/data/mockWorks.json';

describe('##react-test-renderer## js/app/section/works.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompWorks url={mockWorksJson} />);
        reactTestRendererResult = shadow.getRenderOutput() as ReactTestRendererJSON;
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component class should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-experience');
    });

    it('component title should be rendered', function() {
        expect(reactTestRendererResult.props.children[0].props.text).to.equal('Work Experience');
    });
});
