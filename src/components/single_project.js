import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Footer from './footer';
import Navigation from './navigation';
import {} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import TrackVisibility from 'react-on-screen';
import firebase from '../db/firebase';
import ProgressiveImage from 'react-progressive-image';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class Project extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      project: {},
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

    const project = this.state.projects.filter (project => "Thync" === project.name)
    console.log(project)
    this.setState(
      {
        project: this.state.projects[this.state.id],
      },
      () => {
        if (!this.props.backGroundIsSet || navLinkClicked) {
          this.props.backgroundHandler(this.state.project.hero);
        }
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = 'auto'
      }
    );
  };
  handleScroll = event => {
    let descriptionContainer = document.getElementById('project_blurb_container');
    let navTop = document.getElementById('top_nav');
    if ( navTop && descriptionContainer &&
      navTop.getBoundingClientRect().bottom >=
      descriptionContainer.getBoundingClientRect().top
    ) {
      navTop.classList.add('scrolling');
    } else {
      navTop.classList.remove('scrolling');
    }

    let projectContainer = document.getElementById('project_blurb_container');
    let documentTop = document.body.scrollTop - 300;
    let backgroundContainer = document.getElementById('background_container');
    if (projectContainer && documentTop && backgroundContainer&&
      documentTop >= projectContainer.getBoundingClientRect().bottom
    ) {
      backgroundContainer.classList.add('hidden');
    } else {
      backgroundContainer.classList.remove('hidden');
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

    return (
      <span>
        {project &&
          project.images && (
            <span className={'project_outer_container'}>
              <span>
                <DocumentTitle title={`Anton Schulz | ${project.name}`} />
                <Navigation backButton={false} />
                <div className={'project_inner_container'} >
                  <section className={'project_container'}>
                    <div className={'project_title_container'}>
                      <Fade>
                        <h1>{project.name}</h1>
                      </Fade>
                    </div>
                    <ProjectDescriptionModule description={project.description} />
                    <ProjectGalleryModule images={project.images} />
                    {project.credits &&
                      project.credits.length && <CreditsModule credits={project.credits} />}
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

      {images.sort().map((imageUrl, index) => {
        if (!imageUrl.includes('_0')) {
          return (
            
              <ProjectGalleryImage image_url={imageUrl} key={imageUrl}/>
            
          );

        } else {
          return null;
        }
      })}
    </div>
  );
};

const ProjectGalleryImage = props => {
  const { image_url } = props;
  return (
   
    <div className={'project_hero_container'}>
    
          <ProgressiveImage src={image_url} placeholder={null}>
        {(src, loading) => (
            <Fade delay={300} duration={3000} key={image_url}>
            <img style={{ opacity: loading ? 0 : 1, width:'100%' }} src={src} alt={src}/>
            </Fade>
        )}
      </ProgressiveImage>
      
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


