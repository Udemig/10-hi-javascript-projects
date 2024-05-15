//* Tipi analiz edip ona göre fonksiyonun çağrıldığı yere
//* tipe denk gelen açıklamayı gönderir.
export const detecType = (type) => {
  switch (type) {
    case "park":
      console.log(type);
      return "Park Yeri";
    case "home":
      console.log(type);
      return "Ev";
    case "job":
      console.log(type);
      return "İş";
    case "goto":
      console.log(type);
      return "Ziyaret";
  }
};
//* Local storage ı güncelleyecek fonksiyon
export const setStorage = (data) => {
  //* Veriyi locale göndermek için stringe çevirme
  const strData = JSON.stringify(data);
  console.log(strData);
  //* localStoraga veriyi gönderdik.
  localStorage.setItem("notes", strData);
};
