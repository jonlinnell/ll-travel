import React, { Component } from 'react';
import LineStatusIcon from './LineStatusIcon';
import LineStatusText from './LineStatusText';
import "./LineStatus.css";

class LineStatus extends Component {
  render() {
    const statuses = this.props.line.lineStatuses.map((status) =>
      <LineStatusText status={status} />
    );
    return(
      <div className='card border-0 m-0 rounded-0' id={this.props.line.id}>
        <div className='card-header rounded-0'>
          {this.props.line.name}
          <LineStatusIcon line={this.props.line} />
          </div>
          {statuses}
      </div>
    )
  }
}

export default LineStatus;