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
      timestamp: 'Thu Mar 08 2018 15:06:23 GMT-0800 (PST)',
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

      this.setState(
        {
          id: this.props.match.params.id,
          projects: projects,
        },
        () => {
          this.loadProject(this.props.match.params.id);
        }
      );
    });
  }
  loadProject(projectId, navLinkClicked) {
    this.setState(
      {
        project: this.state.projects[this.state.id],
        scrolled: true,
      },
      () => {
        if (!this.props.backGroundIsSet || navLinkClicked) {
          this.props.backgroundHandler(this.state.project.hero);
        }
        window.scrollTo(0, 0);
      }
    );
  }

  componentWillUnmount() {
    this.props.onClearBackground();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState(
        {
          id: this.props.match.params.id,
        },
        () => {
          this.loadProject(this.state.id, true);
        }
      );
    }
  }

  render() {
    const { id, timestamp } = this.state;

    const { name, hero, description, images, credits } = this.state.project;

    // const {  } = this.state

    return (
      <span className={'project_outer_container'}>
        {name &&
          hero &&
          description &&
          images &&
          timestamp &&
          id && (
            <span>
              <DocumentTitle title={`Anton Schulz | ${name}`} />
              <Navigation backButton={false} />
              <div className={'project_outer_container'}>
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
                          {credits &&
                            credits.length > 0 && (
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
              </div>
            </span>
          )}
      </span>
    );
  }
}

export default Project;
