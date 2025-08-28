import React from 'react';
import SectionHeader from './../../../js/app/component/section-header.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
import { ReactTestRendererJSON } from 'react-test-renderer';

let reactTestRendererResult: ReactTestRendererJSON | null;

describe('##react-test-renderer## js/app/component/section-header.js testing', function () {
    beforeEach(function () {
        const shadow = new ShallowTestRenderer();
        shadow.render(<SectionHeader setID="test-id" text="Test Header" />);
        reactTestRendererResult =
            shadow.getRenderOutput() as ReactTestRendererJSON;
    });

    it('component container should be existed', function () {
        expect(reactTestRendererResult).to.exist;
    });

    it('should render the correct text', function () {
        const renderedText: string = reactTestRendererResult?.props.children;
        expect(renderedText).to.equal('Test Header');
    });

    it('should have the correct id', function () {
        const renderedId: string = reactTestRendererResult?.props.id;
        expect(renderedId).to.equal('set-test-id');
    });
});
