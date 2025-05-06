// scripts/uploadMatches.cjs

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');
const matches = require('./matches.cjs');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

(async () => {
  const batch = db.batch();
  const matchesRef = db.collection('matches');

  matches.forEach((match, index) => {
    const docRef = matchesRef.doc(`match${index + 1}`);
    batch.set(docRef, match);
  });

  await batch.commit();
  console.log('✅ Matches uploaded to Firestore');
})();
