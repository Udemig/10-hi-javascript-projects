import {
  calculateCartTotal,
  getCartFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getCartFromLocalStorage();
//* Sepete ürün ekleyecek fonksiyondur.
export function addToCart(event, products) {
  //* Tıkladığımız ürünün idsine eriştik ve idsini number tipine çevirdik.
  const productID = parseInt(event.target.dataset.id);
  //* products dizisi içerisinden idsine ulaştığımız ürünü bulabilmek için find metodunu kullandık.
  const product = products.find((product) => product.id === productID);
  //* Ürünü bulursak bu if çalışacak.
  if (product) {
    //* Sepette önceden eklediğimiz ürünü bulduk.
    const exitingItem = cart.find((item) => item.id === productID);
    //* Sepette bu üründen daha önce varsa if çalışacak.
    if (exitingItem) {
      //* Miktarını bir arttırır
      exitingItem.quantity++;
    } else {
      //* Sepette bu üründen daha önce yoksa sepete yeni bir ürün ekleyeceğiz.
      //* Sepet dizisine ekleyeceğimiz ürünün miktar özelliğini ekledik.
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem); //* cart dizisine yeni oluşturduğumuz objeyi gönderdik
      event.target.textContent = "Added"; //* Ekleme butonunun içeriğini değiştirdik.
      updateCartIcon(cart);
      saveToLocalStorage(cart);
      renderCartItems();
      displayCartTotal();
    }
  }
}
//* Sepetten ürün siler.
function removeFromCart(event) {
  //* Sileceğimiz elemanın idsine eriştik
  const productID = parseInt(event.target.dataset.id);
  //* Tıkladığım elemanı sepetten kaldır.
  cart = cart.filter((item) => item.id !== productID);
  //* localStorageı güncelle
  saveToLocalStorage(cart);
  //* Sayfayı güncelle
  renderCartItems();
  displayCartTotal();
  updateCartIcon(cart);
}

function changeQuantity(event) {
  //* inputun içerisindeki değeri aldık
  const quantity = parseInt(event.target.value);
  //* değişim olan ürünün idsine eriştik
  const productID = parseInt(event.target.dataset.id);

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage(cart);
      displayCartTotal();
      updateCartIcon(cart);
    }
  }
}

//* Sepetteki ürünleri ekrana renderlar
export function renderCartItems() {
  //* idsine göre HTML etiketini aldık
  const cartItemsElement = document.getElementById("cartItems");
  //* Sepetteki herbir ürün için ekrana bir tane cart-item bileşeni aktardık.
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
        <img
          src="${item.image}"
          alt=""
        />
        <div class="cart-item-info">
          <h2 class="cart-item-title">${item.title}</h2>
          <input
            type="number"
            min="1"
            value="${item.quantity}"
            class="cart-item-quantity"
            data-id="${item.id}"
          />
        </div>
        <h2>$${item.price}</h2>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
    </div>
  
  `
    )
    .join("");

  //* Tüm silme butonlarını aldık.
  const removeButtons = document.getElementsByClassName("remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    //* index numarasına göre bütün silme butonlarını seçtik
    const removeButton = removeButtons[i];
    //* herbir buton için bir olay izleyicisi ekle ve bir fonksiyon çalıştır
    removeButton.addEventListener("click", removeFromCart);
  }

  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  console.log(quantityInputs);
  for (let i = 1; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    console.log(quantityInput);

    quantityInput.addEventListener("change", changeQuantity);
  }

  updateCartIcon(cart);
}

export function displayCartTotal() {
  const cartTotalElement = document.getElementById("cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}
