import { ProductDetails } from "./ProductDetails.js";
import { AddToCart } from "./AddToCart.js";
import fetchJson from "./fetch_module.js";
import {Cart} from "./cart.js"

var wantedProducts = []; //array that matched products stored in to be displayed
var filteredProducts = { category: 0, price: 0, rating: 0 }; //cheked filter features

document.querySelector("#filter").addEventListener("click", function () {
  document.querySelector(".filter-btns").classList.toggle("control-btns");
});

function appendCards(products) {
  var productsContainer = document.querySelector(".product");
  for (let i = 0; i < products.length; i++) {
    var item = document.createElement("div");
    productsContainer.appendChild(item);
    item.classList.add("col-12", "col-md-6", "col-lg-3", "item", "my-2");

    var card = document.createElement("div");
    item.appendChild(card);
    card.classList.add("card", "box-shadow", "my-5", "px-5", "py-2");
    
    var image = document.createElement("img");
    card.appendChild(image);
    image.classList.add("card-img-top");
    image.src = products[i].images[0];

    var cardBody = document.createElement("div");
    card.appendChild(cardBody);
    cardBody.classList.add("card-body");
    cardBody.classList.add("card-body");

    var title = document.createElement("div");
    cardBody.appendChild(title);
    title.classList.add(
      "card-title",
      "d-flex",
      "justify-content-evenly",
      "flex-column"
    );

    var productName = document.createElement("span");
    title.appendChild(productName);
    productName.classList.add("pname");
    productName.textContent = products[i].title;
    productName.style.fontSize = "1rem";
    productName.style.fontWeight = "900";

    var productPrice = document.createElement("span");
    title.appendChild(productPrice);
    productPrice.classList.add("card-text", "price");
    productPrice.textContent = products[i].price + "$";
    productPrice.style.fontSize = "1rem";
    productPrice.style.fontWeight = "700";

    var ratings = document.createElement("span");
    cardBody.appendChild(ratings);
    ratings.classList.add("rates");

    for (let j = 0; j < 5; j++) {
      var star = document.createElement("i");
      ratings.appendChild(star);
      star.classList.add("bi", "bi-star-fill");
      star.classList.add(`rate${i}`);
    }

    if (products[i].rating >= 4.5) {
      for (let x = 0; x < 5; x++) {
        document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
      }
    } else if (products[i].rating >= 3.5 && products[i].rating < 4.5) {
      for (let x = 0; x < 4; x++) {
        document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
      }
    } else if (products[i].rating < 3.5 && products[i].rating >= 2.5) {
      for (let x = 0; x < 3; x++) {
        document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
      }
    } else if (
      products[i].rating < 3.5 &&
      Math.roundproducts[i].rating >= 2.5
    ) {
      for (let x = 0; x < 2; x++) {
        document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
      }
    } else {
      document.getElementsByClassName(`rate${i}`)[0].style.color = "gold";
    }

    var productPrand = document.createElement("p");
    cardBody.appendChild(productPrand);
    productPrand.classList.add("card-text", "prand");
    productPrand.textContent = products[i].brand;
    productPrand.style.fontSize = "0.8rem";
    productPrand.style.fontWeight = "700";

    var cartButton = document.createElement("button");
    cartButton.classList.add("cartBtn");
    cardBody.appendChild(cartButton);

    var cart = document.createElement("i");
    cartButton.appendChild(cart);
    cart.classList.add("bi", "bi-cart-plus", "d-block", "w-100", "cart");
  }
}

function intializeData(allData) {
  var allCategories = allData.map(({ category }) => category);
  var Prices = allData.map(({ price }) => price);
  var allPrices = [];
  for (let j = 0; j < Prices.length; j++) {
    if (Prices[j] <= 300) {
      allPrices.push("low");
    } else if (Prices[j] > 300 && Prices[j] < 900) {
      allPrices.push("medium");
    } else {
      allPrices.push("high");
    }
  }
  var allRatings = allData.map(({ rating }) => rating);
  filteredProducts = {
    category: allCategories,
    price: allPrices,
    rating: allRatings,
  };
  return filteredProducts;
}

function resetPage() {
  wantedProducts = [];
  while (document.querySelector(".product").hasChildNodes()) {
    document
      .querySelector(".product")
      .removeChild(document.querySelector(".product").firstChild);
  }
}

function filterProducts(allData, wantedData) {
  var allProducts = intializeData(allData);
  let flag = 0;
  for (let i = 0; i < allData.length; i++) {
    if (
      wantedData["category"] != 0 &&
      wantedData["rating"] != 0 &&
      wantedData["price"] != 0
    ) {
      if (
        allProducts["category"][i] == wantedData["category"] &&
        Math.round(allProducts["rating"][i]) == wantedData["rating"] &&
        allProducts["price"][i] == wantedData["price"]
      ) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else if (
      wantedData["category"] == 0 &&
      wantedData["rating"] != 0 &&
      wantedData["price"] != 0
    ) {
      if (
        Math.round(allProducts["rating"][i]) == wantedData["rating"] &&
        allProducts["price"][i] == wantedData["price"]
      ) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else if (
      wantedData["category"] != 0 &&
      wantedData["rating"] == 0 &&
      wantedData["price"] != 0
    ) {
      if (
        allProducts["category"][i] == wantedData["category"] &&
        allProducts["price"][i] == wantedData["price"]
      ) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else if (
      wantedData["category"] != 0 &&
      wantedData["rating"] != 0 &&
      wantedData["price"] == 0
    ) {
      if (
        allProducts["category"][i] == wantedData["category"] &&
        Math.round(allProducts["rating"][i]) == wantedData["rating"]
      ) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else if (
      wantedData["category"] != 0 &&
      wantedData["rating"] == 0 &&
      wantedData["price"] == 0
    ) {
      if (allProducts["category"][i] == wantedData["category"]) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else if (
      wantedData["category"] == 0 &&
      wantedData["rating"] != 0 &&
      wantedData["price"] == 0
    ) {
      if (Math.round(allProducts["rating"][i]) == wantedData["rating"]) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else if (
      wantedData["category"] == 0 &&
      wantedData["rating"] == 0 &&
      wantedData["price"] != 0
    ) {
      if (allProducts["price"][i] == wantedData["price"]) {
        wantedProducts.push(allData[i]);
        flag = 1;
      }
    } else {
      wantedProducts.push(allData[i]);
      flag = 1;
    }
  }
  filteredProducts = { category: 0, price: 0, rating: 0 };
  if (flag == 0) {
    //no products found
    var notFoundMsg = document.createElement("p");
    document.querySelector(".product").appendChild(notFoundMsg);
    notFoundMsg.id = "notFound";
    notFoundMsg.textContent = "No Result Found!";
  } else {
    appendCards(wantedProducts);
  }
}

function applyFilter(products) {
  document.querySelector(".applyFilter").addEventListener("click", function () {
    var category = document.getElementsByName("flexRadioDefault1");
    var rates = document.getElementsByName("stars");
    var price = document.getElementsByName("flexRadioDefault3");
    var flag = 0;
    for (let i = 0; i < category.length && flag == 0; i++) {
      if (category[i].checked) {
        filteredProducts["category"] = category[i].value;
        flag = 1;
      }
    }
    flag = 0;
    for (let i = 0; i < rates.length && flag == 0; i++) {
      if (rates[i].checked) {
        filteredProducts["rating"] = rates[i].value;
        flag = 1;
      }
    }
    flag = 0;
    for (let i = 0; i < price.length && flag == 0; i++) {
      if (price[i].checked) {
        filteredProducts["price"] = price[i].value;
        flag = 1;
      }
    }
    resetPage();
    filterProducts(products, filteredProducts);
  });
}

function getAllProducts(products) {
  document.querySelector("#all").addEventListener("click", function (e) {
    var category = document.getElementsByName("flexRadioDefault1");
    var rates = document.getElementsByName("stars");
    var price = document.getElementsByName("flexRadioDefault3");
    for (let i = 0; i < category.length; i++) {
      category[i].checked = false;
    }
    for (let i = 0; i < rates.length; i++) {
      rates[i].checked = false;
    }
    for (let i = 0; i < price.length; i++) {
      price[i].checked = false;
    }
    resetPage();
    appendCards(products);
  });
}

function SearchForProduct(ClickedId, products) {
  if (products) {
    let clickedProduct;
    products.forEach((product) => {
      if (product.id == ClickedId) {
        clickedProduct = product;
      }
    });
    return clickedProduct;
  }
}

function cardEventListner(products) {
  let productsContainer = document.querySelector(".product");
  document.querySelector("#viewCart").addEventListener("click",() =>{
    let cart = new Cart();
  })
  if (productsContainer) {
    productsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("card-img-top")) {
        let imageSource = e.target.src.split("/");
        let ClickedId = imageSource[imageSource.length - 2];
        let clickedProduct = SearchForProduct(ClickedId, products);
        let product = new ProductDetails(clickedProduct);
      } else if (e.target.classList.contains("cart")) {
        let imageSource = e.target.closest(".card").firstChild.src.split("/");
        let ClickedId = imageSource[imageSource.length - 2];
        let clickedProduct = SearchForProduct(ClickedId, products);
        AddToCart(clickedProduct, 1);
      }
    });
  }
}

fetchJson()
  .then(function (data) {
    appendCards(data.products);
    return data.products;
  })
  .then(function (data) {
    /****************Filter Button***************** */
    applyFilter(data);
    /**********All Button******* ***************** */
    getAllProducts(data);
    /*************Products Details******************************* */
    cardEventListner(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
