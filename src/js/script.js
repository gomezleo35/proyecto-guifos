const btnElegirTema = document.getElementById('elegirTema');
const btnElegirTemaDos = document.getElementById('elegirTemaDos');
const menuElegirTema = document.getElementById('menuElegirTema');
const inputBusqueda = document.getElementById('buscar');
const opcionesBusqueda = document.getElementById('opcionesBusqueda');

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
    inputBusqueda.style.background = 'red';
}
