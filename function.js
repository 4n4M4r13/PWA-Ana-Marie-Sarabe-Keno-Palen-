const db = firebase.firestore();
const listRef = db.collection("loan-list");
const loadList = () => {
   var listContainer = document.querySelector("#list-container");
   listRef.onSnapshot((querySnapshot) => {
       listContainer.innerHTML = "";
       let noteExists = false;

       querySnapshot.forEach((doc) => {
            const loan = doc.data();
            var newRow = document.createElement("tr");

            var dateCell = document.createElement("td");
            dateCell.textContent = loan.date;
            var nameCell = document.createElement("td");
            nameCell.textContent = loan.name;
            var addressCell = document.createElement("td");
            addressCell.textContent = loan.address;
            var contactCell = document.createElement("td");
            contactCell.textContent = loan.contact;  
            var amountCell = document.createElement("td");
            amountCell.textContent = loan.amount;
              
              // Append cells to the row
            newRow.appendChild(dateCell);
            newRow.appendChild(nameCell);
            newRow.appendChild(addressCell);
            newRow.appendChild(contactCell);
            newRow.appendChild(amountCell);
            listContainer.appendChild(newRow);
            noteExists = true;
       });

       if (!noteExists) {
           listContainer.innerHTML = `<div>No loan available</div>`;
       }
   });
};
loadList()
document.getElementById("loanBtn").addEventListener("click", () => {
   var nameField = document.getElementById("name");
   var addressField = document.getElementById("address");
   var contactField = document.getElementById("contact");
   var amountField = document.getElementById("amount");

   var name = nameField.value;
   var address = addressField.value;
   var contact = contactField.value;
   var amount = amountField.value;

   if (name.trim() !== "" && address.trim() !== "" && contact.trim() !== "" && amount.trim() !== "") {
       const data = {
           date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
           name: name,
           address: address,
           contact: contact,
           amount: amount
       };
       
       
       if (typeof listRef !== 'undefined' && listRef.add) {
           listRef.add(data)
               .then((docRef) => {
                   console.log("Loan added successfully with ID:", docRef.id);
                   nameField.value = "";  
                   addressField.value = "";
                   contactField.value = "";
                   amountField.value = "";
               })
               .catch((error) => {
                   console.error("Error adding loan:", error);
                   alert("Error adding loan. Please try again.");
               });
       } else {
           console.error("listRef is not defined or does not have an add method");
           alert("Configuration error. Please contact support.");
       }
       alert("Loan added successfully!"); 
       var addLoanerModal = document.getElementById("addLoanerModal");
       const modalInstance = bootstrap.Modal.getInstance(addLoanerModal);
       modalInstance.hide();
   } else {
       alert("Fields cannot be empty"); 
   }
});

    