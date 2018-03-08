import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import firebase from '../db/firebase';
// import filereader from 'filereader';

import { Form, Text, TextArea } from 'react-form';
import Dropzone from 'react-dropzone';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      heroImage: null,
      imageFiles: [],
      credits: [],
    };
  }

  onDropMultiple(imageFiles) {
    if (imageFiles) {
      for (var imageFileIndex in imageFiles) {
        const imageFile = imageFiles[imageFileIndex];
        this.processImage(imageFile);
      }
    }
  }

  processImage(imageFile, isHeroImage) {
    const storageRef = firebase.storage().ref();
    const reader = new FileReader();
    reader.onload = () => {
      // const fileAsBinaryString = reader.result;
      const name = +new Date() + '-' + imageFile.name;
      const metadata = { contentType: imageFile.type };
      const task = storageRef.child(name).put(imageFile, metadata);
      task.then(snapshot => {
        if (isHeroImage) {
          console.log('is hero');
          this.setState({
            heroImage: snapshot.downloadURL,
          });
        } else {
          console.log('is not hero');
          const imageUrl = { url: snapshot.downloadURL };
          this.setState({
            imageFiles: [...this.state.imageFiles, imageUrl],
          });
        }
      });
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.readAsBinaryString(imageFile);
  }

  onDrop(imageFiles) {
    this.processImage(imageFiles[0], true);
  }

  submitForm(submittedValues) {
    const credits = submittedValues.credits;
    this.setState(
      {
        name: submittedValues.projectName,
        description: submittedValues.projectDescription,
        credits: credits,
      },
      () => this.handleSubmit()
    );
  }

  handleSubmit() {
    const projectsRef = firebase.database().ref('projects');
    const { name, description, heroImage, imageFiles, credits } = this.state;
    const project = {
      name: name,
      description: description,
      heroImage: heroImage,
    };
    projectsRef.push(project).then(snap => {
      const key = snap.key;

      for (var imageUrl in imageFiles) {
        console.log(imageFiles[imageUrl]);
        firebase
          .database()
          .ref('/projects/' + key + '/images/')
          .push(imageFiles[imageUrl]);
      }

      for (var credit in credits) {
        firebase
          .database()
          .ref('/projects/' + key + '/credits/')
          .push(credits[credit]);
      }
    });
    this.setState({
      name: '',
      description: '',
      heroImage: null,
      imageFiles: [],
      credits: [],
    });
  }

  render() {
    return (
      <div>
        <DocumentTitle title={`Anton Schulz | Add Project`} />
        <section className="project_container">
          <div className="project_title_container">
            <div>
              <Form
                onSubmit={e => {
                  this.submitForm(e);
                }}
              >
                {formApi => (
                  <div>
                    <form
                      onSubmit={formApi.submitForm}
                      id="dynamic-form"
                      onChange={e => {
                        // this.submitForm(formApi.values)
                        // console.log(formApi.values)
                      }}
                    >
                      <label htmlFor="projectName">Project Name</label>
                      <Text field="projectName" id="projectName" errors={''} />

                      <br />
                      <label htmlFor="projectDescription">Description</label>
                      <TextArea
                        field="projectDescription"
                        id="projectDescription"
                      />
                      <div>
                        <label htmlFor="projectHero">
                          Project Masthead Image
                        </label>
                        <Dropzone
                          onDrop={this.onDrop.bind(this)}
                          multiple={false}
                        >
                          <span>Click here or drop your masthead image.</span>
                        </Dropzone>
                      </div>
                      <div>
                        <label htmlFor="projectImages">Project Images</label>
                        <Dropzone onDrop={this.onDropMultiple.bind(this)}>
                          <span>Click here or drop your project images.</span>
                        </Dropzone>
                      </div>
                      {formApi.values.credits &&
                        formApi.values.credits.map((credit, i) => (
                          <div key={`credit${i}`}>
                            <label htmlFor={`credit-name-${i}`}>Name</label>
                            <Text
                              field={['credits', i, 'name']}
                              id={`credit-name-${i}`}
                            />
                            <label htmlFor={`credit-title-${i}`}>Title</label>
                            <Text
                              field={['credits', i, 'title']}
                              id={`credit-title-${i}`}
                            />
                            <button
                              onClick={() => formApi.removeValue('credits', i)}
                              type="button"
                              className="mb-4 btn btn-danger"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      <button
                        onClick={() => formApi.addValue('credits', '')}
                        type="button"
                        className="mb-4 mr-4 btn btn-success"
                      >
                        Add Credit
                      </button>
                      <button type="submit" className="mb-4 btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ProjectForm;

// processImage(key, imageFiles, isHeroImage) {
//   const storageRef = firebase.storage().ref();
//   imageFiles.forEach( imageFile => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const fileAsBinaryString = reader.result;
//       const name = (+new Date()) + '-' + imageFile.name;
//       const metadata = { contentType: imageFile.type };
//       const task = storageRef.child(name).put(imageFile, metadata);
//       task.then((snapshot) => {
//         const imageWithUrl = {url: snapshot.downloadURL}
//         if (isHeroImage) {
//           firebase.database().ref('/projects/' + key).push({heroImage: snapshot.downloadURL})
//         } else {
//           firebase.database().ref('/projects/' + key + '/images/').push(imageWithUrl)
//         }

//       })
//     }
//     reader.onabort = () => console.log('file reading was aborted');
//     reader.onerror = () => console.log('file reading has failed');
//     reader.readAsBinaryString(imageFile);
//   })
// }
