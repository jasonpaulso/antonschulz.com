import React, { Component } from 'react';
import './App.css';
import About from './components/about';
import Home from './components/home';
import Project from './components/single_project';
// import Fade from 'react-reveal/Fade';
import projectJSON from './db/project_db.json';
import viewportunitsfix from 'viewport-units-buggyfill';
import FadeIn from 'react-fade-in';

import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    viewportunitsfix.init();
    this.state = {
      outerBackgroundIsActive: true,
      backgroundOuter: null,
      backgroundInner: null,
      backgroundContainerVisable: true,
      backGroundIsSet: false,
    };
  }

  componentDidMount = () => {
    const isTouch = !(
      document.getElementById('document').className === ' non-touch'
    );
    if (isTouch) {
      this.setState({
        isTouch: isTouch,
      });
    }
  };

  handleBackgroundRender = image => {
    if (this.state.outerBackgroundIsActive) {
      this.setState(
        {
          backgroundOuter: image,
          outerBackgroundIsActive: !this.state.outerBackgroundIsActive,
          backgroundContainerVisable: true,
          backGroundIsSet: true,
        },
        () => {
          this.setState({
            backgroundInner: null,
          });
        }
      );
    } else {
      this.setState(
        {
          backgroundInner: image,
          outerBackgroundIsActive: !this.state.outerBackgroundIsActive,
          backgroundContainerVisable: true,
          backGroundIsSet: true,
        },
        () => {
          this.setState({
            backgroundOuter: null,
          });
        }
      );
    }
  };

  clearBackground = () => {
    if (this.state.isTouch) {
      this.setState(
        {
          backgroundInner: null,
          backgroundOuter: null,
        },
        () => {
          this.setState({
            backGroundIsSet: false,
            backgroundContainerVisable: false,
            outerBackgroundIsActive: !this.state.outerBackgroundIsActive,
          });
        }
      );
    } else {
      this.setState({
        backgroundContainerVisable: false,
        outerBackgroundIsActive: !this.state.outerBackgroundIsActive,
        backGroundIsSet: false,
      });
    }
  };
  render = () => {
    const {
      backgroundOuter,
      backgroundInner,
      backgroundContainerVisable,
      outerBackgroundIsActive,
      backGroundIsSet,
    } = this.state;

    return (
      <BrowserRouter>
        <span>
          <span opposite when={backgroundContainerVisable} className={backgroundContainerVisable? 'fadeIn':'fadeOut'}>
            <span className={`background_container`} id={'background_container'}>
              <span opposite when={!outerBackgroundIsActive} className={!outerBackgroundIsActive? 'fadeIn':'fadeOut'}>
                <div
                  id="background_outer"
                  style={{ backgroundImage: `url(${backgroundOuter})` }}
                />
              </span>
              <span opposite when={outerBackgroundIsActive} className={outerBackgroundIsActive? 'fadeIn':'fadeOut'}>
                <div
                  id="background_inner"
                  style={{ backgroundImage: `url(${backgroundInner})` }}
                />
              </span>
            </span>
          </span>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  backgroundHandler={this.handleBackgroundRender.bind(this)}
                  onClearBackground={this.clearBackground.bind(this)}
                  projects={projectJSON.projects}
                  {...props}
                />
              )}
            />
            <Route
              path="/projects/:id"
              render={props => (
                <Project
                  backgroundHandler={this.handleBackgroundRender.bind(this)}
                  backGroundIsSet={backGroundIsSet}
                  onClearBackground={this.clearBackground.bind(this)}
                  timestamp={new Date().toString()}
                  location={props.location}
                  project={projectJSON.projects[props.match.params.id]}
                  numberOfProjects={projectJSON.projects.length}
                  {...props}
                />
              )}
            />
            <Route path="/about" component={withRouter(About)} />
            <Route
              render={props => (
                <Home
                  backgroundHandler={this.handleBackgroundRender.bind(this)}
                  onClearBackground={this.clearBackground.bind(this)}
                  {...props}
                />
              )}
            />
          </Switch>
        </span>
      </BrowserRouter>
    );
  };
}

export default App;
