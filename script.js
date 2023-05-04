// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("play-pause");
let progressBar = document.getElementById("progressBar");

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