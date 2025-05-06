// scripts/cleanPlayerStats.cjs
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function removeStatsFields() {
  const snapshot = await db.collection('players').get();
  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.update(doc.ref, {
      attack: FieldValue.delete(),
      blocks: FieldValue.delete(),
      service: FieldValue.delete()
    });
  });

  await batch.commit();
  console.log('✔️ Campos eliminados exitosamente');
}

removeStatsFields().catch(console.error);
