import { awaitableQuestion } from './UserInterface';
import { github } from './Github';

(async function prompt(): Promise<void> {
  try {
    const owner = await awaitableQuestion('Account name: ');
    const repo = await awaitableQuestion('Repo name: ');
    const pulls = await github.getPullRequests(owner, repo);
    console.log(pulls);
  } catch (e) {
    console.log(e);
  }
  prompt();
})();
