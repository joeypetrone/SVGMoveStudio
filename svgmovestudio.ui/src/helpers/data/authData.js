import firebase from 'firebase';
import axios from 'axios';
import {baseUrl} from '../constants.json';

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
// Firebase ID tokens expire after an hour. Ask Firebase for the current one on
// every request (it refreshes it when needed) and fall back to the stored copy.
axios.interceptors.request.use(async function (request) {
  const currentUser = firebase.auth().currentUser;
  let token = sessionStorage.getItem('token');

  if (currentUser) {
    try {
      token = await currentUser.getIdToken();
      sessionStorage.setItem('token', token);
    } catch (e) {
      // keep the stored token; the API will answer 401 if it's no longer valid
    }
  }

  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

const registerUser = (user) => {
  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(cred => {
    //get email from firebase
    let userInfo = {
      UserName: user.username,
      Email: cred.user.email
    };

    //get token from firebase (returned so callers wait for it and see any failure)
    return cred.user.getIdToken()
      //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token))
      //save the user to the the api
      .then(() => axios.post(`${baseUrl}/users`,userInfo));
  });
};

const signInUser = (user) => {
  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
    //get token from firebase (returned so callers wait for it and see any failure)
    return cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token));
  });
};

const signOutUser = () => {
  sessionStorage.removeItem('token');
  return firebase.auth().signOut();
};

const sendPasswordReset = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {getUid, signInUser, signOutUser, registerUser, sendPasswordReset};
