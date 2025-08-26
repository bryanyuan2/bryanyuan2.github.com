import React from 'react';
import CompPublications from "./../../../js/app/section/publications.js";
import ShallowTestRenderer from 'react-test-renderer/shallow';
import { expect } from 'chai';
let reactTestRendererResult;
const mockPublicationsJson = '../mock/data/mockPublications.json';

describe('##react-test-renderer## js/app/section/publications.js testing', function(){
  beforeEach(function(done){
    const shadow = new ShallowTestRenderer();
    shadow.render(<CompPublications url={mockPublicationsJson} />);
    reactTestRendererResult = shadow.getRenderOutput();
    done();
  });

  it('component container should be existed', function () {
      expect(reactTestRendererResult).to.exist;
    });
  
    it('component class should be rendered', function () {
      expect(reactTestRendererResult.props.id).to.equal('region-publications');
    });
  
    it('component title should be rendered', function () {
      expect(reactTestRendererResult.props.children[0].props.text).to.equal('Publications');
    });
});