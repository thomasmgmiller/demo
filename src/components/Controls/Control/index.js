import React from 'react';
import cn from 'classnames';
import './styles.css';

export default class Control extends React.Component {
  handleClick = () => {
    const { value, onClick } = this.props;

    onClick(value);
  }

  render() {
    const { active, label } = this.props;
    const classes = cn('control', {
      ['control--active']: active
    });

    return (
      <button
        onClick={this.handleClick}
        className={classes}
        disabled={active}
      >
        {label}
      </button>
    )
  }
}
