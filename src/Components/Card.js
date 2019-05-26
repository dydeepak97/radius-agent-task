import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    return (
      <div className='card bg-light mb-3'>
        <div className="card-header">{this.props.title}</div>
        <div className="card-body">
          <h5 className="card-title">{this.props.value}</h5>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        </div>
      </div>
    )
  }
}
