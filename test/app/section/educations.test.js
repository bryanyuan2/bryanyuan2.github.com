import React from 'react';
import CompEducations from "./../../../js/app/section/educations.js";
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
let reactTestRendererResult;

const mockEducationsJson = [
  {
    school: "University A",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2015",
    endDate: "2019",
    description: "Studied various computer science topics including algorithms, data structures, and software engineering."
  }
];

describe('##react-test-renderer## testing', function(){

  beforeEach(async function(){
    const shadow = new ShallowTestRenderer();
    shadow.render(<CompEducations url={mockEducationsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
  });

  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-education');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Education');
  });
});
