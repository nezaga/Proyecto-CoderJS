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

//Bienvenida y preguntas iniciales
function obtenerDatos () {
edad = prompt("Comencemos ¿Qué edad tenés?");
quiereCobAccidente =  prompt("¿Desea tener cobertura por accidente? Ingrese S o N").toUpperCase();
quiereCobVida = prompt("¿Desea tener cobertura por seguro de vida? Ingrese S o N").toUpperCase();
quiereCobSalud = prompt("¿Desea tener cobertura de medicina prepaga? Ingrese S o N").toUpperCase();
}

alert("Bienvenido al simulador para cotizar tu seguro, pulsa 'aceptar' para iniciar tu cotización");
obtenerDatos();

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

cob_accidente = stringABool(quiereCobAccidente, cob_accidente);
cob_vida = stringABool(quiereCobVida, cob_vida);
cob_salud = stringABool(quiereCobSalud, cob_salud);

// Validamos edad y determinamos la tasa
if (edad < 18) {
    alert("No tenés edad para contratar un seguro, lo sentimos.");
} else if ((edad >= 18 ) && (edad < 45)) {
    tasa = 0.02;
} else if ((edad >= 45 ) && (edad <= 65)) {
    tasa = 0.035;
} else {
    alert("Superaste la edad de asegurabilidad, lo sentimos.");
}

console.log(edad);
console.log(cob_accidente);
console.log(cob_vida);
console.log(cob_salud);
console.log(tasa);

// Proceso de cotización
function calcularPremio(cobertura, suma, tasa) {
    if (cobertura == true) {
        let prima = suma * tasa;
        return total = prima + prima * iva; 
    } else {
        return total = 0;
    }
}

let totAccidente = calcularPremio(cob_accidente, sumaAccidente, tasa);
let totVida = calcularPremio(cob_vida, sumaVida, tasa);
let totSalud = calcularPremio(cob_salud, sumaSalud, tasa);
let premioTotal = totAccidente + totVida + totSalud;

console.log(totAccidente);
console.log(totVida);
console.log(totSalud);
console.log(premioTotal);

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

