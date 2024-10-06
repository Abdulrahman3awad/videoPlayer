let container = document.querySelector(".video");
let video = document.querySelector("#video");
let controls = document.querySelector(".controls");
let inputFile = document.querySelector(".uploadVideo");
let timeRange = document.querySelector("input.timeRange");
let playButton = document.querySelector(".play");
let timeP = document.querySelector("p.time");
let audioButton = document.querySelector(".audio span");
let volumeRange = document.querySelector("input.volume");
let speedSelect = document.querySelector("select.speed");
let screenButton = document.querySelector("button.screen");

function uploadVideo() {
  let fr = new FileReader();
  fr.readAsDataURL(inputFile.files[0]);
  fr.onload = () => {
    video.src = fr.result;
    container.style.display = "inline-block";
  };
}
function playVideo() {
  if (video.paused) {
    video.play();

    playButton.children[0].textContent = "pause";
  } else {
    video.pause();
    playButton.children[0].textContent = "play_arrow";
  }
}
function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  // إضافة صفر إذا كانت القيمة أقل من 10
  const formattedHours = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // إرجاع القيمة بصيغة hh:mm:ss أو mm:ss إذا لم تكن هناك ساعات
  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}
function updateVideoTime() {
  timeP.textContent = `${formatTime(video.currentTime)} / ${formatTime(
    video.duration
  )}`;
}
function rangeTime(current, duration) {
  return (current / duration) * 100;
}
function updateTimeRange() {
  timeRange.value = rangeTime(video.currentTime, video.duration);
}
function rangeAudio() {
  video.volume = volumeRange.value;
  if (video.volume == 0) {
    audioButton.textContent = "volume_off";
  } else {
    audioButton.textContent = "volume_up";
  }
}

function speed() {
  video.playbackRate = +speedSelect.value;
}
function fullScreen() {
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable full-screen mode: ${err.message}`);
    });
    screenButton.children[0].textContent = "fullscreen_exit";
  } else {
    document.exitFullscreen().catch((err) => {
      alert(`Error attempting to exit full-screen mode: ${err.message}`);
    });
    screenButton.children[0].textContent = "fullscreen";
  }
}
function showControls() {
  controls.style.bottom = "0px";
}
function hideControls() {
  controls.style.bottom = "-80px";
}

setInterval(updateVideoTime, 1000);
setInterval(updateTimeRange, 1000);
timeRange.oninput = () => {
  video.currentTime = (timeRange.value * video.duration) / 100;
  updateTimeRange();
};
inputFile.onchange = () => {
  uploadVideo();
  if (video.getAttribute("src") !== "") {
    playButton.onclick = playVideo;
    volumeRange.oninput = rangeAudio;
    speedSelect.onchange = speed;
    screenButton.onclick = fullScreen;
    container.onmouseenter = showControls;
    container.onmouseleave = hideControls;
  }
};
if (video.getAttribute("src") !== "") {
  playButton.onclick = playVideo;
  volumeRange.oninput = rangeAudio;
  speedSelect.onchange = speed;
  screenButton.onclick = fullScreen;
  container.onmouseenter = showControls;
  container.onmouseleave = hideControls;
}
