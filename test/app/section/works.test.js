import React from 'react';
import CompWorks from "./../../../js/app/section/works.js";
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
let reactTestRendererResult;

const mockWorksJson = [
  {
    corp: [
      {
        name: "Company A",
        url: "http://example.com",
        position: "Developer",
        date: "2023",
        logo: "http://example.com/logo.png",
        logoalt: "Company A Logo",
        width: 100,
        height: 100
      }
    ],
    experience: [
      {
        title: "Project A",
        description: "Developed feature X."
      }
    ],
    product: [
      {
        link: "http://example.com/product",
        img: "http://example.com/product.png",
        title: "Product A"
      }
    ]
  }
];

describe('##react-test-renderer## js/app/section/works.js testing', function(){
  beforeEach(async function(){
    const shadow = new ShallowTestRenderer();
    shadow.render(<CompWorks url={mockWorksJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
  });

  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });

  it('component class should be rendered', function () {
    expect(reactTestRendererResult.props.id).to.equal('region-experience');
  });

  it('component title should be rendered', function () {
    expect(reactTestRendererResult.props.children[0].props.text).to.equal('Work Experience');
  });
});
