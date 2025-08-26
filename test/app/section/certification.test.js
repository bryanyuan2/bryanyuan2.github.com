import React from 'react';
import CompCertification from "./../../../js/app/section/certification.js";
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
let reactTestRendererResult;
const mockCertificationsJson = '../mock/data/mockCertifications.json';

describe('##react-test-renderer## js/app/section/certification.js testing', function(){
  beforeEach(async function(){
    const shadow = new ShallowTestRenderer();
    shadow.render(<CompCertification url={mockCertificationsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
  });

  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-certification');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Certification');
  });
});