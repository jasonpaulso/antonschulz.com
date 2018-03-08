import React, { Component } from 'react';
import './App.css';
import ProjectForm from './components/form';
import About from './components/about';
import Home from './components/home';
import Project from './components/single_project';
import Fade from 'react-reveal/Fade';

import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      outerBackgroundIsActive: true,
      backgroundOuter: null,
      backgroundInner: null,
      backgroundContainerVisable: true,
      backGroundIsSet: false,
    };
  }

  handleBackgroundRender(image) {
    if (this.state.outerBackgroundIsActive) {
      this.setState(
        {
          backgroundOuter: image,
          outerBackgroundIsActive: !this.state.outerBackgroundIsActive,
          backgroundContainerVisable: true,
          backGroundIsSet: true,
        },
        () => {
          this.setState(
            {
              backgroundInner: null,
            },
            () => window.scrollTo(0, 0)
          );
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
          this.setState(
            {
              backgroundOuter: null,
            },
            () => window.scrollTo(0, 0)
          );
        }
      );
    }
  }

  clearBackground() {
    this.setState(
      {
        backgroundContainerVisable: false,
        outerBackgroundIsActive: !this.state.outerBackgroundIsActive,
        backGroundIsSet: false,
      },
      () => {}
    );
  }
  render() {
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
          <Fade opposite when={backgroundContainerVisable}>
            <span className={`background_container`}>
              <Fade opposite when={!outerBackgroundIsActive}>
                <div
                  id="background_outer"
                  style={{ backgroundImage: `url(${backgroundOuter})` }}
                />
              </Fade>
              <Fade opposite when={outerBackgroundIsActive}>
                <div
                  id="background_inner"
                  style={{ backgroundImage: `url(${backgroundInner})` }}
                />
              </Fade>
            </span>
          </Fade>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  backgroundHandler={this.handleBackgroundRender.bind(this)}
                  onClearBackground={this.clearBackground.bind(this)}
                  {...props}
                />
              )}
            />
            <Route path="/projects/add" component={withRouter(ProjectForm)} />
            <Route
              path="/projects/:id"
              render={props => (
                <Project
                  backgroundHandler={this.handleBackgroundRender.bind(this)}
                  backGroundIsSet={backGroundIsSet}
                  onClearBackground={this.clearBackground.bind(this)}
                  {...props}
                />
              )}
            />
            <Route path="/about" component={withRouter(About)} />
            <Route 
              path='*'
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
  }
}

export default App;
