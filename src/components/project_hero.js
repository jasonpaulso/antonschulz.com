import Fade from 'react-reveal/Fade';
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
        <Fade duration={800} reverse key={this.state.key}>
          <img src={`${image_url}`} alt={''} key={this.state.key} />
        </Fade>
      </div>
    );
  }
}

export default ProjectHero;
