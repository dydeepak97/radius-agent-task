import { makeApiCall } from "./UtilService";

const GITHUB_API_HOST = 'api.github.com',
  issueEx = "http://api.github.com/repos/octocat/Hello-World/issues{/number}";


export function getIssuesForRepository(repoPath, cb) {
  let requestOptions = {
    protocol: 'https',
    hostname: GITHUB_API_HOST,
    pathname: `repos/${repoPath}/issues`,
    query: {
      state: 'open',
      per_page: 100
    }
  }

  return makeApiCall(requestOptions, cb);
};
