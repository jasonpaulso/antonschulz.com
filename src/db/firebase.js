import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCnCcWTUimnmMed7rjDKQRMqWIW7xeGDhw",
    authDomain: "anton-schulz.firebaseapp.com",
    databaseURL: "https://anton-schulz.firebaseio.com",
    projectId: "anton-schulz",
    storageBucket: "anton-schulz.appspot.com",
    messagingSenderId: "1048580699766"
  };

  firebase.initializeApp(config);

export default firebase