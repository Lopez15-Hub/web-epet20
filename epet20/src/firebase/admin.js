
var admin = require("firebase-admin");

var serviceAccount = require("./firebase-keys.json");
try {

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),

    });
} catch (e) {
    console.log(e);
}
export const firebaseAuthAdmin = admin.auth();
export const firestoreAdmin = admin.firestore();