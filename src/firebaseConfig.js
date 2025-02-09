import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, user => {
  if (user) {
    user.getIdToken(true).then(token => {
      // Use the token securely
    });
  }
});
