/* ------------ DOM ELEMENTS ------------------- */

const cover = document.querySelector("#song-cover");
const title = document.querySelector("#song-title");
const author = document.querySelector("#song-author");
const playPause = document.querySelector("#playpause");
const forward = document.querySelector("#forward");
const backward = document.querySelector("#backward");
const repeat = document.querySelector("#repeat");
const randomIcon = document.querySelector("#random");
const currentSongTime = document.querySelector("#current-time");
const totalSongTime = document.querySelector("#total-time");
const audioTimeBar = document.querySelector("#audio-timing-bar");
const fillerTimeBar = document.querySelector("#filler-time-bar");
const increaseVolume = document.querySelector("#volume-up");
const decreaseVolume = document.querySelector("#volume-down");
const volumeBar = document.querySelector("#volume-bar");
const fillerVolumeBar = document.querySelector("#filler-volume-bar");

/* ---------------- MAIN VARIABLES ----------------- */

let i = 0;

let randomNumber;

let audio = new Audio();

let myMusic = [
  {
    path: "audio/adventures.mp3",
    cover: 'url("images/adventures-by-a-himitsu.jpg")',
    title: "Adventures",
    author: "A Himitsu",
  },
  {
    path: "audio/chill-day.mp3",
    cover: 'url("images/lakey-inspired.jpg")',
    title: "Chill Day",
    author: "Lakey Inspired",
  },
  {
    path: "audio/dreamer.mp3",
    cover: 'url("images/dreamer-hazy.jpg")',
    title: "Dreamer",
    author: "Hazy",
  },
  {
    path: "audio/helen-2.mp3",
    cover: 'url("images/helen2.jpg")',
    title: "Helen 2",
    author: "Nikos Spiliotis",
  },
  {
    path: "audio/skystrike.mp3",
    cover: 'url("images/hinkik.jpg")',
    title: "Skystrike",
    author: "Hinkik",
  },
];

let loadMusic = (index) => {
  audio.src = myMusic[index].path;
  cover.style.backgroundImage = myMusic[index].cover;
  title.textContent = myMusic[index].title;
  author.textContent = myMusic[index].author;
};

loadMusic(i);

/*-------------------- PLAY PAUSE CONTROLS ---------------- */

let playPauseSong = () => {
  playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPause.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      playPause.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
};

playPauseSong();

/* --------------- SKIP SONG --------------------- */

let nextSong = () => {
  i++;
  if (i > myMusic.length - 1) {
    i = 0;
  }
  playPause.innerHTML = '<i class="fas fa-pause"></i>';
  loadMusic(i);
  audio.play();
};

let previousSong = () => {
  i--;
  if (i < 0) {
    i = myMusic.length - 1;
  }
  playPause.innerHTML = '<i class="fas fa-pause"></i>';
  loadMusic(i);
  audio.play();
};

forward.addEventListener("click", nextSong);

backward.addEventListener("click", previousSong);

/*----------- RANDOM CONTROLS ----------- */

let randomSong = () => {
  randomNumber = Math.floor(Math.random() * myMusic.length);
  loadMusic(randomNumber);
  audio.play();
  playPause.innerHTML = '<i class="fas fa-pause"></i>';
};

randomIcon.addEventListener("click", randomSong);

/* ------------ REPEAT CONTROLS ---------- */

let repeatSong = () => {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
  playPause.innerHTML = '<i class="fas fa-pause"></i>';
};

repeat.addEventListener("click", repeatSong);

/* ------- TIME PROGRESS CONTROLS ------------- */

let convertTime = (seconds) => {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  currentSongTime.textContent = min + ":" + sec;
};

let totalTime = (seconds) => {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  totalSongTime.textContent = min + ":" + sec;
};

audio.addEventListener("timeupdate", () => {
  if (audio.currentTime && audio.duration) {
    convertTime(Math.round(audio.currentTime));
    totalTime(Math.round(audio.duration));
    let position = audio.currentTime / audio.duration;
    fillerTimeBar.style.width = position * 100 + "%";
  }

  if (audio.ended) {
    nextSong();
  }
});

audioTimeBar.addEventListener("click", (e) => {
  let duration = audio.duration;
  let mouseX = e.offsetX;
  let barWidth = 210;
  let songPercent = mouseX / barWidth;
  console.log(songPercent);
  let newCurrentTime = songPercent * duration;
  audio.currentTime = newCurrentTime;
});

/* ----------------- VOLUME CONTROLS ------------------ */

let volumeProgress = () => {
  let position = audio.volume / 1;
  fillerVolumeBar.style.width = position * 100 + "%";
};

volumeProgress();

let volumeUp = () => {
  if (audio.volume <= 0.75) {
    audio.volume += 0.25;
  }
  volumeProgress();
  decreaseVolume.innerHTML = '<i class="fas fa-volume-down"></i>';
};

let volumeDown = () => {
  if (audio.volume >= 0.25) {
    audio.volume -= 0.25;
  }
  volumeProgress();
  if (audio.volume === 0) {
    decreaseVolume.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

increaseVolume.addEventListener("click", volumeUp);
decreaseVolume.addEventListener("click", () => {
  if (audio.volume === 0) {
    audio.volume += 0.25;
    decreaseVolume.innerHTML = '<i class="fas fa-volume-down"></i>';
    volumeProgress();
  } else {
    volumeDown();
  }
});
