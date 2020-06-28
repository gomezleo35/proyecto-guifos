const video = document.getElementById('video');
const containerVideo = document.getElementById('container-camara');
const btnComenzar = document.getElementById('comenzar');
const containerInfo = document.getElementById('container-info');
const btnCancelar = document.getElementById('cancelar');
const btnCapturar = document.getElementById('capturar');
const btnDetener = document.getElementById('detener');
const preVisualizacion = document.getElementById('preVisualizacion');
const imgCargando = document.getElementById('cargando');
const btnRepetirCaptura = document.getElementById('repetirCaptura');
const btnSubir = document.getElementById('btnSubir');
const apiKey = 'lz8bmzgplRAlgx1kU7VcVGJU3tjucFYn';
const contenedorCapturar = document.getElementById('contenedoCapturar');
const contenedorCancelar = document.getElementById('contenedor-btn-cancelar');
const controller = new AbortController();
const cancelarUp = document.getElementById('cancelarUp');
const signal = controller.signal;
const divExito = document.getElementById('divExito');
let urlGif;
let upload;
let createdGifURL;
let arrayGifsCreados = [];
let recorder;
let URLgrabacion;

//informacion

btnCancelar.addEventListener('click', function(){
    location.href= '/index.html';
});

btnComenzar.addEventListener('click', function (){
    containerVideo.style.display = 'flex';
    containerInfo.style.display = 'none';
    getStreamAndRecord();
});

//captura

btnCapturar.addEventListener('click',  async function (){
    document.getElementById('contenedor-btn-stop').style.display = 'flex';
    document.getElementById('btnCamara').style.display = 'none';
    let stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {max: 480}
        }
    });
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function(){
            console.log('started');
        }
    });
    console.log(recorder);
    recorder.startRecording();
} );

btnDetener.addEventListener('click', async function(){
    await recorder.stopRecording();
    var internalRecorder = recorder.getInternalRecorder();
    console.log('video finalizado OK');
    console.log(recorder);
    console.log(internalRecorder)
    let grabacion = await recorder.getBlob();
    URLgrabacion = URL.createObjectURL(grabacion);
    console.log(URLgrabacion);
    preVisualizacion.style.display = 'block';
    video.style.display = 'none';
    preVisualizacion.src = URLgrabacion;
    document.getElementById('contenedor-btn-stop').style.display = 'none';
    document.getElementById('contenedor-btn-subir').style.display = 'block';
});

//boton reiniciar captura

btnRepetirCaptura.addEventListener('click', function(){
    containerVideo.style.display = 'flex';
    containerInfo.style.display = 'none';
    preVisualizacion.style.display = 'none';
    video.style.display= 'block';
    recorder.reset();
    document.getElementById('btnCamara').style.display = 'flex';
    document.getElementById('contenedor-btn-subir').style.display = 'none';
    getStreamAndRecord();
});

//subir

btnSubir.addEventListener('click', function(){
    document.getElementById('contenedor-btn-subir').style.display = 'none';
    contenedorCancelar.style.display = 'flex';
    preVisualizacion.style.display= 'none'
    imgCargando.style.display= 'flex';
    let formData = new FormData();
    formData.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(formData.get('file'));
    const options = {
        method: 'POST',
        mode: 'cors',
        body: formData
    };
    upload = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}&source_image_url=${URLgrabacion}`
    fetch(upload, options)
            .then(response => {
                return response.json();
            })
            .then(async json => {
                const gifObject = json;
                guardarGif(gifObject.data.id);
                const copyID = json.data.id;
                const getApiURL = `https://api.giphy.com/v1/gifs/${copyID}?api_key=${apiKey}&gif_id=${copyID}`;
                getGifURL(getApiURL);
                urlGif = 'https://giphy.com/gifs/' + gifObject.data.id;
                urlGifCreado =  await urlGifSubidoGet(getApiURL);
                console.log(urlGif)
                document.getElementById('img-exito').src = urlGifCreado;
                contenedorCapturar.style.display= 'none';
                divExito.style.display = 'flex';
                return getApiURL;  
            })
            .catch(error => {
                console.log(error)
            })
})

function urlGifSubidoGet (urlGif) {
    fetch(urlGif)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.data.images.original.mp4;
        })
}

//cancelar

cancelarUp.addEventListener('click', function(){
    controller.abort();
    containerInfo.style.display ='flex';
    contenedorCancelar.style.display = 'none';
})

//funcion para iniciar la camara

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
    return stream;
    })
};

//guardar gif en localStorage


function guardarGif(gifID) {
    if (localStorage.getItem('arrayGifs') == null) {
        arrayGifsCreados.push(gifID)
    } else {
        arrayGifsCreados = localStorage.getItem('arrayGifs').split(',')
        arrayGifsCreados.push(gifID)
    }
    localStorage.setItem('arrayGifs', arrayGifsCreados.join())
};

// Obtener URL de Gif
let urlGifCreado;

function getGifURL(url) {
    useRequest(url).then(response => {
        createdGifURL = response.data.url;
        console.log(createdGifURL)
        return createdGifURL;
    })
};

// Fetch Fx

async function useRequest(url) {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    return json;
};
