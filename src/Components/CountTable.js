import React, { Component } from 'react'

export default class CountTable extends Component {
  render() {
    return (
      <div>
        <table>
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
        </table>
      </div>
    )
  }
}
