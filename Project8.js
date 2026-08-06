let allPasswordList = [];

let addPasswordBtn = document.getElementById('addPasswordBtn');

addPasswordBtn.addEventListener("click" , (e) => {

    e.preventDefault();
    validate();

})

function validate() {

    let website = document.getElementById('website').value.trim();

    if (website === "") {
        alert("---> Enter the website first.");
        return
    }

    if (website.includes(" ")) {
        alert("---> Website cannot contain white spaces.");
        return
    }

    if (website.length <= 3) {
        alert("---> Website name is too short.");
        return
    }

    let username = document.getElementById('username').value.trim();

    if (username === "") {
        alert("---> Username / Email cannot be empty.");
        return
    }

    if (username.includes(" ")) {
        alert("---> Username / Email cannot contain any white space.");
        return
    }

    if (username.length <= 3) {
        alert("---> Username / Email is too short.");
        return
    }

    if (username.includes("@")) {
        if (!username.includes(".")) {
            alert("---> Email must contain '@' and '.' ");
            return
        }
    }

    let password = document.getElementById('password').value.trim();

    if (password === "") {
        alert("---> Password cannot be empty.");
        return
    }

    if (password.includes(" ")) {
        alert("---> Password cannot contain white spaces.");
        return
    }

    if (password.length <= 6) {
        alert("---> Password must be of more than 6 characters.");
        return
    }

    let strengthOfPassword = null;

    let isAnyNumber = false;
    let numberCount = 0;

    for (let charc of password) {

        let numericalCharc = Number(charc);

        if (!Number.isNaN(numericalCharc)) {

            isAnyNumber = true;
            numberCount++

        }

    }

    if (password.length >= 12 && isAnyNumber && numberCount >= 3) {
        strengthOfPassword = "Strong";
    }

    else if (password.length >= 8 && isAnyNumber) {
        strengthOfPassword = "Medium";
    }

    else {
        strengthOfPassword = "Weak";
    }

    let isHidden = true;

    allPasswordList.push({
        website,
        username,
        password,
        strengthOfPassword,
        isHidden
    })

    searchPassword();
    resetAllInput();

}

function resetAllInput() {

    document.getElementById('website').value = "";
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";

}

function displayEachPassword(index) {

    let singlePassword = allPasswordList[index];

    let newPassword = document.createElement('p');

    let passwordList = document.getElementById('passwordList');

    let isVisible = singlePassword.isHidden ? "Yes" : "No";

    newPassword.innerHTML = `
    
    Website : ${singlePassword.website}
    
    <br><br>
    
    Username / Email : ${singlePassword.username}
    
    <br><br>
    
    Password : ${singlePassword.isHidden
        ? "*".repeat(singlePassword.password.length)
        : singlePassword.password
    }
    
    <br><br>
    
    Strength of Password : ${singlePassword.strengthOfPassword}
    
    <br><br>
    
    Hidden : ${isVisible}

    <br><br>

    ${singlePassword.isHidden
        ? `<button onclick = "showPassword(${index})">Show the Password</button>`
        : `<button onclick = "hidePassword(${index})">Hide the Password</button>`
    }

    <br><br>

    <button onclick = "deletePassword(${index})">Delete</button>
    
    <hr>
    `;

    passwordList.appendChild(newPassword);
}

function showPassword(index) {

    let singlePassword = allPasswordList[index];

    singlePassword.isHidden = false;
    searchPassword();

}

function hidePassword(index) {

    allPasswordList[index].isHidden = true;
    searchPassword();

}

function deletePassword(index) {

    allPasswordList.splice(index , 1);
    searchPassword();
    
}

function searchPassword() {

    document.getElementById('passwordList').innerHTML = "";

    let searchWebsite = document.getElementById('searchWebsite').value.toLowerCase().trim();

    for (let i = 0 ; i < allPasswordList.length ; i++) {

        let singlePassword = allPasswordList[i];

        if (searchWebsite === "") {
            displayEachPassword(i);
        }

        else if (singlePassword.website.toLowerCase().includes(searchWebsite)) {
            displayEachPassword(i);
        }
    }

    statistics();
}

document.getElementById('searchWebsite').addEventListener("keyup" , () => {
    searchPassword();
})

function statistics() {

    let totalPasswords = document.getElementById('totalPasswords');
    let strongPasswords = document.getElementById('strongPasswords');
    let mediumPasswords = document.getElementById('mediumPasswords');
    let weakPasswords = document.getElementById('weakPasswords');

    let strongCount = 0;
    let mediumCount = 0;
    let weakCount = 0;

    totalPasswords.innerText = allPasswordList.length;

    for (let pass of allPasswordList) {

        if (pass.strengthOfPassword === "Strong") {
            strongCount++;
        }

        else if (pass.strengthOfPassword === "Medium") {
            mediumCount++;
        }
        
        else {
            weakCount++;
        }
    }

    strongPasswords.innerText = strongCount;
    mediumPasswords.innerText = mediumCount;
    weakPasswords.innerText = weakCount;

}