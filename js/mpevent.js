var videoElement = document.getElementById('video');

videoElement.addEventListener('loadeddata', function() {
  console.log('Video loaded.');
});

videoElement.addEventListener('timeupdate', function() {
  console.log('Current time: ' + videoElement.currentTime);
});

videoElement.addEventListener('seeked', function() {
  console.log('Seek operation completed.');
  videoElement.play();
});

videoElement.addEventListener('stalled', function() {
  console.log('Video stalled.');
});

videoElement.addEventListener('ended', function() {
  console.log('Video ended.');
});
