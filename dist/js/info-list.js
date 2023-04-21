import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth, db } from "./main.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

//variables
const submitJoinBtn = document.getElementById("submit-join");
const createNameInput = document.getElementById("name-joiner");

//   let nameTa = createNameInput.value;
//   if (nameTa && nameTa.length > 0) {
//     set(ref(db, `membersclub/${user.uid}/infoListMember`), {
//       name: nameTa,
//     }); 
//   }

//auth state
onAuthStateChanged(auth, (user) => {
  const submitJoin = async () => {
    let refCurrentUser = collection( db, `membersclub/${user.uid}/infoListMember`);
    const docRef = await addDoc(refCurrentUser, {
      name: createNameInput.value,
    })
      .then(() => {
        alert("merge....");
      })
      .catch((error) => {
        alert("nu merge..." + error);
      });
  };
  submitJoinBtn.onclick = submitJoin;
});
