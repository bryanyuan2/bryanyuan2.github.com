import React from 'react';
import CompCertification from './../../../js/app/section/certification.tsx';
import ShallowTestRenderer from 'react-test-renderer/shallow';
import {expect} from 'chai';

interface CertificationProps {
    url: string;
    id?: string;
    children?: {
        props: {
            text: string;
        };
    }[];
}

let reactTestRendererResult: React.ReactElement<CertificationProps>;
const mockCertificationsJson: string = '../mock/data/mockCertifications.json';

describe('##react-test-renderer## js/app/section/certification.tsx testing', function() {
    beforeEach(async function() {
        const shadow = new ShallowTestRenderer();
        shadow.render(<CompCertification url={mockCertificationsJson} />);
        reactTestRendererResult = shadow.getRenderOutput() as React.ReactElement<CertificationProps>;
    });

    it('component container should be existed', function() {
        expect(reactTestRendererResult).to.exist;
    });

    it('component class should be rendered', function() {
        expect(reactTestRendererResult.props.id).to.equal('region-certification');
    });

    it('component title should be rendered', function() {
        expect(reactTestRendererResult.props.children?.[0].props.text).to.equal('Certification');
    });
});
