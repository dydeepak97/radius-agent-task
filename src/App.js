import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import moment from 'moment';
import { getIssuesForRepository } from './Services/GithubService';
import CountTable from './Components/CountTable';
import Card from './Components/Card';
import SpinnerGroup from './Components/SpinnerGroup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoUrl: '',
      issueList: [],
      errorMessage: 'Hit Search to get issue counts',
      isLoading: false,
      currentTime: moment().format()
    }
  }

  handleSearch = () => {
    if (!this.state.repoUrl) {
      this.setState({
        errorMessage: 'Enter a url first'
      });
      return;
    }
    console.log('Time 24 hours ago:', moment().subtract(1, 'days').format());

    if (this.state.currentTime > moment(this.state.currentTime).subtract(1, 'days').format()) {
      console.log('DDD');

    }

    this.setState({
      isLoading: true,
      errorMessage: ''
    });

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
        errorMessage: 'Something went wrong',
        issueList: [],
        isLoading: false
      });
      return;
    }
    if (!Array.isArray(data)) {
      this.setState({
        errorMessage: 'No repository found. Change search url',
        issueList: [],
        isLoading: false
      });
      return;
    }

    if (Array.isArray(data) && data.length === 0) {
      this.setState({
        errorMessage: 'No issues in this repository',
        issueList: [],
        isLoading: false
      });
      return;
    }
    this.setState({
      issueList: data,
      isLoading: false
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
      if (moment(issue.created_at).format() < moment(this.state.currentTime).subtract(1, 'weeks').format()) {
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
        moment(issue.created_at).format() < moment(this.state.currentTime).subtract(1, 'days').format()) {
        count++;
      }
    });

    return count;
  }

  getIssueWithinDay = () => {
    let { issueList } = this.state,
      count = 0;
    issueList.forEach(issue => {
      if (moment(issue.created_at).format() > moment(this.state.currentTime).subtract(1, 'days').format()) {
        count++;
      }
    });

    return count;
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div class="form-group mt-3">
          <h3 className='text-light'>Enter a Github repository URL</h3>
          <input
            type="text"
            className="form-control form-control-lg mt-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={this.state.repoUrl}
            onChange={this.handleUrlFieldChange}
            autoFocus
          />
        </div>
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={this.handleSearch}
          disabled={this.state.isLoading}
        >
          {
            this.state.isLoading ?
              <div>
                <span class="spinner-grow spinner-border-sm" role="status" aria-hidden="true"></span>
                {/* <span class="sr-only">Loading...</span> */}
              </div>
              :
              'Search'
          }
        </button>
        {
          this.state.errorMessage && 
          <h2 className='mt-3 text-muted'>{this.state.errorMessage}</h2>
        }
        {
          !this.state.errorMessage && 
          (this.state.isLoading ?
            <SpinnerGroup /> :
            <CountTable
              total={this.state.issueList.length}
              beforeWeek={this.getIssueBeforeWeek()}
              withinWeek={this.getIssueWithinWeek()}
              withinDay={this.getIssueWithinDay()}
            />)
        }

        {/* <CountTable
          total={this.state.issueList.length}
          beforeWeek={this.getIssueBeforeWeek()}
          withinWeek={this.getIssueWithinWeek()}
          withinDay={this.getIssueWithinDay()}
        /> */}

        {/* {this.getIssueBeforeWeek()}<br />
          {this.getIssueWithinWeek()}<br />
          {this.getIssueWithinDay()}<br />

          <Card />
          <input
            type='text'
            value={this.state.repoUrl}
            onChange={this.handleUrlFieldChange}
          // autoFocus
          />
          <button
            onClick={this.handleClick}
          >
            Search
          </button> */}
      </div>
    );
  }
}

export default App;
