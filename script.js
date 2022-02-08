const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

//Music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Test-1',
        artist:'artTest-1',
    },
    {
        name:'jacinto-2',
        displayName:'Test-2',
        artist:'artTest-2',
    },
    {
        name:'jacinto-3',
        displayName:'Test-3',
        artist:'artTest-3',
    }
]

//Check if Playing
let isPlaying = false;

//Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

//Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play')
    music.pause();
}

//Play or Pause
playBtn.addEventListener('click',()=>(isPlaying ? pauseSong(): playSong()));

//Update Dom

const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

const prevSong = () => {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load - select first song 
loadSong(songs[songIndex]);

//Update Progress Bar & time
const updateProgressBar = (e) => {
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;

        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
        //delay switch avoid NaN
        if(durationSeconds){
            durationEl.textContent= `${durationMinutes}:${durationSeconds}`
        }

        //Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent= `${currentMinutes}:${currentSeconds}`

    }
}

//Set ProgressBar
const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

// Event Listener
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)