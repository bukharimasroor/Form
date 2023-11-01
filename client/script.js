const dataContainer = document.getElementById("data-container");

//function to register a new user

function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;


    fetch("http://localhost:3200/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" //making content type in json format
        },
        body: JSON.stringify({
            name: name,
            email: email,
            address: address
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetchData();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

//function to fetch adn disply data 

function fetchData() {
    fetch("http://localhost:3200/users")
    .then(response => response.json())
    .then(users => {
        dataContainer.innerHTML = "";
        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.innerHTML = `<strong>Name:</strong> ${user.name}, <strong>Email: </strong> ${user.email}, <strong>Address: </strong> ${user.address}
            <button onclick="updateUser(${user.id})"> Update </button>
            <button onclick="deleteUser(${user.id})"> Delete </button>`;//puttimg data inside html
            dataContainer.appendChild(userDiv);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

//functiom to update the user

function updateUser(userId) {
    const name = prompt("enter updated name:");
    const email = prompt("enter updated email:");
    const address = prompt("enter updated address:");

    if (name && email && address) {
        fetch(`http://localhost:3200/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                address: address
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchData();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    } else {
        alert("please provide valid input for name, email, and address.");
    }
}

//fuction to delete user

function deleteUser(userId) {
    const confirmDelete = confirm("confim dlt");
    if (confirmDelete) {
        fetch(`http://localhost:3200/delete/${userId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchData();
        })
        .catch(error => {
            console.error(error);
        });
    }
}

// Fetch initial data when the page loads
fetchData();