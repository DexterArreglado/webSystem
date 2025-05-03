function lookupReference() {
  const refId = document.getElementById("referenceInput").value.trim();
  if (refId) {
    sessionStorage.setItem("referenceId", refId);
    window.location.href = "reference.html";
  } else {
    alert("Please enter a reference number.");
  }
}
