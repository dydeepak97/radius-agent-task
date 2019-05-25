import { makeApiCall} from "./UtilService";

const GITHUB_API_BASE_URL = 'api.github.com' , 
  issueEx = "http://api.github.com/repos/octocat/Hello-World/issues{/number}";


 export function getIssuesForRepository (repoPath, cb) {
    let requestOptions = {
      protocol: 'https',
      hostname: GITHUB_API_BASE_URL,
      pathname: `repos/${repoPath}/issues`,
      query: {
        state: 'closed'
      }
    }

    return makeApiCall(requestOptions, cb);
  };
