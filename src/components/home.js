import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Navigation from './navigation';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
// import firebase from '../db/firebase';
// import projectJSON from '../db/project_db.json';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      page_title: 'Home',
      projects: [],
      clicked: false,
      isTouch: false,
    };
  }

  componentDidMount = () => {

    window.previousLocation = this.props.location;
    const isNonTouch =
      document.getElementById('document').className === ' non-touch';
    // console.log(isNonTouch);
    if (!isNonTouch) {
      // eslint-disable-next-line
      () => {
        this.setState({
          isTouch: !isNonTouch,
        });
      };
    }

    // const projectsRef = firebase.database().ref('projects');
    // projectsRef.on('value', snapshot => {
    //   let projects = snapshot.val();
    //   this.setState({
    //     projects: projects,
    //   });
    // });

    this.setState({
      projects: this.props.projects
    })
  };

  componentWillMount = () => {
    const isNonTouch =
      document.getElementById('document').className === ' non-touch';
    // console.log(isNonTouch);
    if (!isNonTouch) {
      // eslint-disable-next-line
      () => {
        this.setState({
          isTouch: !isNonTouch,
        });
      };
    }
  };

  render() {
    const { projects, page_title, isTouch } = this.state;
    const { onClearBackground, backgroundHandler } = this.props;

    const projectRow = (project, index) => {

      let projectImageName = project.name.replace(/\W/g, '').toLowerCase()
      let projectImageSource = `./images/${projectImageName}/${projectImageName}_0.jpg`

      return (
        <span key={project.name}>
          <Link
            to={{ pathname: `/projects/${index}`}}
            onMouseEnter={
              isTouch ? null : () => backgroundHandler(projectImageSource)
            }
          >
            {project.name}
          </Link>
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
                <div
                  ref={'project'}
                  className={'projects'}
                  onMouseLeave={isTouch ? null : () => onClearBackground()}
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
              </Fade>
            </section>
          </span>
        )}
      </div>
    );
  }
}

export default Home;
