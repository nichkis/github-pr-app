import { github } from './Github';
import 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';

describe('getPullRequests function', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('zero open pull requests verify empty array', async () => {
    // Arrange
    let makeHttpsRequestStub = sinon.stub(github, 'makeHttpsRequest');
    makeHttpsRequestStub.onCall(0).resolves([]);

    // Act
    let pulls = await github.getPullRequests('test', 'test');

    // Assert
    expect(pulls).to.be.an('array');
    expect(pulls.length).to.eql(0);
  });

  it('getPullRequests to be an array of length 1', async () => {
    // Arrange
    let makeHttpsRequestStub = sinon.stub(github, 'makeHttpsRequest');
    makeHttpsRequestStub.onCall(0).resolves(
      [{
        commits_url: 'foo',
        comments_url: 'bar',
        user: {
          login: 'brohan_solo'
        }
      }]
    );
    makeHttpsRequestStub.onCall(1).resolves([]);
    makeHttpsRequestStub.onCall(2).resolves([]);

    // Act
    let pulls = await github.getPullRequests('test', 'test');

    // Assert
    expect(pulls).to.be.an('array');
    expect(pulls.length).to.eql(1);
    expect(pulls[0]).to.have
  });
});
