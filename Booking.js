import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsMj6w3dA02DfWpARzznHYFE0UW9hvR-g",
  authDomain: "myproject-1af12.firebaseapp.com",
  projectId: "myproject-1af12",
  storageBucket: "myproject-1af12.firebasestorage.app",
  messagingSenderId: "281695354421",
  appId: "1:281695354421:web:dad453bdf8f0650901bb7c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const weddingForm = document.getElementById("weddingForm");

if (weddingForm) {
  weddingForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const groomFname = document.getElementById("groomFname").value;
    const groomLname = document.getElementById("groomLname").value;
    const brideFname = document.getElementById("brideFname").value;
    const brideLname = document.getElementById("brideLname").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const date = document.getElementById("date").value;
    const venue = document.getElementById("venue").value;
    const pax = document.getElementById("pax").value;
    const location = document.getElementById("location").value;

    const photographersRadio = document.querySelector('input[name="photographers"]:checked')?.value;
    const photographersSelect = document.getElementById("photographersSelect").value;
    const photographers = (photographersRadio === "yes" && photographersSelect !== "Select") ? photographersSelect : "N/A";

    const cateringsRadio = document.querySelector('input[name="caterings"]:checked')?.value;
    const cateringsSelect = document.getElementById("cateringsSelect").value;
    const caterings = (cateringsRadio === "yes" && cateringsSelect !== "Select") ? cateringsSelect : "N/A";

    const entertainersRadio = document.querySelector('input[name="entertainers"]:checked')?.value;
    const entertainersSelect = document.getElementById("entertainersSelect").value;
    const entertainers = (entertainersRadio === "yes" && entertainersSelect !== "Select") ? entertainersSelect : "N/A";

    try {
      await addDoc(collection(db, "weddingBookings"), {
        groomFname,
        groomLname,
        brideFname,
        brideLname,
        email,
        contact,
        date,
        venue,
        pax,
        location,
        photographers,
        caterings,
        entertainers,
        status: "Not Ready",
        createdAt: new Date()
      });

      alert("Booking successfully submitted!");
      weddingForm.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting the form. Please try again.");
    }
  });
}