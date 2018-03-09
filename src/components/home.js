import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation from './navigation';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import firebase from '../db/firebase';
import Hoverable from '../hoverable';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      page_title: 'Home',
      projects: [],
      clicked: false,
    };
  }

  componentDidMount() {
    const projectsRef = firebase.database().ref('projects');
    projectsRef.on('value', snapshot => {
      let projects = snapshot.val();
      console.log(projects);
      this.setState({
        projects: projects,
      });
    });
  }

  render() {
    const { projects, page_title } = this.state;
    const { onClearBackground, backgroundHandler } = this.props;

    const projectRow = (project, index) => {
      return (
        <span key={project.name}>
        <Hoverable>
          <Link
            to={{ pathname: `/projects/${index}` }}
            onMouseEnter={() => backgroundHandler(project.hero)}
          >
            {project.name}
          </Link>
          </Hoverable>
        </span>
      );
    };

    return (
      <div className={'home_container'}>
        {projects.length > 0 && (
          <span>
            <Navigation showBackButton={false} />
            <DocumentTitle title={`Anton Schulz | ${page_title}`} />
            <section>
              <Fade>
                <Hoverable>
                <div
                  ref={'project'}
                  className={'projects'}
                  onMouseLeave={() => onClearBackground()}
                >
                  <div className="row">
                    {projects.slice(0, 3).map((project, index) => {
                      return projectRow(project, index);
                    })}
                  </div>
                  <div className="row">
                    {projects.slice(3).map((project, index) => {
                      return projectRow(project, index + 3);
                    })}
                  </div>
                </div>
              </Hoverable>
              </Fade>
            </section>
          </span>
        )}
      </div>
    );
  }
}

export default Home;
