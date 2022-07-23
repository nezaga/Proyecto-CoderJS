//Inicializamos las variables para cotizar
let edad = 18;
let inputEdad = document.getElementById("edad");
let cob_accidente = getUserSelection("storageAccidente");
let cob_vida = getUserSelection("storageVida");
let cob_salud = getUserSelection("storageSalud");
let tasa;
let iva = 0.21;
let sumaAccidente = 0;
let sumaVida = 0;
let sumaSalud = 0;
let tna = 0.65;
let ivaValor = 0;

//Definimos la clase Cobertura.
class Cobertura {
    constructor(nombre, SA) {
        this.nombre = nombre;
        this.sumaAsegurada = SA;
        this.prima = 0.0;
    }
    calcularPrima(tasa) {
        this.prima = this.sumaAsegurada * tasa;
    }
}

// Creo los 3 objetos Coberturas y se agrega al array
function elegirCobAccidente(seleccionCob) {
    cob_accidente = document.getElementById("cob_accidente").checked;
    if (cob_accidente == true && !seleccionCob.find((object) => object.nombre === "Accidente")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {
            return object.nombre === "Accidente";
        }), 1);
        const cobertura = new Cobertura("Accidente", document.getElementById("suma_accidente").value);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
    } else if (cob_accidente == false && seleccionCob.find((object) => object.nombre === "Accidente")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {
            return object.nombre === "Accidente";
        }), 1)
    } else {
        return
    }
    saveUserSelection("storageAccidente", cob_accidente);
}

function elegirCobVida(seleccionCob) {
    cob_vida = document.getElementById("cob_vida").checked;
    if (cob_vida == true && !seleccionCob.find((object) => object.nombre === "Vida")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {
            return object.nombre === "Vida";
        }), 1);
        const cobertura = new Cobertura("Vida", document.getElementById("suma_vida").value);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
    } else if (cob_vida == false && seleccionCob.find((object) => object.nombre === "Vida")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {
            return object.nombre === "Vida";
        }), 1)
    } else {
        return
    }
    saveUserSelection("storageVida", cob_vida);
}

function elegirCobSalud(seleccionCob) {
    cob_salud = document.getElementById("cob_salud").checked;
    if (cob_salud == true && !seleccionCob.find((object) => object.nombre === "Salud")) {
        const cobertura = new Cobertura("Salud", document.getElementById("suma_salud").value);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
    } else if (cob_salud == false && seleccionCob.find((object) => object.nombre === "Salud")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {
            return object.nombre === "Salud";
        }), 1)
    } else {
        return
    }
    saveUserSelection("storageSalud", cob_salud);
}

// Función para obtener los datos ingresados en el front
function obtenerDatos() {
    validarEdadYObtenerTasa(edad);
    if (validarEdadYObtenerTasa(edad) == true) {
        elegirCobAccidente(seleccionCob);
        elegirCobVida(seleccionCob);
        elegirCobSalud(seleccionCob);
        return true;
    } else {
        return false;
    }
}

// Validamos edad y determinamos la tasa
function validarEdadYObtenerTasa(edad) {
    let edadError = document.getElementById("edadError");
    if (edad < 18) {
        let error = "No tenés edad para contratar un seguro, lo sentimos.";
        showError(error);
        //edadError.innerText = error;
        //edadError.hidden = false;
        return false;
    } else if ((edad >= 18) && (edad < 45)) {
        edadError.hidden = true;
        tasa = 0.02;
        return true;
    } else if ((edad >= 45) && (edad <= 65)) {
        edadError.hidden = true;
        tasa = 0.035;
        return true;
    } else {
        let error = "Superaste la edad de asegurabilidad, lo sentimos.";
        showError(error);
        //edadError.innerText = error;
        //edadError.hidden = false;
        return false;
    }
}

// Funciones para guardar y obtener selección desde el Local Storage
function getUserSelection(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
}

function saveUserSelection(storageName, value) {
    localStorage.setItem(storageName, value);
}


//Definimos un array vacío, para guardar la selección del usuario
const seleccionCob = [];

// Renderizamos el front con lo guardado en la Local Storage
if (localStorage.length > 0) {
    document.getElementById("cob_accidente").checked = cob_accidente;
    document.getElementById("cob_vida").checked = cob_vida;
    document.getElementById("cob_salud").checked = cob_salud;
}

// Escuchamos los cambios en la edad y validamos si puede cotizar o no
inputEdad.onchange = () => {
    edad = inputEdad.value;
    validarEdadYObtenerTasa(edad);
};

// Proceso de cotización
// Recorremos el array de coberturas seleccionadas, sumando la prima de cada una y calculando el Premio Total agreando el IVA
function calcularPremio() {
    const primaTotal = seleccionCob.reduce((acc, el) => acc + el.prima, 0)
    ivaValor = primaTotal * iva;
    premioTotal = primaTotal + ivaValor;
    return premioTotal;
}

// Función de Pago
function pago() {
    // Se solicita ingreso de cuotas
    let cuotas = document.getElementById("cuotas").value; //parseInt(prompt("El total a pagar es $" + premioTotal + " ¿En cuántas cuotas desea pagar?"));

    // Se calcula el costo financiero, según la cantidad de cuotas elegidas
    let premioTotalFinanciado = 0;

    // Se calcula la tasa efectiva mensual
    let tem = 1 + tna / 12;

    if (cuotas != 1) {
        for (let i = 1; i <= cuotas; i++) {
            let precioPorCuota = premioTotal / cuotas;
            //alert("La cuota " + i + " será de $" + precioPorCuota);
            premioTotal = premioTotal * tem;
            premioTotalFinanciado += precioPorCuota;
        }
        return premioTotal.toFixed(2);
    } else {
        return premioTotal.toFixed(2);
    }
}

// Se define una función para cotizar y pagar, sólo en caso de que los datos obtenidos hayan sido válidos
function quoteAndPay() {
    obtenerDatos();
    if (obtenerDatos() == true) {
        calcularPremio();
        premioTotal = pago();
        document.getElementById("premioTotal").innerText = premioTotal;
        document.getElementById("ivaValor").innerText = ivaValor.toFixed(2);
        document.getElementById("seleccion").innerText = seleccionCob.length;
        document.getElementById("premioAccidente").innerText = seleccionCob.find((el) => el.nombre === "Accidente").prima.toFixed(2);
        document.getElementById("premioVida").innerText = seleccionCob.find((el) => el.nombre === "Vida").prima.toFixed(2);
        document.getElementById("premioSalud").innerText = seleccionCob.find((el) => el.nombre === "Salud").prima.toFixed(2);
        //console.log(seleccionCob);
        //console.log(seleccionCob.length);
        //console.log(tasa);
    } else {
        premioTotal = 0
        document.getElementById("premioTotal").innerText = premioTotal;
        console.log("No pudo cotizar");
    }
}

// Función para mostrar alert de error
function showError(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
})};

// Se llama a la cotización y pago ante cualquier cambio que suceda en el Form
var form = document.querySelector('form');
form.addEventListener('change', quoteAndPay);