import {expect} from 'chai';
import update from '../topic/update';
import sinon from 'sinon';

describe('topic update', () => {
  afterEach(()=> {
    if ('restore' in Math.random) {
      Math.random.restore(); // reset the Math.random fixture
    }
  });

  describe('randomly successful', () => {
    beforeEach(()=> {
      sinon.stub(Math, 'random').returns(0.3);
    });

    it('does not accept green topics', () => {
      return update({session: {}, body: {color: 'Green'}}).
      then(
        ()=> {
        },
        (err)=> {
          expect(err.color).to.equal('We do not accept green topics');
        });
    });

    it('updates a topic', () => {
      const topic = {id: 2, color: 'Blue'};
      return update({session: {}, body: topic}).
      then(
        (res)=> {
          expect(res).to.deep.equal(topic);
        });
    });
  });

  describe('randomly unsuccessful', () => {
    beforeEach(()=> {
      sinon.stub(Math, 'random').returns(0.1);
    });

    it('rejects the call in 20% of the time', () => {
      return update().
      then(
        ()=> {
        },
        (err)=> {
          expect(err).to.equal('Oh no! Topic save fails 20% of the time. Try again.');
        });
    });
  });
});
