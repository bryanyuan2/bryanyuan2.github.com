import React from 'react';
import PhotosetContainer from './../../../js/app/section/photoset.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';
let reactTestRendererResult;
const mockPhotosetJson = '../mock/data/mockPhotoset.json';

describe('##react-test-renderer## js/app/section/photoset.js testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<PhotosetContainer url={mockPhotosetJson} sectionID="test-section" text="Test Photoset" />);
        reactTestRendererResult = shadow.getRenderOutput();
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component id should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-photoset');
    });

    it('component SectionHeader should be rendered', function() {
        const sectionHeader = reactTestRendererResult.props.children[0];
        expect(sectionHeader.props.setID).to.equal('test-section');
        expect(sectionHeader.props.text).to.equal('Test Photoset');
    });

    it('photo gallery should be rendered', function() {
        const photoGallery = reactTestRendererResult.props.children[2].props.children[0];
        expect(photoGallery.props.className).to.equal('photo-gallery');
    });
});
