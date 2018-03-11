import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation from './navigation';

class About extends Component {
  constructor() {
    super();
    this.state = {
      about_description:
        'Hej! I’m a multidisciplinary designer from Stockholm, with a minimalist sensibility, and a dedication to purposeful design. Through my work I have gained experience in identity, branding, packaging, art direction, and interactive design. At Character in San Francisco, my talented teammates and I create and cultivate new and existing brands.',

      page_title: 'About',
      black_background: true,
    };
  }

  render = () => {
    return (
      <div className={'about'}>
        <Navigation showBackButton={true} />
        <DocumentTitle title={`Anton Schulz | ${this.state.page_title}`} />
        <div id="background_container" />
        <div className="about_description">
          <p>{this.state.about_description}</p>
        </div>
      </div>
    );
  };
}

export default About;
