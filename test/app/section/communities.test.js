import React from 'react';
import CompCommunities from './../../../js/app/section/communities.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
let reactTestRendererResult;
const mockCommunitiesJson = '../mock/data/mockCommunities.json';

describe('##react-test-renderer## js/app/section/communities.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompCommunities url={mockCommunitiesJson} />);
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component class should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-communities');
    });

    it('component title should be rendered', function() {
        expect(reactTestRendererResult.props.children[0].props.text).to.equal('Communities');
    });
});
