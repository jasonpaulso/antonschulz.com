import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from './bottom_nav';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      backButton: false,
    };
  }
  componentDidMount() {

    if (
      document.referrer &&
      document.location.href !== document.location.origin + '/' &&
      this.props.showBackButton
    ) {
      this.setState({
        backButton: true,
      });
    }
  }

  render() {
    return (
      <div className={'navigation'}>
        <div className={'nav top_nav'}>
          <span className={'page_name nav_top_left'}>
            <Link to="/" label="Anton Schulz">
              Anton Schulz
            </Link>
          </span>
          <span className={'navigation nav_top_right'}>
            {this.state.backButton ? (
              <a href={null} onClick={() => window.history.back()}>Back</a>
            ) : (
              <Link to={'/about'}>About</Link>
            )}
          </span>
        </div>
        <BottomNav />
      </div>
    );
  }
}

export default Navigation;
