var modal = document.getElementById('id01');
var pesFirstName = document.getElementById("first-name");
var pesLastName = document.getElementById("last-name");
var pesEmail = document.getElementById("email");
var pesLocation = document.getElementById("location");
var pesPhone = document.getElementById("phone");
var pesHobby = document.getElementById("hobby");

var peopleList;

if (localStorage.getItem("theProducts") == null) {
    peopleList = [];
}
else {
    peopleList = JSON.parse(localStorage.getItem("theProducts"));
    desplayProduct(peopleList);
}

function addProduct() {

    var product = {
        firstName: pesFirstName.value,
        lastName: pesLastName.value,
        Email: pesEmail.value,
        location: pesLocation.value,
        phone: pesPhone.value,
        hobby: pesHobby.value
    };
    peopleList.push(product);
    localStorage.setItem("theProducts", JSON.stringify(peopleList));
    desplayProduct(peopleList);
    rstInput();
}

// display a list of items
function desplayProduct(desplayProductsList) {
    var listItem = "";
    for (var i = 0; i < desplayProductsList.length; i++) {
        listItem += `<tr>
        <td>${i + 1}</td>
        <td>${desplayProductsList[i].firstName}</td>
        <td>${desplayProductsList[i].lastName}</td>
        <td>${desplayProductsList[i].Email}</td>
        <td>${desplayProductsList[i].location}</td>
        <td>${desplayProductsList[i].phone}</td>
        <td>${desplayProductsList[i].hobby}</td>
        <td><button onclick= "editListItem(${i})" class="btn btn-warning">Edit</button>
        <button onclick="deleteProduct(${i})" class="btn btn-danger">Del</button></td>
        </tr>`;
    }

    document.getElementById("tableBody").innerHTML = listItem;
}

// edit the list item
function editListItem(index) {
    var edLI = Object.values(peopleList[index]);
    elms = document.getElementsByClassName("inp-control");
    for (var i = 0; i < elms.length; i++) {
        elms[i].value = edLI[i];
    }
    document.getElementById('id01').style.display = 'block';
    document.getElementById("add-item-button").innerHTML="Save";
    document.getElementById("form-sec").onsubmit = function(){submitEdit(index)};
}



//overwrites the old object with the new edited one
function submitEdit(index) {
    peopleList[index].firstName = pesFirstName.value;
    peopleList[index].lastName = pesLastName.value;
    peopleList[index].Email = pesEmail.value;
    peopleList[index].location = pesLocation.value;
    peopleList[index].phone = pesPhone.value;
    peopleList[index].hobby = pesHobby.value;
    localStorage.setItem("theProducts", JSON.stringify(peopleList));
    desplayProduct(peopleList);
    rstInput();
}


//deletes the specified list item
function deleteProduct(index) {
    peopleList.splice(index, 1);
    localStorage.setItem("theProducts", JSON.stringify(peopleList));
    desplayProduct(peopleList);
}


//close the pop up modal when clicked on the background
window.onclick = function (event) {
    if (event.target == modal) {
        rstInput();
    }
}

//resets all the input fields and buttons to the original value
function rstInput() {
    elms = document.getElementsByClassName("inp-control");
    for (var i = 0; i < elms.length; i++) {
        elms[i].value = "";
    }
    document.getElementById("id01").style.display = "none";
    document.getElementById("form-sec").onsubmit = function(){ addProduct()};
    document.getElementById("add-item-button").innerHTML="Add Item";


}

//makes the input window visible
function formApear() {
    document.getElementById('id01').style.display = 'block'
}


//converting the array to csv and downloading it
function toCSV(){
    let csvFile="First Name,Last Name,Email,Locatoin,Phone Number,Hobby\n"
    peopleList.forEach(person => {//savine the fields of an object into a variable
        let row = person.firstName+","+person.lastName+","+person.Email+","+person.location+","+person.phone+","+person.hobby+"\n";
        csvFile+=row;//adding the stored variables to the csv string with the file formating
    });
    var data=new Blob([csvFile], {type:"text/csv"});//convert the csv string to a blob object of type csv
    var url=window.URL.createObjectURL(data);//setting a link for the blob/csv file

    // making a selfclicking invisible a-tag to download the file and set the defualt name of the file
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "item List";
    a.click();
    window.URL.revokeObjectURL(url);
}