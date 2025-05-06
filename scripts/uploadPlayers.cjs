const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');
const players = require('./players.cjs');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function uploadPlayers() {
  const batch = db.batch();
  const collectionRef = db.collection('players');

  players.forEach((player) => {
    const docRef = collectionRef.doc(); // autogenera ID
    batch.set(docRef, {
      name: player.name,
      team: player.team,
      type: player.type,
      leader: !!player.leader, // true o false
    });
  });

  await batch.commit();
  console.log('✔ Jugadores subidos a Firebase');
}

uploadPlayers().catch(console.error);
