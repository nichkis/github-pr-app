# github-pr-app

Install the dependencies and then execute `npm start` for interactive command line experience.
For testing, execute `npm test`.

Example input/output for the `lodash/lodash` owner and repository...

```
Account name: lodash
Repo name: lodash
[
  { commits: 4, comments: 0, user: 'ZimGil' },
  { commits: 1, comments: 0, user: 'ashwinspg' },
  { commits: 3, comments: 2, user: 'birarda' },
  { commits: 2, comments: 2, user: 'DoloMike' },
  { commits: 2, comments: 2, user: 'alexbrasetvik' },
  { commits: 1, comments: 2, user: 'octogonz' },
  { commits: 1, comments: 8, user: 'octogonz' },
  { commits: 4, comments: 9, user: 'sharmaaditya570191' },
  { commits: 12, comments: 2, user: 'phapdinh' },
  { commits: 1, comments: 1, user: 'prestonalexwebster' },
  { commits: 1, comments: 2, user: 'huntie' },
  { commits: 1, comments: 6, user: 'Brantron' }
]
Account name:
```

Tested and working for node version `13.2.0`.

Issues with repositories rate limiting as obtaining pull requests along with comments and commits
per pull request hits the 5000 per hour limit.  e.g. `apache` (owner) `spark` (repository) was an
issue.   
