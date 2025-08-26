import React from 'react';
import CompFooter from "./../../../js/app/section/footer.js";
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
let reactTestRendererResult;
const mockFooterJson = '../mock/data/mockFooter.json';

describe('##react-test-renderer## js/app/section/footer.js testing', function(){
  beforeEach(async function(){
    const shadow = new ShallowTestRenderer();
    shadow.render(<CompFooter url={mockFooterJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
  });

  it('component container should be existed', function () {
    expect(reactTestRendererResult).to.exist;
  });
});