import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Footer from './footer';
import Navigation from './navigation';
import {} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import TrackVisibility from 'react-on-screen';
// import firebase from '../db/firebase';
import { Redirect } from 'react-router-dom';
import { ProjectGalleryModule, ProjectDescriptionModule, ProjectCreditsModule } from './elements/project_modules';


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
    
    // const projectsRef = firebase.database().ref('projects');
    // projectsRef.on('value', snapshot => {
    //   let projects = snapshot.val();
    //   this.setState(
    //     {
    //       id: this.props.match.params.id,
    //       projects: projects,
    //     },
    //     () => {
    //       closure(this.props.match.params.id);
    //     }
    //   );
    // });
    this.setState(
        {
          id: this.props.match.params.id,
          project: this.props.project,
        },
        () => {
          closure(this.props.match.params.id);
        }
      );
  };

  setGlobals = () => {
    window.previousLocation = this.props.location;
    window.addEventListener('scroll', this.handleScroll);
  };

  loadIndividualProject = (projectId, navLinkClicked) => {
    // this.setState(
    //   {
    //     project: this.state.projects[this.state.id],
    //   },
    //   () => {

    //     if (!this.state.project) {
    //       this.setState({
    //         navigateFallback: true
    //       }, () => {
    //         return
    //       })
    //     } else {
    //       this.loadProjectImages(this.state.project)
    //       if (!this.props.backGroundIsSet || navLinkClicked) {
    //         this.props.backgroundHandler(this.state.project.hero);
    //       }
    //       window.scrollTo(0, 0);
    //       document.documentElement.style.overflow = 'auto';
    //     }
        
    //   }
    // );
      if (!this.state.project) {
          this.setState({
            navigateFallback: true
          }, () => {
            return
          })
        } else {
          this.loadProjectImages(this.state.project)
          if (!this.props.backGroundIsSet || navLinkClicked) {
            this.props.backgroundHandler(this.state.project.hero);
          }
          window.scrollTo(0, 0);
          document.documentElement.style.overflow = 'auto';
        }
  };

  loadProjectImages(project) {
      let projectNumberOfImages = project.number_of_images
      let projectImageName = project.name.replace(/\W/g, '').toLowerCase()
      let images = []

      for (var i = 1; i <= projectNumberOfImages; i++) {
        let projectImageSource = `/images/${projectImageName}/${projectImageName}_${i}.jpg`
        images.push(projectImageSource)
      }

      this.setState({
        project_images: images
      }, () => {
        // console.log(this.state.project_images)
      })


  }


  handleScroll = event => {
    // this.handleBackgroundHide()
    this.handleMobileNavColorChangeOnScroll()
  };

  handleMobileNavColorChangeOnScroll = () => {
    let descriptionContainer = document.getElementById('project_blurb_container');
    let navTop = document.getElementById('top_nav');
    if ( navTop && descriptionContainer &&
      navTop.getBoundingClientRect().bottom >= descriptionContainer.getBoundingClientRect().top
    ) {
      navTop.classList.add('scrolling');
    } else {
      navTop.classList.remove('scrolling');
    }
  };

  handleBackgroundHide = () => {
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
    this.setState({id: this.props.match.params.id, project: this.props.project},() => {closure(this.state.id, true); });
  };

  render = () => {
    const { project, navigateFallback, project_images } = this.state;
    const { description } = this.state.project
    if (navigateFallback) {
      return <Redirect to="/" push={true} />
    }
    return (
      <span>
        {project &&
          project_images && description && project.name &&(
            <span className={'project_outer_container'}>
                <DocumentTitle title={`Anton Schulz | ${project.name}`} />
                <Navigation backButton={false} />
                <div className={'project_inner_container'} >
                  <section className={'project_container'}>
                    <div className={'project_title_container'}><Fade><h1>{project.name}</h1></Fade></div>
                    <ProjectDescriptionModule description={description} className={'project_blurb_container'} id={'project_blurb_container'}/>
                    <ProjectGalleryModule images={project_images} className={'project_heroes'} imageClassName={'project_hero_container'}/>
                    {project.credits && project.credits.length && <ProjectCreditsModule credits={project.credits} className={'project_credits_container'}/> }
                    <TrackVisibility offset={50}><Footer currentPage={this.props.match.params.id} numberOfProjects={this.props.numberOfProjects} /></TrackVisibility>
                  </section>
                </div>
            </span>
          )}
      </span>
    );
  };
};

export default Project;



