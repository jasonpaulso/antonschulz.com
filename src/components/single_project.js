import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Footer from './footer';
import Navigation from './navigation';
import {} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import TrackVisibility from 'react-on-screen';
import firebase from '../db/firebase';

class Project extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      project: {
        name: '',
        description: '',
        hero: '',
        images: [],
        credits: [],
      },
    };
  }
  componentDidMount = () => {
    this.setGlobals();
    this.fetchProjects(this.loadIndividualProject);
  };
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
    this.props.onClearBackground();
  };
  componentDidUpdate = prevProps => {
    if (this.props.location !== prevProps.location) {
      this.updateIndividualProject(this.loadIndividualProject);
    }
  };

  fetchProjects = closure => {
    const projectsRef = firebase.database().ref('projects');
    projectsRef.on('value', snapshot => {
      let projects = snapshot.val();
      this.setState(
        {
          id: this.props.match.params.id,
          projects: projects,
        },
        () => {
          closure(this.props.match.params.id);
        }
      );
    });
  };

  setGlobals = () => {
    window.previousLocation = this.props.location;
    window.addEventListener('scroll', this.handleScroll);
  };

  loadIndividualProject = (projectId, navLinkClicked) => {
    this.setState(
      {
        project: this.state.projects[this.state.id],
      },
      () => {
        if (!this.props.backGroundIsSet || navLinkClicked) {
          this.props.backgroundHandler(this.state.project.hero);
        }
        window.scrollTo(0, 0);
      }
    );
  };
  handleScroll = event => {
    let blurbContainer = document.getElementById('project_blurb_container');
    let navTop = document.getElementById('top_nav');
    if (
      navTop.getBoundingClientRect().bottom >=
      blurbContainer.getBoundingClientRect().top
    ) {
      navTop.classList.add('scrolling');
    } else {
      navTop.classList.remove('scrolling');
    }
  };
  updateIndividualProject = closure => {
    this.setState(
      {
        id: this.props.match.params.id,
      },
      () => {
        closure(this.state.id, true);
      }
    );
  };

  render = () => {
    const { project } = this.state;

    const { name, description, images, credits } = project;

    return (
      <span>
        {project &&
          images && (
            <span className={'project_outer_container'}>
              <span>
                <DocumentTitle title={`Anton Schulz | ${name}`} />
                <Navigation backButton={false} />
                <div className={'project_outer_container'}>
                  <section className={'project_container'}>
                    <div className={'project_title_container'}>
                      <Fade>
                        <h1>{name}</h1>
                      </Fade>
                    </div>
                    <ProjectDescriptionModule description={description} />
                    <ProjectGalleryModule images={images} />
                    {credits &&
                      credits.length && <CreditsModule credits={credits} />}
                    <TrackVisibility offset={50}>
                      <Footer
                        currentPage={this.props.match.params.id}
                        pages={this.state.projects.length}
                      />
                    </TrackVisibility>
                  </section>
                </div>
              </span>
            </span>
          )}
      </span>
    );
  };
}

export default Project;

const ProjectGalleryModule = props => {
  const { images } = props;
  return (
    <div className={'project_heroes'}>
      {images.sort().map(imageUrl => {
        if (!imageUrl.includes('_0')) {
          return (
            <Fade key={Math.random()}>
              <ProjectHero image_url={imageUrl} />
            </Fade>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

const ProjectHero = props => {
  const { image_url } = props;
  return (
    <div className={'project_hero_container'} key={image_url}>
      <a href={`${image_url}`} target="_blank" rel="noopener noreferrer">
        <img src={`${image_url}`} alt={''} />
      </a>
    </div>
  );
};

const CreditsModule = props => {
  const { credits } = props;
  return (
    <div className={'project_credits_container'}>
      {credits.map(credit => {
        return (
          <p key={credit.title}>
            {credit.title}: {credit.name}
          </p>
        );
      })}
    </div>
  );
};

const ProjectDescriptionModule = props => {
  const { description } = props;
  return (
    <div className={'project_blurb_container'} id={'project_blurb_container'}>
      <p>{description}</p>
    </div>
  );
};
