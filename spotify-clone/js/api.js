import { renderSearchMusic, renderSongs } from "./ui.js";
//* Inputa girilen veriye göre aratacağımız api'nin keyi.
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c0f6459d13mshcb2e3fd751905cfp150deejsn90c1210a75e4",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
//* Popüler müzikleri getireceğimiz api key.
const optionsTop = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c0f6459d13mshcb2e3fd751905cfp150deejsn90c1210a75e4",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  constructor() {
    this.songs = [];
  }

  //* Inputa girilen veriye göre api'den cevabı getirir.
  async searchMusic(query) {
    try {
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${query}=&locale=tr-TR&limit=5`,
        options
      );
      const data = await res.json();
      let newData = data.tracks.hits;
      newData = newData.map((song) => ({ ...song.track }));
      this.songs = newData;
      //* Ekrana apiden gelen herbir şarkıyı yazdıracağımız method
      renderSearchMusic(this.songs);
    } catch (err) {
      console.log(err);
    }
  }

  async topPopular() {
    const url =
      "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
    try {
      //* api'ye fetch isteği at
      const response = await fetch(url, optionsTop);
      //* veriyi json formatına çevir
      const result = await response.json();
      //* tanımladığımız song dizisine gelen cevabı aktar
      this.songs = result.tracks;
      renderSongs(this.songs);
    } catch (error) {
      console.log(error);
    }
  }
}
