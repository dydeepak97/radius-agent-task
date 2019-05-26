import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import { getIssuesForRepository } from './Services/GithubService';
import CountTable from './Components/CountTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoUrl: '',
      issueList: [],
      errorMessage: '',
      currentTime: moment().format()
    }
  }

  handleClick = () => {
    console.log('Time 24 hours ago:', moment().subtract(1, 'days').format());

    if (this.state.currentTime > moment(this.state.currentTime).subtract(1, 'days').format()) {
      console.log('DDD');

    }

    getIssuesForRepository(this.state.repoUrl, this.handleRepoData)
  }

  handleUrlFieldChange = (event) => {
    this.setState({
      repoUrl: event.target.value
    });
  }

  handleRepoData = (err, data) => {
    if (err) {
      this.setState({
        errorMessage: 'An error occurred while trying to fetch issues. Try again.',
        issueList: []
      });
      return;
    }
    if (!Array.isArray(data)) {
      this.setState({
        errorMessage: 'No repository found. Change search url',
        issueList: []
      });
      return;
    }

    if (Array.isArray(data) && data.length === 0) {
      this.setState({
        errorMessage: 'No issues in this repository',
        issueList: []
      });
      return;
    }
    this.setState({
      issueList: data
    });
    console.log('API call done');
    console.log('Data', data);
    console.log('Error', err);
    console.log(this.state.errorMessage);
  }

  getIssueBeforeWeek = () => {
    let { issueList } = this.state,
      count = 0;
    issueList.forEach(issue => {
      if (moment(issue.created_at).format() < moment(this.state.currentTime).subtract(1, 'weeks').format()){
        count++;
      }
    });

    return count;
  }

  getIssueWithinWeek = () => {
    let { issueList } = this.state,
      count = 0;
    issueList.forEach(issue => {
      if (moment(issue.created_at).format() > moment(this.state.currentTime).subtract(1, 'weeks').format() && 
        moment(issue.created_at).format() < moment(this.state.currentTime).subtract(1, 'days').format()){
        count++;
      }
    });

    return count;
  }

  getIssueWithinDay = () => {
    let { issueList } = this.state,
      count = 0;
    issueList.forEach(issue => {
      if (moment(issue.created_at).format() > moment(this.state.currentTime).subtract(1, 'days').format()){
        count++;
      }
    });

    return count;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CountTable 
          total={this.state.issueList.length} 
          beforeWeek={this.getIssueBeforeWeek()}
          withinWeek={this.getIssueWithinWeek()}
          withinDay={this.getIssueWithinDay()}
          />
          {this.getIssueBeforeWeek()}<br/>
          {this.getIssueWithinWeek()}<br/>
          {this.getIssueWithinDay()}<br/>
          <input
            type='text'
            value={this.state.repoUrl}
            onChange={this.handleUrlFieldChange}
            autoFocus
          />
          <button
            // className="App-link"
            // href="https://reactjs.org"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={this.handleClick}
          >
            Search
          </button>

        </header>
      </div>
    );
  }
}

export default App;
