import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      next: 2,
      previous: 1,
    };
  }

  componentDidMount() {
    this.loadFooter();
  }

  handleOnClick = projectId => {
    // this.props.handleProjectChange(projectId, true)
  };

  handleVisibilityChange = isVisible => {
    const bottomNav = document.getElementById('bottom_nav');
    if (isVisible) {
      bottomNav.classList.add('footer_view');
    } else {
      bottomNav.classList.remove('footer_view');
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
      this.handleVisibilityChange(nextProps.isVisible);
    } else {
      this.loadFooter();
    }
  }

  loadFooter() {
    const radix = 10;
    const currentPage = parseInt(this.props.currentPage, radix);
    const numberOfPages = this.props.pages;
    this.setState({
      next: this.props.pages > currentPage + 1 ? currentPage + 1 : 0,
      previous:
        this.props.currentPage - 1 >= 0 ? currentPage - 1 : numberOfPages - 1,
    });
    this.handleVisibilityChange(false);
  }

  render() {
    return (
      <footer>
        <div className="footer_top_nav">
          <span className="previous_link">
            <Link to={{ pathname: `/projects/${this.state.previous}` } } timestamp={new Date().toString()} >
              Previous
            </Link>
          </span>
          <span className="next_link">
            <Link to={{ pathname: `/projects/${this.state.next}` }}>Next</Link>
          </span>
        </div>
      </footer>
    );
  }
}

export default withRouter(Footer);
