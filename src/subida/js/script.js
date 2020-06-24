const video = document.getElementById('video');
function getStreamAndRecord () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height: { max: 480 }
    }
    })
    .then(function(stream) {
    video.srcObject = stream;
    video.play();
    })
}

getStreamAndRecord();