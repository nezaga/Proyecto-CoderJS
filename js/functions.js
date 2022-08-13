// Definimos función para renderizar coberturas en el front. Obtenidas desde el archivo coberturas.json. Se obtienen los datos de la Local Storage únicamente después que se ejecute el fetch.
function fetchCoberturas() {
    fetch('data/coberturas.json')
        .then((res) => res.json())
        .then((data) => {
            let resultado = document.getElementById("coberturas");
            let contenido = "";

            data.forEach(cobertura => {
                contenido += 
                `<div class="form-check form-switch col-sm-12">
                    <input class="form-check-input" type="checkbox" role="switch" id=${cobertura.check_id}>
                    <label class="form-check-label" for=${cobertura.check_id}>${cobertura.nombre}</label>
                    <input type="range" min=${cobertura.range_min} max=${cobertura.range_max} step=${cobertura.range_step} class="slider col-sm-12"
                    id=${cobertura.range_id}>
                </div>`;
            })    
            
            resultado.innerHTML = contenido;
        })
        .then(() => {
            if (localStorage.length > 0) {
                document.getElementById("cob_accidente").checked = cob_accidente;
                document.getElementById("cob_vida").checked = cob_vida;
                document.getElementById("cob_salud").checked = cob_salud;
            }            
        });
}

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
    function addCobertura() {
        const cobertura = new Cobertura("Accidente", document.getElementById("suma_accidente").value);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
    }
    cob_accidente = document.getElementById("cob_accidente").checked;
    cob_accidente == true && addCobertura();
    saveUserSelection("storageAccidente", cob_accidente);
}

function elegirCobVida(seleccionCob) {
    function addCobertura() {
        const cobertura = new Cobertura("Vida", document.getElementById("suma_vida").value);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
    }
    cob_vida = document.getElementById("cob_vida").checked;
    cob_vida == true && addCobertura();
    saveUserSelection("storageVida", cob_vida);
}

function elegirCobSalud(seleccionCob) {
    function addCobertura() {
        const cobertura = new Cobertura("Salud", document.getElementById("suma_salud").value);
        cobertura.calcularPrima(tasa);
        seleccionCob.push(cobertura);
    }
    cob_salud = document.getElementById("cob_salud").checked;
    cob_salud == true && addCobertura();
    saveUserSelection("storageSalud", cob_salud);
}

// Función para obtener los datos ingresados en el front
function obtenerDatos() {
    seleccionCob = [];
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

// Función de redondeo de prima
function redondeoPrima(array, cobertura) {
    var objeto = array.find((el) => el.nombre === cobertura);
    if (typeof objeto !== 'undefined') {
        return objeto.prima.toFixed(2);
    } else {
        return 0;
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
        document.getElementById("premioAccidente").innerText = redondeoPrima(seleccionCob, "Accidente");
        document.getElementById("premioVida").innerText = redondeoPrima(seleccionCob, "Vida");
        document.getElementById("premioSalud").innerText = redondeoPrima(seleccionCob, "Salud");
    } else {
        premioTotal = 0
        document.getElementById("premioTotal").innerText = premioTotal;
    }
    console.log(seleccionCob)
}

// Función para mostrar alert de error
function showError(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
})};

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
            premioTotal = premioTotal * tem;
            premioTotalFinanciado += precioPorCuota;
        }
        return premioTotal.toFixed(2);
    } else {
        return premioTotal.toFixed(2);
    }
}

