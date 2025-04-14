
const URL_API_POST = "https://4dki0v452m.execute-api.us-east-2.amazonaws.com/Pruebas/";

function obtenerDatosFormulario() {

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const curp = document.getElementById("curp").value;
    const telefono = document.getElementById("telefono").value;
    const tipoCreditoSigo = document.getElementById("tipo__credito").value;
    const tipoCredito = determinarTipoCredito(tipoCreditoSigo);
    const modalidad = document.getElementById("modalidad").value;
    const modalidadSigo = determinarSubProducto(modalidad);
    const estadoSigo = document.getElementById("estado").value;
    const estado = determinarEstado(estadoSigo);
    const sucursalSigo = document.getElementById("sucursal").value;
    const sucursal = determinarSucursal(sucursalSigo);
    const emailSucursal = determinarEmailSucursal(sucursalSigo);
    const modoContactoSigo = document.getElementById("modo__contacto").value;
    const modoContacto = determinarModoContacto(modoContactoSigo);

    const datosCorreo = {

        nombre: nombre,
        correo: correo,
        curp: curp,
        telefono: telefono,
        tipoCredito: tipoCredito,
        modalidad: modalidad,
        estado: estado,
        sucursal: sucursal,
        emailSucursal: emailSucursal,
        modoContacto: modoContacto
    }
    
    const datosApi = {

        nombre: nombre,
        correo: correo,
        curp: curp,
        telefono: telefono,
        tipoCredito: tipoCreditoSigo,
        modalidad: modalidadSigo,
        estado: estadoSigo,
        sucursal: sucursalSigo,
        modoContacto: modoContactoSigo

    }

    return [datosCorreo, datosApi]
}

async function enviarDatos (datosCorreo,datosApi, URL_API) {

    try {
        const response = await fetch(URL_API, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                datosApi: datosApi,
                datosCorreo: datosCorreo
            }),
        });

        const responseJson = await response.json(); // Convertir la respuesta a JSON
        
        if (responseJson.statusCode == 200){

            alert(responseJson.body)
            btnEnviar = document.getElementById("btn-enviar");
            btnEnviar.disabled = false;
        } else {

            alert(responseJson.body)
            btnEnviar = document.getElementById("btn-enviar");
            btnEnviar.disabled = false;
            
        }
    } catch (error) {
        console.error('Error:', error);
        btnEnviar = document.getElementById("btn-enviar");
        btnEnviar.disabled = false;
    }
}

const formCaptacion = document.getElementById("formulario_captacion");
formCaptacion.addEventListener("submit", function (e) {

    btnEnviar = document.getElementById("btn-enviar");
    btnEnviar.disabled = true;
    e.preventDefault();
    datosObtenidos = obtenerDatosFormulario();
    if (validarDatos(datosObtenidos[1])) {

        enviarDatos(datosObtenidos[0], datosObtenidos[1], URL_API_POST);
        setTimeout(() => {
            limpiarDatos();
        }, 1000); // 1000 ms = 1 segundo
    } else {

        btnEnviar.disabled = false;
    }
});

function validarDatos(datosApi) {

    if (datosApi.tipoCredito == 0) {
        alert("Seleccione un tipo de crédito");
        return false
    } else if (datosApi.modalidad == 0) {

        alert("Seleccione una modalidad")
        return false
    } else if (datosApi.estado == 0) {

        alert("Seleccione un estado")
        return false

    } else if (datosApi.sucursal == 0) {

        alert ("Seleccione una sucursal");
        return false
    } else if (datosApi.modoContacto == 0){

        alert("Seleccione el medio por el cual se enteró")
        return false
    }

    return true

}

function limpiarDatos() {

    const nombre = document.getElementById("nombre");
    nombre.value = "";

    const correo = document.getElementById("correo");
    correo.value = "";

    const curp = document.getElementById("curp");
    curp.value = "";

    const telefono = document.getElementById("telefono");
    telefono.value = "";

    const tipoCredito = document.getElementById("tipo__credito");
    tipoCredito.value = "0";

    const modalidad = document.getElementById("modalidad");
    modalidad.value = "0";

    const estado = document.getElementById("estado");
    estado.value = "0";

    const sucursal = document.getElementById("sucursal");
    sucursal.value = "0";

    const modoContacto = document.getElementById("modo__contacto");
    modoContacto.value = "0";

}

function determinarEmailSucursal(sucursalSigo) {

    const creditoSeleccionado = document.getElementById("tipo__credito").value;

    if (creditoSeleccionado == 3 || creditoSeleccionado == 6) {

        return "hipotecariob@alianzafamiliar.mx"

    } else if (creditoSeleccionado == 4 || creditoSeleccionado == 5) {

        return "construyes@alianzafamiliar.mx"
    }

    if (sucursalSigo == 54){

        return "sfernandez@alianzafamiliar.mx"

    }

    for (const sucursal of window.DATOS_API.sucursales) {

        if (sucursal.SucursalId == sucursalSigo) {

            return sucursal.Email;
        }

        
    }

}

function determinarSucursal(sucursalSigo) {

    for (const sucursal of window.DATOS_API.sucursales) {


        if (sucursal.SucursalId == sucursalSigo) {

            return sucursal.sucursal;
        }
        if (sucursalSigo == 54){

            return "Sucursal México - Matriz"

        }
    }
}

function determinarSubProducto(modalidad) {

    let tipoModalidad;

    switch (modalidad) {

        case "credito Tradicional":
            tipoModalidad = "11";
            break;
        case "credito Conyugal":
            tipoModalidad = "23";
            break;
        case "Credito Infonavit - fovissste individual":
            tipoModalidad = "27";
            break;
        case "credito Mancomunado":
            tipoModalidad = "26";
            break;
        case "credito Pensionados":
            tipoModalidad = "25";
            break;
        case "Credito Infonavit":
            tipoModalidad = "22";
            break;
        case "bancario Tradicional":
            tipoModalidad = "37";
            break;
        case "Hipoteca Liquidez":
            tipoModalidad = "41";
            break;
        case "Remodelacion Vivienda":
            tipoModalidad = "44";
            break;
        case "Mejora de hipoteca":
            tipoModalidad = "42";
            break;
        case "Fovissste para todos":
            tipoModalidad = "40";
            break;
        case "Confinavit":
            tipoModalidad = "38";
            break;
        case "Confinavit Ingresos adicionales":
            tipoModalidad = "39";
            break;
        case "credito Tradicional construyes ctp":
            tipoModalidad = "28";
            break;
        case "credito Mancomunado contruyes ctp":
            tipoModalidad = "29";
            break;
        case "credito Pensionados constryes ctp":
            tipoModalidad = "30";
            break;
        case "credito Tradicional construyes atc":
            tipoModalidad = "34";
            break;
        case "credito Mancomunado construyes atc":
            tipoModalidad = "35";
            break;
        case "credito Pensionados construyes atc":
            tipoModalidad = "32";
            break;
        default:
            tipoModalidad = "0";
    }

    return tipoModalidad;
}

function determinarEstado(estado) {

    let nombreEstado = ""

    switch (estado) {

        case "1":
            nombreEstado = "Aguascalientes";
            break;

        case "2":
            nombreEstado = "Baja California";
            break;

        case "3":
            nombreEstado = "Baja California Sur";
            break;

        case "4":
            nombreEstado = "Campeche";
            break;

        case "5":
            nombreEstado = "Coahuila";
            break;

        case "6":
            nombreEstado = "Colima";
            break;

        case "7":
            nombreEstado = "Chiapas";
            break;

        case "8":
            nombreEstado = "Chihuahua";
            break;

        case "9":
            nombreEstado = "Ciudad de México";
            break;

        case "10":
            nombreEstado = "Durango";
            break;

        case "11":
            nombreEstado = "Guanajuato";
            break;

        case "12":
            nombreEstado = "Guerrero";
            break;

        case "13":
            nombreEstado = "Hidalgo";
            break;

        case "14":
            nombreEstado = "Jalisco";
            break;

        case "15":
            nombreEstado = "Estado de México";
            break;

        case "16":
            nombreEstado = "Michoacan";
            break;

        case "17":
            nombreEstado = "Morelos";
            break;

        case "18":
            nombreEstado = "Nayarit";
            break;

        case "19":
            nombreEstado = "Nuevo León";
            break;

        case "20":
            nombreEstado = "Oaxaca";
            break;

        case "21":
            nombreEstado = "Puebla";
            break;

        case "22":
            nombreEstado = "Queretaro";
            break;

        case "23":
            nombreEstado = "Quintana Roo";
            break;

        case "24":
            nombreEstado = "San Luis Potosí";
            break;

        case "25":
            nombreEstado = "Sinaloa";
            break;

        case "26":
            nombreEstado = "Sonora";
            break;

        case "27":
            nombreEstado = "Tabasco";
            break;

        case "28":
            nombreEstado = "Tamaulipas";
            break;

        case "29":
            nombreEstado = "Tlaxcala";
            break;

        case "30":
            nombreEstado = "Veracruz";
            break;

        case "31":
            nombreEstado = "Yucatan";
            break;

        case "32":
            nombreEstado = "Zacatecas";
            break;

    }

    return nombreEstado
}

function determinarModoContacto(modoContacto) {

    let nombreModoContacto = ""

    switch (modoContacto) {
        case "1":
            nombreModoContacto = "Llamada Telefónica";
            break;

        case "2":
            nombreModoContacto = "Facebook";
            break;

        case "3":
            nombreModoContacto = "Twitter";
            break;

        case "4":
            nombreModoContacto = "Pagina web";
            break;

        case "5":
            nombreModoContacto = "Referencia";
            break;

        case "6":
            nombreModoContacto = "Publicidad/Papel";
            break;

        case "7":
            nombreModoContacto = "Whatsapp";
            break;

        case "8":
            nombreModoContacto = "Correo Masivo";
            break;

        case "9":
            nombreModoContacto = "Constructor";
            break;

        case "10":
            nombreModoContacto = "Inmobiliaría";
            break;
    }

    return nombreModoContacto;
}

function determinarTipoCredito(tipoCredito) {

    let nombreCredito = ""
    switch (tipoCredito) {

        case "2":
            nombreCredito = "Fovissste - Adquisión";
            break;

        case "3":
            nombreCredito = "Infonavit";
            break;

        case "4":
            nombreCredito = "Fovissste - Construyes - ctp";
            break;

        case "5":
            nombreCredito = "Fovissste - AT + C";
            break;

        case "6":
            nombreCredito = "Bancos";
            break;
    }
    return nombreCredito
}

