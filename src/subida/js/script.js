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
const estiloElegido = localStorage.getItem('estilo');
const logoGifos = document.getElementById('logoGifos');
let urlGif;
let upload;
let createdGifURL;
let arrayGifsCreados = [];
let recorder;
let URLgrabacion;
let urlGifCreado;

//temas

if (estiloElegido == 1) {
    day()
} else {
    dark();
}

function day() {
    estilos.href = '/src/subida/css/style.css';
    logoGifos.src="/src/img/gifOF_logo.png";
}

function dark() {
    estilos.href  = '/src/subida/css/styledark.css';
    logoGifos.src="/src/img/gifOF_logo_dark.png";
}


//informacion

btnCancelar.addEventListener('click', function () {
    location.href = '/index.html';
});

btnComenzar.addEventListener('click', function () {
    containerVideo.style.display = 'flex';
    containerInfo.style.display = 'none';
    getStreamAndRecord();
});

//captura

btnCapturar.addEventListener('click', async function () {
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
        onGifRecordingStarted: function () {
            console.log('started');
        }
    });
    console.log(recorder);
    recorder.startRecording();
});

btnDetener.addEventListener('click', async function () {
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

btnRepetirCaptura.addEventListener('click', function () {
    containerVideo.style.display = 'flex';
    containerInfo.style.display = 'none';
    preVisualizacion.style.display = 'none';
    video.style.display = 'block';
    recorder.reset();
    document.getElementById('btnCamara').style.display = 'flex';
    document.getElementById('contenedor-btn-subir').style.display = 'none';
    getStreamAndRecord();
});

//subir
let blob;

btnSubir.addEventListener('click', async function () {
    document.getElementById('contenedor-btn-subir').style.display = 'none';
    contenedorCancelar.style.display = 'flex';
    preVisualizacion.style.display = 'none'
    imgCargando.style.display = 'flex';
    blob = recorder.getBlob();
    let formData = new FormData();
    formData.append('file', blob, 'myGif.gif');
    console.log(formData.get('file'));
    const options = {
        method: 'POST',
        mode: 'cors',
        body: formData
    };
    upload = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}&source_image_url=${URLgrabacion}`;

    try {
        const response = await fetch(upload, options);
        const json = await response.json();
        const gifObject = json;
        guardarGif(gifObject.data.id);
        const copyID = json.data.id;
        const getApiURL = `https://api.giphy.com/v1/gifs/${copyID}?api_key=${apiKey}&gif_id=${copyID}`;
        getGifURL(getApiURL);
        urlGif = 'https://giphy.com/gifs/' + gifObject.data.id;
        urlGifCreado = await urlGifSubidoGet(getApiURL);
        console.log(urlGif);
        document.getElementById('img-exito').src = urlGifCreado;
        contenedorCapturar.style.display = 'none';
        divExito.style.display = 'flex';
        return getApiURL;
    } catch (e) {
        console.log(e)
    }
})

async function urlGifSubidoGet(urlGif) {

    try {
        const response = await fetch(urlGif);
        const json = await response.json();
        if (json && json.data) {
            return json.data.images.original.mp4;
        }
        throw `Error en el json de urlGifSubidoGet`;

    } catch (e) {
        console.log(`Hubo un problema al consultar el valor del gift ${e}`)
    }
}

//cancelar

cancelarUp.addEventListener('click', function () {
    controller.abort();
    containerInfo.style.display = 'flex';
    contenedorCancelar.style.display = 'none';
    location.href = '/src/subida/subir.html';

})

//funcion para iniciar la camara

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {max: 480}
        }
    })
        .then(function (stream) {
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
        arrayGifsCreados = JSON.parse(localStorage.getItem('arrayGifs'));
        arrayGifsCreados.push(gifID)
    }
    localStorage.setItem('arrayGifs', JSON.stringify(arrayGifsCreados));
};

// Obtener URL de Gif


async function getGifURL(url) {
    const response = await fetch(url);
    const json = await response.json();
    createdGifURL = await json.data.url;
}
// Fetch Fx

async function useRequest(url) {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    return json;
};


// copiar url 


function copiarUrl(text) {
    const hiddenTextArea = document.createElement("textarea");
    document.body.appendChild(hiddenTextArea);
    hiddenTextArea.value = text;
    hiddenTextArea.focus();
    hiddenTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(hiddenTextArea);
};

const btnCopiar = document.getElementById('copia');


btnCopiar.addEventListener('click',  function(){
    copiarUrl(createdGifURL)
    console.log('copiado')
    btnCopiar.innerHTML = 'Enlace copiado con éxito!';
})

// descargar gifo

const btnDescargar = document.getElementById('descargar');

btnDescargar.addEventListener('click', function (){
    invokeSaveAsDialog(blob);
})

// btn listo

const btnListo = document.getElementById('btnListo');

btnListo.addEventListener('click', function () {
    location.href = '/src/subida/subir.html';
});

//mostrar gifos

function appendGif(response, output) {
    response.data.forEach(object => {
        const createdElement = document.createElement('img');
        output.appendChild(createdElement).src = object.images.fixed_height.url;
        
    })
};

let savedGifs = JSON.parse(localStorage.getItem('arrayGifs'));

const misGuifosInnerText = document.getElementById('divMisGifos');

obtenerGifLocal();

async function obtenerGifLocal () {
    for (let index = 0; index < savedGifs.length; index++) {
        const id = savedGifs[index];
        const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`);
        const json = await response.json();
        const urlVideo = await json.data[0].images.original.mp4;
        misGuifosInnerText.innerHTML
        let contenedorGif = document.createElement('div');
        contenedorGif.className = 'div-local-gif';
        contenedorGif.innerHTML = '<video src="' + urlVideo +'" class="videoLocalStorage" autoplay="true" loop="true">';
        misGuifosInnerText.appendChild(contenedorGif);

    }
}




function getMyGifs(output) {
    if (savedGifs) {
        fetch(gifGetURL)
            .then(res => {
                return res.json()

            }).then(response => {
                appendGif(response, output)
            })
            .catch(error => {
                console.log(error)
            })
    } else {
        misGuifosInnerText.innerHTML = 'No hay GiFs Creados!';
    }
};