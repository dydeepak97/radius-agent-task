import React, { Component } from 'react';
import Card from './Card';

export default class CountTable extends Component {
  render() {
    return (
      <div className='card-deck mt-3'>
        {/* <table className='no'>
          <tr>
          <th>Total Open issue</th>
          <th>Opened before 7 days</th>
          <th>Opened this week before 24 hours</th>
          <th>Opened within 24 hours</th>
          </tr> 
          <tr>
          
          <td>{this.props.total}</td>
          <td>{this.props.beforeWeek}</td>
          <td>{this.props.withinWeek}</td>
          <td>{this.props.withinDay}</td>
          </tr> 
        </table> */}
        <Card title='Total Open' value={this.props.total} />
        <Card title='Older than 7 days' value={this.props.beforeWeek} />
        <Card title='1 day to 7 days old' value={this.props.withinWeek} />
        <Card title='Within 24 hours' value={this.props.withinDay} />
      </div>
    )
  }
}
