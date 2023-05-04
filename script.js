// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("play-pause");
let progressBar = document.getElementById("progressBar");

let songs = [
    {songName : "Random Song 1", songPath: "songs/1.mp3", songCover: "covers/1.jpg"},
    {songName : "Random Song 2", songPath: "songs/2.mp3", songCover: "covers/2.jpg"},
    {songName : "Random Song 3", songPath: "songs/3.mp3", songCover: "covers/3.jpg"},
    {songName : "Random Song 4", songPath: "songs/4.mp3", songCover: "covers/4.jpg"},
    {songName : "Random Song 5", songPath: "songs/5.mp3", songCover: "covers/5.jpg"},
    {songName : "Random Song 6", songPath: "songs/6.mp3", songCover: "covers/6.jpg"},
    {songName : "Random Song 7", songPath: "songs/7.mp3", songCover: "covers/7.jpg"},
    {songName : "Random Song 8", songPath: "songs/8.mp3", songCover: "covers/8.jpg"},
    {songName : "Random Song 9", songPath: "songs/9.mp3", songCover: "covers/9.jpg"},
    {songName : "Random Song 10", songPath: "songs/10.mp3", songCover: "covers/10.jpg"}
];
progressBar.value = 0;

// Play and Pause using the Main Play Button
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused){
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        audioElement.play();
    }
    else{
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        audioElement.pause();
    }
})

// Going to the previous Tracks
document.getElementById("previousTrack").addEventListener("click", ()=>{
    if (songIndex === 0){
        songIndex = 9;
    }
    else {
        songIndex--;
    }
    progressBar.value = 0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    audioElement.play();
})


// Skipping to the Next Tracks
document.getElementById("nextTrack").addEventListener("click", ()=>{
    if (songIndex === 9){
        songIndex = 1;
    }
    else {
        songIndex++;
    }
    progressBar.value = 0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    audioElement.play();

})

// Highlighting the song that is playing
document.addEventListener("click",()=>{
    for (let i = 0; i <= 9 ; i++) {
        if (i === songIndex){
            document.getElementById(`song-${i+1}`).classList.add("highlightPlayingSong");
        }
        else{
            document.getElementById(`song-${i+1}`).classList.remove("highlightPlayingSong");
        }
    }
})

// For loop for the playing the song on the click of the songName
for (let i = 0; i <= 9; i++) {
    document.getElementById(`song-${i+1}`).addEventListener("click",()=>{
        progressBar.value = 0;
        songIndex = i;
        audioElement.src=`songs/${i+1}.mp3`;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        audioElement.play();
    });
}

// Showing the correct Album Cover
document.addEventListener("click",()=>{
    for (let i = 0; i <= 9 ; i++) {
        if (i === songIndex){
            document.getElementById(`albumCover`).src=`covers/${i+1}.jpg`;
        }
    }
});

// For the seek bar updation
audioElement.addEventListener("timeupdate", ()=>{
    // Updating the Seek Bar
    progress = (audioElement.currentTime/audioElement.duration)*100;
    progressBar.value = progress;
});

// For pausing and playing using Space Bar
document.addEventListener("keydown", (event)=>{
    if(event.key === " "){
        if(audioElement.paused){
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            audioElement.play();
        }
        else{
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            audioElement.pause();
        }
    }
})

// Seek Bar input
progressBar.addEventListener("change",()=>{
    audioElement.pause();
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
    console.log(audioElement.currentTime);
    audioElement.play();
})