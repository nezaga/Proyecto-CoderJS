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

//Definimos un array vacío, para guardar la selección del usuario
var seleccionCob = [];

// Llamamos la función para renderizar el front. Coberturas y LocalStorage.
fetchCoberturas();

// Escuchamos los cambios en la edad y validamos si puede cotizar o no
inputEdad.onchange = () => {
    edad = inputEdad.value;
    validarEdadYObtenerTasa(edad);
};

// Se llama a la cotización y pago ante cualquier cambio que suceda en el Form
var form = document.querySelector('form');
form.addEventListener('change', quoteAndPay);

