import React from 'react';
import CompSummary from "./../../../js/app/section/summary.js";
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
let reactTestRendererResult;

const mockSummaryJson = [
  {
    title: "Experienced Software Engineer",
    description: "Over 10 years of experience in developing scalable web applications and services."
  },
  {
    title: "Proficient in Modern Technologies",
    description: "Expertise in React, Node.js, and cloud platforms like AWS and Azure."
  },
  {
    title: "Strong Leadership Skills",
    description: "Led multiple cross-functional teams to deliver high-quality products on time."
  }
];

describe('##react-test-renderer## js/app/section/summary.js testing', function(){
  beforeEach(function(done){
    const shadow = new ShallowTestRenderer();
    shadow.render(<CompSummary url={mockSummaryJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });

  it('component container should be existed', function () {
      expect(reactTestRendererResult).to.exist;
    });
  
    it('component class should be rendered', function () {
      expect(reactTestRendererResult.props.id).to.equal('region-summary');
    });
  
    it('component title should be rendered', function () {
      expect(reactTestRendererResult.props.children[0].props.text).to.equal('Summary of Qualifications');
    });
});