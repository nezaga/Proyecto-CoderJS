//Inicializamos las variables para cotizar
let edad = 18;
let inputEdad = document.getElementById("edad");
let cob_accidente = true;
let cob_vida = true;
let cob_salud = true;
let tasa;
let iva = 0.21;
let quiereCobAccidente = document.getElementById("cob_accidente");
let quiereCobVida = document.getElementById("cob_vida");
let quiereCobSalud = document.getElementById("cob_salud");
let sumaAccidente = 2000000;
let sumaVida = 10000000;
let sumaSalud = 1000000;

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
    cob_accidente = quiereCobAccidente.checked;
    if (cob_accidente == true && !seleccionCob.find((object) => object.nombre === "Accidente")) { 
        const cobertura = new Cobertura("Accidente", sumaAccidente);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
        console.log(seleccionCob);
    } else if (cob_accidente == false && seleccionCob.find((object) => object.nombre === "Accidente")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {return object.nombre === "Accidente";}),1)
        console.log(seleccionCob);
    } else {
        return
    }
}

function elegirCobVida(seleccionCob) {
    cob_vida = quiereCobVida.checked;
    if (cob_vida == true && !seleccionCob.find((object) => object.nombre === "Vida")) {
        const cobertura = new Cobertura("Vida", sumaVida);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
        console.log(seleccionCob);
    } else if (cob_vida == false && seleccionCob.find((object) => object.nombre === "Vida")) {
        seleccionCob.splice(seleccionCob.findIndex(object => {return object.nombre === "Vida";}),1)
        console.log(seleccionCob);
    } else {
        return
    }
}

function elegirCobSalud(seleccionCob) {
    cob_salud = quiereCobSalud.checked;
    if (cob_salud == true && !seleccionCob.find((object) => object.nombre === "Salud")) {
        const cobertura = new Cobertura("Salud", sumaSalud);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
        console.log(seleccionCob);
    } else if (cob_salud == false && seleccionCob.find((object) => object.nombre === "Salud")){
        seleccionCob.splice(seleccionCob.findIndex(object => {return object.nombre === "Salud";}),1)
        console.log(seleccionCob);
    } else {
        return
    }

}

//Definimos un array vacío, para guardar la selección del usuario
const seleccionCob = [];

// Función para obtener los datos ingresados en el front
function obtenerDatos() {
    if (validarEdadYObtenerTasa(edad)) {
        elegirCobAccidente(seleccionCob);
        elegirCobVida(seleccionCob);
        elegirCobSalud(seleccionCob);
        return true;
    } else {
        alert("Gracias por visitarnos.");
        return false;
    }
}

//Bienvenida
alert("Bienvenido al simulador para cotizar tu seguro, pulsa 'aceptar' para iniciar tu cotización");

// Validamos edad y determinamos la tasa
function validarEdadYObtenerTasa(edad) {
    if (edad < 18) {
        alert("No tenés edad para contratar un seguro, lo sentimos.");
        return false;
    } else if ((edad >= 18) && (edad < 45)) {
        tasa = 0.02;
        return true;
    } else if ((edad >= 45) && (edad <= 65)) {
        tasa = 0.035;
        return true;
    } else {
        alert("Superaste la edad de asegurabilidad, lo sentimos.");
        return false;
    }
}

// Escuchamos los cambios en la edad y validamos si puede cotizar o no
inputEdad.onchange = () => {
    edad = inputEdad.value; 
    console.log(edad);
    validarEdadYObtenerTasa(edad);
};

// Escuchamos los cambios en la cobertura por Accidentes y ejecutamos la función para agregar/quitar cobertura
quiereCobAccidente.onchange = () => {
    elegirCobAccidente(seleccionCob);
};

// Escuchamos los cambios en la cobertura por Vida y ejecutamos la función para agregar/quitar cobertura
quiereCobVida.onchange = () => {
    elegirCobVida(seleccionCob);
};

// Escuchamos los cambios en la cobertura por Salud y ejecutamos la función para agregar/quitar cobertura
quiereCobSalud.onchange = () => {
    elegirCobSalud(seleccionCob);
};

console.log(edad);
console.log(cob_accidente);
console.log(cob_vida);
console.log(cob_salud);
console.log(tasa);
console.log(seleccionCob);


// Proceso de cotización
// Recorremos el array de coberturas seleccionadas, sumando la prima de cada una y calculando el Premio Total agreando el IVA
function calcularPremio() {
    const primaTotal = seleccionCob.reduce((acc, el) => acc + el.prima, 0)
    premioTotal = primaTotal + primaTotal * iva;
    console.log(premioTotal);
    return premioTotal
}

// Función de Pago
function pago() {
    // Se solicita ingreso de cuotas
    let cuotas = parseInt(prompt("El total a pagar es $" + premioTotal + " ¿En cuántas cuotas desea pagar?"));

    // Se calcula el costo financiero, según la cantidad de cuotas elegidas
    let premioTotalFinanciado = 0;

    if (cuotas != 1) {
        for (let i = 1; i <= cuotas; i++) {
            let precioPorCuota = premioTotal / cuotas;
            alert("La cuota " + i + " será de $" + precioPorCuota);
            premioTotal = premioTotal * 1.03;
            premioTotalFinanciado += precioPorCuota;
            console.log(i);
            console.log(precioPorCuota);
            console.log(premioTotalFinanciado);
        }
        alert("El precio final es de $" + premioTotalFinanciado + " a pagar en " + cuotas + " cuotas ¡Muchas gracias!");

    } else {
        alert("El precio final es de $" + premioTotal + " a pagar en 1 cuota ¡Muchas gracias!");
    }
}

// Se define una función para cotizar y pagar, sólo en caso de que los datos obtenidos hayan sido válidos
function quoteAndPay() {
    if (obtenerDatos() == true) {
        premioTotal = calcularPremio();
        console.log(premioTotal);
        console.log(seleccionCob);
        pago();
    } else {
        console.log("No pudo cotizar");
    }    
}

// Se llama a la cotización y pago con el evento Click del botón cotizar
let myForm = document.getElementById("cotizar");
myForm.addEventListener("click", quoteAndPay);






