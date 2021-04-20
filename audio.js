const audiosrc = document.getElementById('audiofile');
const playWrapper = document.getElementById('play-wrapper');
const playPausebtn = document.getElementById('playPausebtn');
if (playWrapper) {
  playWrapper.addEventListener('click', function (x) {
    if (audiosrc.paused) {
      console.log('Played');
      playPausebtn.setAttribute(
        'src',
        'https://uploads-ssl.webflow.com/60687d0673e522ebc9e8ce21/6079b955a693b215299a6a0c_pause.svg'
      );
      audiosrc.play();
    } else {
      console.log('Paused');
      playPausebtn.setAttribute(
        'src',
        'https://uploads-ssl.webflow.com/60687d0673e522ebc9e8ce21/6079b929748b85e0c1757158_play_arrow.svg'
      );
      audiosrc.pause();
    }
  });
}
const totalDuration = document.getElementById('duration');
const currentDuration = document.getElementById('seek-value');
var minutes = Math.floor(audiosrc.duration / 60);
var seconds = Math.round(audiosrc.duration - minutes * 60, 1);
totalDuration.innerText = minutes.toString() + ':' + seconds.toString();
audiosrc.ontimeupdate = function () {
  document.getElementById('progressBar').style.width =
    ((audiosrc.currentTime / audiosrc.duration) * 100).toString() + '%';
  var minutes = Math.floor(audiosrc.currentTime / 60);
  var seconds = Math.round(audiosrc.currentTime - minutes * 60, 1);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  console.log(
    'Duration:',
    audiosrc.currentTime,
    'percentageCoved:',
    ((audiosrc.currentTime / audiosrc.duration) * 100).toString() + '%'
  );
  currentDuration.innerText = minutes.toString() + ':' + seconds.toString();
};
console.log(audiosrc);
document.getElementById('rewind').addEventListener('click', function () {
  audiosrc.load();
  playPausebtn.setAttribute(
    'src',
    'https://uploads-ssl.webflow.com/60687d0673e522ebc9e8ce21/6079b955a693b215299a6a0c_pause.svg'
  );
  audiosrc.play();
});

audiosrc.volume = 1;
document.getElementById('volume-up').addEventListener('click', function () {
  console.log(audiosrc.volume);

  currentVolume = audiosrc.volume;
  if (currentVolume <= 1) {
    currentVolume += 0.2;
    if (currentVolume > 1) {
      currentVolume = 1;
    }
    document.getElementById('current-volume').style.width = (currentVolume * 100).toString() + '%';
    audiosrc.volume = currentVolume;
  }
});

document.getElementById('volume-down').addEventListener('click', function () {
  console.log(audiosrc.volume);

  currentVolume = audiosrc.volume;
  if (currentVolume >= 0 && currentVolume <= 1) {
    currentVolume -= 0.2;
    if (currentVolume < 0) {
      currentVolume = 0;
    }
    document.getElementById('current-volume').style.width = (currentVolume * 100).toString() + '%';

    audiosrc.volume = currentVolume;
  }
});

const seekBar = document.getElementById('seek-bar');

seekBar.addEventListener('click', function (e) {
  console.log(e.clientX - this.getBoundingClientRect().left, seekBar.clientWidth, this.getBoundingClientRect().left);
  //   var position = e.clientX - this.getBoundingClientRect().left;
  var bcr = this.getBoundingClientRect();
  //   console.log('You clicked to ', (e.clientX - bcr.left) / bcr.width);

  //   document.getElementById('progressBar').style.width =
  //     Math.round((position / seekBar.clientWidth) * 100, 1).toString() + '%';
  CurrentTimePercentage = (e.clientX - bcr.left) / bcr.width;
  console.log(
    'percentage:',
    CurrentTimePercentage,
    'Duration:',
    audiosrc.duration,
    'Select Duration:',
    audiosrc.duration * (CurrentTimePercentage / 100)
  );
  audiosrc.currentTime = audiosrc.duration * CurrentTimePercentage;
});
