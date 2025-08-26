import React from 'react';
import InfoBar from './../../../js/app/component/infobar.js';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';

let reactTestRendererResult;

describe('##react-test-renderer## js/app/component/infobar.js testing', function() {
    beforeEach(function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(
            <InfoBar info={{
                github: 'https://github.com/example',
                speakerdeck: 'https://speakerdeck.com/example',
                youtube: 'https://youtube.com/example'
            }} />
        );
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('should render github link', function() {
        const githubLink = reactTestRendererResult.props.children[0];
        expect(githubLink.props.href).to.equal('https://github.com/example');
        expect(githubLink.props.children).to.equal('github');
    });

    it('should render speakerdeck link', function() {
        const speakerdeckLink = reactTestRendererResult.props.children[1];
        expect(speakerdeckLink.props.href).to.equal('https://speakerdeck.com/example');
        expect(speakerdeckLink.props.children).to.equal('speakerdeck');
    });

    it('should render youtube link', function() {
        const youtubeLink = reactTestRendererResult.props.children[2];
        expect(youtubeLink.props.href).to.equal('https://youtube.com/example');
        expect(youtubeLink.props.children).to.equal('youtube');
    });
});
