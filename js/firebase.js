const firebaseConfig = {
  apiKey: 'AIzaSyCm1G1gNv9vOB327pyTWTC_gLpE3HPqE98',
  authDomain: 'project-dravtovichgames.firebaseapp.com',
  projectId: 'project-dravtovichgames',
  storageBucket: 'project-dravtovichgames.appspot.com',
  messagingSenderId: '703568448143',
  appId: '1:703568448143:web:ee202cfbda2559e67f3efa',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const myAppDB = firebaseApp.database();
const auth = firebaseApp.auth();
