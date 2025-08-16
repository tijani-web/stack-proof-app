const admin = require("firebase-admin");

const serviceAccount = require("C:/Users/HP/Desktop/Fire Base Key/stackproof key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
async function addUsernamesToExisting() {
  const usersSnap = await db.collection("users").get();

  for (const userDoc of usersSnap.docs) {
    const userId = userDoc.id;

    let displayName = null;
    try {
      const userRecord = await admin.auth().getUser(userId);
      displayName = userRecord.displayName;
    } catch (err) {
    }

    const username = displayName || `Player-${userId.slice(0, 5)}`;

    const dataRef = db
      .collection("users")
      .doc(userId)
      .collection("profile")
      .doc("data");

    await dataRef.set({ username }, { merge: true });

  }

  console.log("Migration complete");
}

