import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getIssuesForRepository } from './Services/GithubService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoUrl: '',
      issueList: []
    }
  }

  handleClick = () => {
    getIssuesForRepository(this.state.repoUrl, this.apiCallback)
  }

  handleUrlFieldChange = (event) => {
    this.setState({
      repoUrl: event.target.value
    });
  }

  apiCallback = (err, data) => {
    console.log('API call done');
    console.log('Data', data);
    console.log('Error', err);
    console.log('Created at', data[0].created_at);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <input
            type='text'
            value={this.state.repoUrl}
            onChange={this.handleUrlFieldChange}
          />
          <a
            className="App-link"
            // href="https://reactjs.org"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={this.handleClick}
          >
            Learn React
          </a>

        </header>
      </div>
    );
  }
}

export default App;
