import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

    const photographers = document.querySelector('input[name="photographers"]:checked')?.value;
    const caterings = document.querySelector('input[name="caterings"]:checked')?.value;
    const entertainers = document.querySelector('input[name="entertainers"]:checked')?.value;

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
        status: "incomplete",
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

async function fetchBookings() {
  const bookingsCollection = collection(db, "weddingBookings");
  const querySnapshot = await getDocs(bookingsCollection);

  let bookingTableBody = document.getElementById("bookingTableBody");

  if (!bookingTableBody) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    headerRow.appendChild(nameHeader);
    const referenceHeader = document.createElement("th");
    referenceHeader.textContent = "Reference";
    headerRow.appendChild(referenceHeader);
    const statusHeader = document.createElement("th");
    statusHeader.textContent = "Status";
    headerRow.appendChild(statusHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);

    bookingTableBody = tbody;
  }

  bookingTableBody.innerHTML = ''; 

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = `${data.groomFname} ${data.groomLname} & ${data.brideFname} ${data.brideLname}`;
    row.appendChild(nameCell);

    const referenceCell = document.createElement("td");
    referenceCell.textContent = doc.id;
    row.appendChild(referenceCell);

    const statusCell = document.createElement("td");
    const status = data.status === "complete" ? "✔" : "X";
    statusCell.classList.add(status === "✔" ? "complete" : "incomplete");
    statusCell.textContent = status;
    row.appendChild(statusCell);

    bookingTableBody.appendChild(row);
  });
}
window.onload = fetchBookings;