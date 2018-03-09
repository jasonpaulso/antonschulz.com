import createHoverMonitor from './createHoverMonitor';
import { element, func, oneOfType } from 'prop-types';
import React, { Component } from 'react';

const hover = createHoverMonitor();

export default class Hoverable extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleMouseEnter(e) {
    if (hover.isEnabled && !this.state.isHovered) {
      const { onHoverIn } = this.props;
      if (onHoverIn) onHoverIn();
      this.setState(() => ({ isHovered: true }));
    }
  }
  
  _handleMouseLeave(e) {
    if (this.state.isHovered) {
      const { onHoverOut } = this.props;
      if (onHoverOut) onHoverOut();
      this.setState(() => ({ isHovered: false }));
    }
  }

  render() {
    const { children, onHoverIn, onHoverOut } = this.props;
    const child = typeof children === 'function' ? children(this.state.isHovered) : children;

    return React.cloneElement(React.Children.only(child), {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave
    });
  }
};

Hoverable.displayName = 'Hoverable';

Hoverable.propTypes = {
  children: oneOfType([ func, element ]),
  onHoverIn: func,
  onHoverOut: func
};