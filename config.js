// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi4jIpIDOaNdwz5NB_jFTubHvHuLN2tD8",
  authDomain: "load-e986a.firebaseapp.com",
  projectId: "load-e986a",
  storageBucket: "load-e986a.appspot.com",
  messagingSenderId: "843883482279",
  appId: "1:843883482279:web:068910ddb42609ca099f82",
  measurementId: "G-LJ9DTWSW94"
};
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.enablePersistence().catch(function (err) {
  if (err.code == "failed-precondition") {
    console.log(
      "Multiple tabs open, persistence can only be enabled in one tab at a time.",
    );
  } else if (err.code == "unimplemented") {
    console.log(
      "The current browser does not support all of the features required to enable persistence",
    );
  }
});