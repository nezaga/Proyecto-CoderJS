//Inicializamos las variables para cotizar
let edad = 18;
let cob_accidente = false;
let cob_vida = false;
let cob_salud = false;
let tasa;
let iva = 0.21;
let quiereCobAccidente;
let quiereCobVida;
let quiereCobSalud;
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
    quiereCobAccidente = prompt("¿Desea tener cobertura por accidente? Ingrese S o N").toUpperCase();
    cob_accidente = stringABool(quiereCobAccidente, cob_accidente);
    if (cob_accidente == true) {
        const cobertura = new Cobertura("Accidente", sumaAccidente);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
        alert("Cobertura seleccionada correctamente");
    } else {
        alert("Cobertura no seleccionada");
    }
}

function elegirCobVida(seleccionCob) {
    quiereCobVida = prompt("¿Desea tener cobertura por seguro de vida? Ingrese S o N").toUpperCase();
    cob_vida = stringABool(quiereCobVida, cob_vida);
    if (cob_vida == true) {
        const cobertura = new Cobertura("Vida", sumaVida);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
        alert("Cobertura seleccionada correctamente");
    } else {
        alert("Cobertura no seleccionada");
    }
}

function elegirCobSalud(seleccionCob) {
    quiereCobSalud = prompt("¿Desea tener cobertura de medicina prepaga? Ingrese S o N").toUpperCase();
    cob_salud = stringABool(quiereCobSalud, cob_salud);
    if (cob_salud == true) {
        const cobertura = new Cobertura("Salud", sumaSalud);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
        alert("Cobertura seleccionada correctamente");
    } else {
        alert("Cobertura no seleccionada");
    }
}

//Definimos un array vacío, para guardar la selección del usuario
const seleccionCob = [];

//Bienvenida y preguntas iniciales
function obtenerDatos() {
    edad = prompt("Comencemos ¿Qué edad tenés?");
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

alert("Bienvenido al simulador para cotizar tu seguro, pulsa 'aceptar' para iniciar tu cotización");
//obtenerDatos();

//Traducimos los datos ingresados a inputs para cotizar
function stringABool(par1, par2) {
    if (!(par1 == "S")) {
        par2 = false;
    } else {
        par2 = true;
    }
    console.log(par1 + " " + par2);
    return par2;
}

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
    return premioTotal = primaTotal + primaTotal * iva;
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


// Se llama a las funciones de cotización y pago, sólo en caso de que los datos obtenidos hayan sido válidos
if (obtenerDatos() == true) {
    premioTotal = calcularPremio();
    console.log(premioTotal);
    pago();
} else {
    console.log("No pudo cotizar");
}