import React from 'react';
import './Node.css';

export class Node extends React.Component {
    render() {
        const {isStart, isEnd, isVisited} = this.props;
        let extraClasses = isVisited ? 'visited ' : '';
        extraClasses = extraClasses.concat(isStart ? 'start' : isEnd ? 'end' : '');
        return <div className={"node ".concat(extraClasses)} ></div>;
    }
  }