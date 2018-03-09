import React, { Component } from 'react';

class ProjectHero extends Component {
  constructor() {
    super();
    this.state = {
      key: Math.random(),
    };
  }

  componentWillReceiveProps() {
    this.setState({
      key: Math.random(),
    });
  }

  render() {
    const { image_url } = this.props;
    return (
      <div className={'project_hero_container'} key={this.state.key}>
        <a 
          href={`${image_url}`}
          target="_blank"
          rel="noopener noreferrer"
          ><img src={`${image_url}`} alt={''} />
        </a>
      </div>
    );
  }
}

export default ProjectHero;
