import React from 'react';
import CompHackathon from './../../../js/app/section/hackathon.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
let reactTestRendererResult;
const mockHackathonJson = '../mock/data/mockHackathon.json';

describe('##react-test-renderer## js/app/section/hackathon.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompHackathon url={mockHackathonJson} />);
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component class should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-hackathon');
    });

    it('component title should be rendered', function() {
        expect(reactTestRendererResult.props.children[0].props.text).to.equal('Hackathon Profiles & Awards');
    });
});
