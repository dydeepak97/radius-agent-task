# Github Repository Issue Count
[App Demo](https://dy-radius-task.herokuapp.com/)

## Description:

This is a ReactJS app.
This app can be used to fetch open issues count of a repository using the url of the repository. The app uses GitHub API v3 to fetch the data.

The GitHub API returns list of issues from the `/repos/:owner/:repo/issues` endpoint.

The url entered by user is parsed to extract the pathname. The extracted pathname is of the form `/:owner/:repo`. This is used to build the API request url.

The GitHub API also allows adding query parameter `state` to only fetch issues with a certain state. `'open'` is passed as `state` query parameter to fetch only open issues.

The Github API includes pull requests as issues when returning issue data. We need to filer that out to only get issues. Each pull request included in the data as an issue has `pull_request` property. We filter out the elements with this property.

API returns data in the form of an array of issues. Each issue element is an object with properties of the issue. One of the properties of the issue is `created_at`. This property is used to segregate the issues according to the problem statement.


This app has certain limitations that are described in improvements section.

#### Demo
The app is deployed on heroku. To use the app, Click [Here](https://dy-radius-task.herokuapp.com/)

##### Run locally
To run the app locally, just clone this repo and run following commands: 
  ```
  npm install
  npm start
  ```
  The app can now be used on browser on [localhost:3000](localhost:300)

##### Improvements

The App is great for repositories with less than 100 open issues but is not well suited for repositories with huge number of open issue, e.g. 900.

This is due the limitations of GitHub API v3. The result of Github issue endpoint is paginated with maximum allowed number of results in one API call set to 100. If a repository has more than 100 issues, another API is called needed to fetch the next 100 issues and so on. More number of open issues result in more API calls and user has to wait longer to see the final counts.

Also, the API is rate limited. Only 60 requests are allowed each hour from one IP address. Making multiple calls to fetch large number of issues of a repository exhausts this limit rapidly.

OAuth can be added to increase this limit.

Given more time, I would use Github API v4 to fetch data. Github API v4 uses graphQL. The response is not paginated and the data received will not contain irrelevant information about issue like title, etc. We can query only the issue count from API and it would result in a very fast response from the API without the need of multiple API calls.


The UI can also be improved with filters to allow user to only view count for a certain period instead of displaying all periods at once.
