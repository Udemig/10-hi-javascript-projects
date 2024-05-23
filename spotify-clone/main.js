import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();
//* Form gönderildiği anda api'ye istek at ve gelen cevabı ekrana yazdır.
elements.form.addEventListener("submit", (e) => {
  e.preventDefault(); //* Form gönderildiği anda sayfanın yenilenmesini engeller.
  const query = e.target[0].value; //* Inputun içerisindeki değere ulaştık.
  //* Inputa girilen değer boş ise fonksiyonu burda durdur.
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz!");
    return;
  }

  updateTitle(`${query} İçin Sonuçlar`);
  api.searchMusic(query);
});
//* Sayfa yüklendiği anda api'ye istek atıp popüler müzikleri getir.
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  //* müziğin urlini htmle aktarma
  elements.audioSource.src = url;
  //* audio elementinin müziği yüklenmesini sağladık
  elements.audio.load();
  //* audio elementinin müziği oynatmasını sağlar
  elements.audio.play();
};

//* Liste de tıklmalarda çalışır
const handleClick = (e) => {
  console.log("tıklanıldı");
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); // parentElement yerine kullanırız en yakın ebeveyne götürür
    renderPlayingInfo(parent.dataset);
    console.log(parent.dataset);
    //* Müziği çalar
    playMusic(parent.dataset.url);
  }
};
//* Liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick);

// fotoğrafı dönderir
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};
// img etiketine ekledğimiz animate classını kaldırır
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
//* Müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
