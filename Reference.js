import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsMj6w3dA02DfWpARzznHYFE0UW9hvR-g",
  authDomain: "myproject-1af12.firebaseapp.com",
  projectId: "myproject-1af12",
  storageBucket: "myproject-1af12.appspot.com",
  messagingSenderId: "281695354421",
  appId: "1:281695354421:web:dad453bdf8f0650901bb7c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const refId = sessionStorage.getItem("referenceId");
const display = document.getElementById("bookingDetails");
const cancelBtn = document.getElementById("cancelBtn");

async function loadBooking() {
  if (!refId) {
    display.innerHTML = "<p>No booking reference found.</p>";
    return;
  }

  try {
    const docRef = doc(db, "weddingBookings", refId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      display.innerHTML = "<p>Booking not found.</p>";
      return;
    }

    const data = docSnap.data();

    display.innerHTML = `
      <p><strong>Reference ID:</strong> ${refId}</p>
      <p><strong>Groom:</strong> ${data.groomFname} ${data.groomLname}</p>
      <p><strong>Bride:</strong> ${data.brideFname} ${data.brideLname}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact:</strong> ${data.contact}</p>
      <p><strong>Wedding Date:</strong> ${data.date}</p>
      <p><strong>Venue:</strong> ${data.venue}</p>
      <p><strong>Guests:</strong> ${data.pax}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Photographer:</strong> ${data.photographers}</p>
      <p><strong>Catering:</strong> ${data.caterings}</p>
      <p><strong>Entertainment:</strong> ${data.entertainers}</p>
      <p><strong>Status:</strong> ${data.status}</p>
    `;

    if (data.status === "Not Ready") {
      cancelBtn.style.display = "inline-block";
      cancelBtn.onclick = async () => {
        const confirmed = confirm("Are you sure you want to cancel this booking?");
        if (confirmed) {
          await deleteDoc(docRef);
          alert("Booking has been cancelled.");
          window.location.href = "Dashboard.html";
        }
      };
    } else {
      cancelBtn.style.display = "none";
      const msg = document.createElement("p");
      msg.style.color = "red";
      msg.textContent = "This booking is marked as 'Ready' and cannot be cancelled.";
      display.appendChild(msg);
    }

  } catch (error) {
    console.error("Error fetching booking:", error);
    display.innerHTML = "<p>Error loading booking. Try again later.</p>";
  }
}

loadBooking();