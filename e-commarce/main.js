import { element } from "./js/helpers.js";
import { renderProducts } from "./js/ui.js";

let products = [];
console.log(element.productList);

let menu = document.querySelector(".navbar");
let menuIcon = document.querySelector("#menu-icon");
//* Menu iconuna tıklanıldığında "open-menu" classını ekle çıkar
menuIcon.addEventListener("click", () => menu.classList.toggle("open-menu"));

async function fetchProducts() {
  try {
    //* db.json dosyasına fetch ile istek attık.
    const response = await fetch("db.json");
    console.log(response);
    //* Gelen cevabı json formatına çevirdik ve producst değişkenine atadık
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Ürünler yüklenirken hata oluştu!", error);
  }
}
fetchProducts();
