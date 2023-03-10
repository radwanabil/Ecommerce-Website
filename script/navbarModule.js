import { Cart } from "./cart.js";
import { User } from "./user.js";

const user = document.querySelector("#user");
const cart = document.querySelector("#cart");
const userBoxName = document.querySelector(".user-content p");
const userBox = document.querySelector(".user-container");
const nav = document.querySelector("nav");
const logOut = document.querySelector("#logOut");

var userAccount = new User();
let loggedInUser = userAccount.isUserLoggedIn();
const cartNotificationBox = document.querySelector("#cartCount")
const cartNotification = document.querySelector("#cartCount #number");


///when pressed on user card checks if their is a user logged in
user.addEventListener("click", function () {
  if (loggedInUser) {
    let firstName = loggedInUser.firstName;
    let lastName = loggedInUser.lastName;
    userBoxName.innerText = `${firstName} ${lastName}`;
    if (userBox.style.display === "none") {
      userBox.style.display = "block";
    } else {
      userBox.style.display = "none";

    }
  } else {

    location.assign("./log-in.html");
  }
});

//check if thier is a user logged in when pressed on cart
cart.addEventListener("click", function () {
  if (loggedInUser) {
    let cart = new Cart();
  } else {
    location.assign("./log-in.html");
  }
});

logOut.addEventListener("click", function () {
  loggedInUser.active = false;
  userAccount.updateUser(loggedInUser);
  location.assign("./log-in.html");
});

function showNotification(){
  if (loggedInUser) {
    cartNotification.innerText = userAccount.ItemsCount();
  } else {
    cartNotificationBox.style.display = "none";
    }
}
showNotification();