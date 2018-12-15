import * as functions from 'firebase-functions';

import admin = require('firebase-admin');

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const updateScoreTrends = functions.https.onRequest((request, response) => {
  let scoreTrendsRef = admin.firestore().collection("score_trends");
  let userRef = admin.firestore().collection("users")
  let userScoreList = [];
  let date = new Date();
  userRef.get().then(query => {
    query.forEach(user => {
      userScoreList.push({user: user.data().userName, score: user.data().score});
    })
    
    scoreTrendsRef.add({
      timeStamp: date,
      score: userScoreList
    }).then(x => response.send("succcess"));

  })

});
