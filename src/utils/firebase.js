import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAE6DbY2BulgW2DApphtsjo7IaU-WqYTUc",
    authDomain: "oxford-chinese-business.firebaseapp.com",
    databaseURL: "https://oxford-chinese-business.firebaseio.com",
    projectId: "oxford-chinese-business",
    storageBucket: "oxford-chinese-business.appspot.com",
    messagingSenderId: "762425520890",
    appId: "1:762425520890:web:903d885bd15463087fcf43",
    measurementId: "G-HFYZ8LZT9Z"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()