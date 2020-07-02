const btnElegirTema = document.getElementById('elegirTema');
const btnElegirTemaDos = document.getElementById('elegirTemaDos');
const menuElegirTema = document.getElementById('menuElegirTema');
const formBusqueda = document.getElementById('buscar');
const opcionesBusqueda = document.getElementById('opcionesBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const apiKey = 'lz8bmzgplRAlgx1kU7VcVGJU3tjucFYn';
const busquedasSimilar = document.getElementById('busquedaSimilar');
const busquedaTendencia = document.getElementById('tendencia');
const busquedaSimilarDos = document.getElementById('busquedaSimilarDos');
const btnDay = document.getElementById('btnDay');
const btnDark = document.getElementById('btnNight');
const estilos = document.getElementById('css-estilos');
const estiloElegido = localStorage.getItem('estilo');
const logoGifos = document.getElementById('gifof-logo');
const lupita = document.getElementById('lupa');
const btnMisGuifos = document.getElementById('BtnMisGuifos');
let element;
let resultadoBusquedaUrl ;
let inputBusqueda;

obtenerGifsugerencias();
tendencias();
obtenerGifTendencias ()

if (estiloElegido == 1) {
    day()
} else {
    dark();
}



btnDay.addEventListener('click', function(){
    day();
});

btnDark.addEventListener('click', function(){
    dark();
})

busquedaSimilarDos.addEventListener('click', function () {
    let valor = document.getElementById('busquedaSimilarDos').innerText;
    document.getElementById('buscar').value = valor;
})

busquedaTendencia.addEventListener('click', function () {
    let valor = document.getElementById('tendencia').innerText;
    document.getElementById('buscar').value = valor;
})

busquedasSimilar.addEventListener('click', function () {
    let valor = document.getElementById('busquedaSimilar').innerText;
    document.getElementById('buscar').value = valor;
});


btnElegirTema.addEventListener('click', function () {
    if (menuElegirTema.style.display == 'none') {
        menuElegirTema.style.display = 'flex';
    } else {
        menuElegirTema.style.display = 'none';
    }
});

btnElegirTemaDos.addEventListener('click',function () {
    if (menuElegirTema.style.display == 'none') {
        menuElegirTema.style.display = 'flex';
    } else {
        menuElegirTema.style.display = 'none';
    }
});

//funciones de estilos

function day() {
    estilos.href = '/src/css/style.css';
    localStorage.setItem('estilo', '1');
    logoGifos.src =  '/src/img/gifOF_logo.png';
    lupita.src ='/src/img/lupa_inactive.svg';
}

function dark() {
    estilos.href  = '/src/css/styledark.css';
    localStorage.setItem('estilo','2');
    logoGifos.src =  '/src/img/gifOF_logo_dark.png';
    lupita.src ='/src/img/Combined Shape.svg';
}

function busqueda() {
    document.getElementById('opcionesBusqueda').style.display = 'flex';
    obtenerSugerencias();
    btnBuscarRosa();
}

function cerrarBusqueda() {
    document.getElementById('opcionesBusqueda').style.display = 'none';
}

function btnBuscarRosa() {
    if (estiloElegido == 1) {
        document.getElementById('btnBuscar').className = 'btn-rosa';
        document.getElementById('lupa').src = '/src/img/lupa.svg';
        document.getElementById('btnBuscarPrincipal').className = 'btn-buscar-principal-rosa';
    } else {
        document.getElementById('btnBuscar').className = 'btn-rosa';
        document.getElementById('lupa').src = '/src/img/lupa_light.svg';
        document.getElementById('btnBuscarPrincipal').className = 'btn-buscar-principal-rosa';
    }
    
}

function btnBuscarGris() {
    if (estiloElegido == 1) {
        document.getElementById('btnBuscar').className = 'btn-buscar';
        document.getElementById('lupa').src = '/src/img/lupa_inactive.svg';
        document.getElementById('btnBuscarPrincipal').className = 'btn-buscar-principal';
    } else {
        document.getElementById('btnBuscar').className = 'btn-buscar';
        document.getElementById('lupa').src = '/src/img/Combined Shape.svg';
        document.getElementById('btnBuscarPrincipal').className = 'btn-buscar-principal';
    }
    
}
function validarCampoVacio() {
    inputBusqueda = document.getElementById('buscar').value;
    console.log(inputBusqueda);
    if (inputBusqueda == '') {
        btnBuscarGris();
        cerrarBusqueda();
    } else {
        btnBuscarRosa();
    }
}

function ocultarDivsTendencias () {
    
    document.getElementById('divTitleTendencias').style.display = 'none';
    document.getElementById('div-resultados-tendencias').style.display = 'none';
}
function ocultarDivsSugerencias(){
    document.getElementById('divTitleSugeridos').style.display= 'none';
    document.getElementById('div-resultados').style.display= 'none';
}

function mostrarResultadosDivs() {
    document.getElementById('divTitleBusqueda').style.display = 'flex';
    document.getElementById('div-resultados-busqueda').style.display ='flex';
}
//api

btnBuscar.addEventListener('click', function () {
    if (inputBusqueda == '') {
        alert('Ingrese una palabra')
    } else {
        ocultarDivsTendencias();
        ocultarDivsSugerencias();
        mostrarResultadosDivs();
        obtenerSugerencias();
        inputBusqueda = document.getElementById('buscar').value;
        getSearchResults(inputBusqueda);
    }
})

async function tendencias() {
    fetch('http://api.giphy.com/v1/trending/searches?api_key=lz8bmzgplRAlgx1kU7VcVGJU3tjucFYn')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let tendencia = data.data[0];
            document.getElementById('tendencia').innerText = tendencia;
            return data;
        })
        .catch(error =>{
            return error;
        })
}

function getSearchResults(palabraBuscada) {
    document.getElementById('buscar').value = palabraBuscada;
    mostrarResultadosDivs();
    ocultarDivsTendencias();
    const found = fetch('http://api.giphy.com/v1/gifs/search?q=' + palabraBuscada + '&api_key=' + apiKey + '&limit=20')
        .then(response => {
            return response.json();
            
        })
        .then(data => {
            console.log(data);
            let cantidadResultados = data.data.length ;
            const title = document.getElementById('tituloDivBusqueda');
            title.innerText= '';
            let tituloBusqueda = document.createTextNode(palabraBuscada + ' (' + cantidadResultados + ')');
            title.appendChild(tituloBusqueda);
            document.getElementById('div-resultados-busqueda').innerHTML = '';
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index].images.downsized.url;
                const username = data.data[index].username;
                console.log(element);
                console.log(username);
                const divPrincipal = document.getElementById('div-resultados-busqueda');
                let contenedor = document.createElement('div');
                contenedor.className = 'contenedorClass';
                let titular = document.createElement('div');
                titular.className = 'titular-gif-tendencias';
                let titulo = document.createElement('h3');
                titulo.className = 'titulo-sugerencias';
                let textoTitulo = document.createTextNode('#' + palabraBuscada);
                let contenedorGif = document.createElement('div');
                contenedorGif.innerHTML = '<img src="' + element +'" class="gif" autoplay="true" loop="true">';
                titulo.appendChild(textoTitulo);
                titular.appendChild(titulo);
                contenedor.appendChild(titular);
                contenedor.insertBefore(contenedorGif,titular);
                divPrincipal.appendChild(contenedor);
            
            };
            return data;
            
        })
        .catch(error => {
            return error;
        });
    return found;
}
function obtenerSugerencias() {
    inputBusqueda = document.getElementById('buscar').value;
    const found = fetch('http://api.giphy.com/v1/tags/related/'+inputBusqueda+ '?api_key=' + apiKey)
        .then(response => {
            return response.json();
            
        })
        .then(data => {
            let sugerenciaUno = data.data[0].name;
            document.getElementById('busquedaSimilar').innerText = sugerenciaUno;
            let sugerenciaDos = data.data[1].name;
            document.getElementById('busquedaSimilarDos').innerText = sugerenciaDos;
            console.log(data)
            return data;
            
        })
        .catch(error => {
            return error;
        });
    return found;
}

function obtenerGifsugerencias () {
    const found = fetch('http://api.giphy.com/v1/gifs/trending?api_key=lz8bmzgplRAlgx1kU7VcVGJU3tjucFYn&limit=4')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let index = 0; index < 4 ; index++) {
                const element = data.data[index].images.downsized.url;
                const name = data.data[index].username;
                const divPrincipal = document.getElementById('div-resultados');
                console.log(element);
                let contenedor = document.createElement('div');
                contenedor.className = 'contenedorClass';
                let titular = document.createElement('div');
                titular.className = 'titular-gif-sugerencias';
                let titulo = document.createElement('h3');
                titulo.className = 'titulo-sugerencias';
                let textoTitulo = document.createTextNode('#' + name);
                let logo = document.createElement('img');
                logo.src = '/src/img/button close.svg';
                logo.className = 'logo-closed'
                let contenedorGif = document.createElement('div');
                contenedorGif.innerHTML = '<img src="' + element +'" class="gif" autoplay="true" loop="true">';
                titulo.appendChild(textoTitulo);
                titular.appendChild(logo)
                titular.insertBefore(titulo, logo)
                contenedor.appendChild(contenedorGif);
                contenedor.insertBefore(titular, contenedorGif);
                let divBtnVerMas = document.createElement('div');
                divBtnVerMas.innerHTML = `<button class="btn-ver-mas" onclick="getSearchResults( '${name}' )">Ver más...</button>`;
                divBtnVerMas.className = 'div-btn-ver-mas';
                contenedor.insertBefore( divBtnVerMas, contenedorGif)
                divPrincipal.appendChild(contenedor);
            }
            return data;
        })
        .catch(error => console.error(error));
}
function obtenerGifTendencias () {
    const found = fetch('http://api.giphy.com/v1/gifs/trending?api_key=lz8bmzgplRAlgx1kU7VcVGJU3tjucFYn&limit=20&offset=4')
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let index = 0; index < 20 ; index++) {
                const element = data.data[index].images.downsized.url;
                const name = data.data[index].username;
                const divPrincipal = document.getElementById('div-resultados-tendencias');
                console.log(element);
                let contenedor = document.createElement('div');
                contenedor.className = 'contenedorClass';
                let titular = document.createElement('div');
                titular.className = 'titular-gif-tendencias';
                let titulo = document.createElement('h3');
                titulo.className = 'titulo-sugerencias';
                let textoTitulo = document.createTextNode('#' + name);
                let contenedorGif = document.createElement('div');
                contenedorGif.innerHTML = '<img src="' + element +'" class="gif" autoplay="true" loop="true">';
                titulo.appendChild(textoTitulo);
                titular.appendChild(titulo);
                contenedor.appendChild(titular);
                contenedor.insertBefore(contenedorGif,titular);
                divPrincipal.appendChild(contenedor);
            }
            return data;
        })
        .catch(error => console.error(error));
}