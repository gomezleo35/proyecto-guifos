const btnElegirTema = document.getElementById('elegirTema');
const btnElegirTemaDos = document.getElementById('elegirTemaDos');
const menuElegirTema = document.getElementById('menuElegirTema');
let inputBusqueda;
const opcionesBusqueda = document.getElementById('opcionesBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const apiKey = 'lz8bmzgplRAlgx1kU7VcVGJU3tjucFYn';
let element;
let resultadoBusquedaUrl ;

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


function busqueda() {
    document.getElementById('opcionesBusqueda').style.display = 'flex';
    btnBuscarRosa();
}

function cerrarBusqueda() {
    document.getElementById('opcionesBusqueda').style.display = 'none';
    btnBuscarGris();
}

function btnBuscarRosa() {
    document.getElementById('btnBuscar').className = 'btn-rosa';
    document.getElementById('lupa').src = '/src/img/lupa.svg';
    document.getElementById('btnBuscarPrincipal').className = 'btn-buscar-principal-rosa';
}

function btnBuscarGris() {
    document.getElementById('btnBuscar').className = 'btn-buscar';
    document.getElementById('lupa').src = '/src/img/lupa_inactive.svg';
    document.getElementById('btnBuscarPrincipal').className = 'btn-buscar-principal';
}

//api

btnBuscar.addEventListener('click', getSearchResults);
btnBuscar.addEventListener('click', obtenerSugerencias);
function getSearchResults() {
    inputBusqueda = document.getElementById('buscar').value;
    const found = fetch('http://api.giphy.com/v1/gifs/search?q=' + inputBusqueda + '&api_key=' + apiKey)
        .then(response => {
            return response.json();
            
        })
        .then(data => {
            console.log(data)
            for (const iterator of object) {
                
            }
            console.log(element);
            return data;
            
        })
        .catch(error => {
            return error;
        });
    return found;
}
function obtenerSugerencias() {
    inputBusqueda = document.getElementById('buscar').value;
    const found = fetch('api.giphy.com/v1/tags/related/'+inputBusqueda+ '?api_key' + apiKey)
        .then(response => {
            return response.json();
            
        })
        .then(data => {
            console.log(data)
            return data;
            
        })
        .catch(error => {
            return error;
        });
    return found;
}