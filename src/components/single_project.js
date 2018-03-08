import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Footer from './footer';
import Navigation from './navigation';
import ProjectHero from './project_hero';
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

  componentDidMount() {
    const projectsRef = firebase.database().ref('projects');
    projectsRef.on('value', snapshot => {
      let projects = snapshot.val();
      console.log(projects);
      this.setState(
        {
          projects: projects,
        },
        () => {
          this.loadProject(this.props.match.params.id);
        }
      );
    });
  }

  loadImages(projectName, numberOfImages) {
    // let imageUrls = []
    // let index = 0
    // const storageRef = firebase.storage().ref();
    // // storageRef.location.path = image
    // // console.log(storageRef)
    // let imageUrl = ""
    // // let imageArray = []
    // // storageRef.getDownloadURL().then((url) => {console.log(url)})
    // while (index < numberOfImages) {
    //   storageRef.child(`Sushanthas/Sushanthas_${index}.jpg`).getDownloadURL().then((url) => {
    //     imageUrl = url
    //   }).then(()=>{
    //     if (imageUrl != undefined) {
    //       imageUrls.push(imageUrl)
    //       console.log(JSON.stringify(imageUrls))
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    //   index++
    // }
    // console.log(imageUrls)
  }

  loadProject(projectId, navLinkClicked) {
    this.setState(
      {
        project: this.state.projects[projectId],
        scrolled: true,
      },
      () => {
        if (!this.props.backGroundIsSet || navLinkClicked) {
          this.props.backgroundHandler(this.state.project.hero);
          console.log(this.state.project);
        }
      }
    );
  }

  componentWillUnmount() {
    this.props.onClearBackground();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadProject(this.props.match.params.id, true);
    }
  }

  componentWillReceiveProps(nextProps) {}

  renderProjectDetail() {
    const { name, hero, description, images, credits } = this.state.project;

    return (
      <section className={'project_container'}>
        {name &&
          hero &&
          description &&
          images && (
            <span>
              <div className={'project_title_container'}>
                <Fade>
                  <h1>{name}</h1>
                </Fade>
              </div>
              <div className={'project_blurb_container'}>
                <p>{description}</p>
              </div>
              <div className={'project_heroes'}>
                {images.map(imageUrl => {
                  if (!imageUrl.includes('_0'))
                    return (
                      <ProjectHero image_url={imageUrl} key={Math.random()} />
                    );
                })}
              </div>
              <span>
                {credits && credits.length > 0 && (
                  <div className={'project_credits_container'}>
                    {credits.map(credit => {
                      return (
                        <p key={credit.title}>
                          {credit.title}: {credit.name}
                        </p>
                      );
                    })}
                  </div>
                )}
              </span>
              <TrackVisibility offset={50}>
                <Footer
                  currentPage={this.props.match.params.id}
                  pages={this.state.projects.length}
                  next={parseInt(this.props.match.params.id, 10) + 1}
                  previous={this.props.match.params.id - 1}
                />
              </TrackVisibility>
            </span>
          )}
      </section>
    );
  }

  render() {
    const projects = this.state;

    const { name, hero, description, images, credits } = this.state.project;

    return (
      <span className={'project_outer_container'}>
        {name &&
          hero &&
          description &&
          images && (
            <span>
              <DocumentTitle title={`Anton Schulz | ${name}`} />
              <Navigation backButton={false} />
              <div className={'project_outer_container'}>
                {this.renderProjectDetail(
                  name,
                  hero,
                  description,
                  images,
                  credits
                )}
              </div>
            </span>
          )}
      </span>
    );
  }
}

export default Project;
