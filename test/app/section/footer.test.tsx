import React from 'react';
import CompFooter from './../../../js/app/section/footer.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';

interface FooterProps {
    id: string;
}

let reactTestRendererResult: React.ReactElement<FooterProps>;
const mockFooterJson = '../mock/data/mockFooter.json';

describe('##react-test-renderer## js/app/section/footer.tsx testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompFooter url={mockFooterJson} />);
        reactTestRendererResult = shadow.getRenderOutput() as React.ReactElement<FooterProps>;
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });
});
