import React from 'react';
import './Node.css';

export class Node extends React.Component {
    render() {
        const {isStart, isEnd, isVisited} = this.props;
        const extraClasses = isStart ? 'start' : isEnd ? 'end' : isVisited ? 'visited' : '';
        return <div className={"node ".concat(extraClasses)} ></div>;
    }
  }