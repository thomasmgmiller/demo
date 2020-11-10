import React from 'react';
import cn from 'classnames';
import Control from './Control';

export default class Controls extends React.Component {

  render() {
    const { options, value, onClick } = this.props;

    return (
      <div className="controls">
        <Control
          key="all"
          value={null}
          label="All"
          onClick={onClick}
          active={null === value}
        />
        {options.map(option => (
          <Control
            key={option}
            value={option}
            label={option}
            onClick={onClick}
            active={option === value}
          />
        ))}
      </div>
    )
  }
}
