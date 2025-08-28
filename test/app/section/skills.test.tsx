import React from 'react';
import CompSkills from './../../../js/app/section/skills.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
let reactTestRendererResult;
const mockSkillsJson = '../mock/data/mockSkills.json';

describe('##react-test-renderer## js/app/section/skills.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompSkills url={mockSkillsJson} />);
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component class should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-skills');
    });

    it('component title should be rendered', function() {
        expect(reactTestRendererResult.props.children[0].props.text).to.equal('Technical Keywords');
    });
});
