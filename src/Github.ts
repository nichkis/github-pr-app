import { RequestOptions, IncomingMessage } from 'http';
import { get } from 'https';

// workaround export pattern to stub makeHttpsRequest function in Github.spec.ts
export const github = {
  getPullRequests,
  makeHttpsRequest
}

// subset of properties absolutely necessary from each pr in the list prs API request
interface PullRequestData {
  commits_url: string,
  comments_url: string,
  user: {
    login: string
  }
}

// User-defined type guard for runtime execution check against /repos/:owner/:repo/pulls request
function isValidPRInterface(obj: any): obj is PullRequestData {
  return (
    (obj as PullRequestData).commits_url !== undefined &&
    (obj as PullRequestData).comments_url !== undefined &&
    (obj as PullRequestData).user !== undefined &&
    (obj as PullRequestData).user.hasOwnProperty('login')
  );
}

// Generic async function to handle get requests to github API
async function makeHttpsRequest(options: RequestOptions, url?: string): Promise<any> {
  return new Promise((resolve, reject) => {

    function cb() {
      return (response: IncomingMessage) => {
        let chunks  = '';

        response.on('data', data => {
          chunks += data;
        });

        response.on('end', () => {
          resolve(JSON.parse(chunks));
        });

        response.on('error', err => {
          reject(err);
        });
      }
    }

    if (url) {
      get(url, options, cb());
    } else {
      get(options, cb());
    }
  });
}

/* Takes in parameters owner (account name) and repo (repo name) from here retrieves all
necessary data to display open prs along with the number of commits, and
number of comments on the PR, and submitter of the pr */
async function getPullRequests(owner: string, repo: string): Promise<any[]> {

  const options: RequestOptions = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/pulls?state=open`,
    headers: {
      'User-Agent': 'github-pr-app-2'
    }
  };

  const pulls = await github.makeHttpsRequest(options);

  if (Array.isArray(pulls)) { // check pulls is an array
    return await Promise.all(pulls.map(async (el: any) => {

      if (isValidPRInterface(el)) { // check el contains the subset of properties we need
        const { commits_url, comments_url, user } = el;

        const commits = await github.makeHttpsRequest({ headers: options['headers']}, commits_url);
        const comments = await github.makeHttpsRequest({ headers: options['headers']}, comments_url);

        if (Array.isArray(commits) && Array.isArray(comments)) { // check commits/comments are of type array
          return {
            commits: commits.length,
            comments: comments.length,
            user: user.login
          }
        } else {
          throw new Error(
            `commits ${JSON.stringify(commits)} and comments ${JSON.stringify(comments)} incorrect type.`
          );
        }
      } else {
        throw new Error(`element ${el} in 'pulls' array incorrect type`);
      }
    }));
  } else {
    throw new Error(JSON.stringify(pulls));
  }
}
