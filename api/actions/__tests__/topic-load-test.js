import {expect} from 'chai';
import load from '../topic/load';
import sinon from 'sinon';

describe('topic load', () => {
  afterEach(()=> {
    if ('restore' in Math.random) {
      Math.random.restore(); // reset the Math.random fixture
    }
  });

  describe('successful', () => {
    beforeEach(()=> {
      sinon.stub(Math, 'random').returns(0.4);
    });

    it('uses the topics from the session', () => {
      return load({session: {topics: ['a', 'b', 'c']}}).then(topics => {
        expect(topics.length).to.equal(3);
      });
    });

    it('initializes the topics ', () => {
      return load({session: {}}).then(topics => {
        expect(topics.length).to.equal(4);
        expect(topics[0].color).to.equal('Red');
      });
    });
  });

  describe('unsuccessful', () => {
    beforeEach(()=> {
      sinon.stub(Math, 'random').returns(0.2);
    });

    it('rejects the call', () => {
      return load({session: {}}).
      then(
        ()=> {
        },
        (err)=> {
          expect(err).to.equal('Topic load fails 33% of the time. You were unlucky.');
        });
    });
  });
});
