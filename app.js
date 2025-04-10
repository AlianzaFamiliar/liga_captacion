
async function obtenerDatos(URL_API) {

    const response = await fetch(URL_API);
    const data = await response.json();

    mostrarEstados(data.body);
    mostrarTiposContacto(data.body);

    return (data.body)

}

function mostrarEstados(body) {

    const estados = document.getElementById("estado");

    for (const estado of body.estados) {
        
        estados.innerHTML += `<option value = "${estado.EstadoId}">${estado.Estado}</option>`
    }
}


function mostrarSucursales() {

    const sucursal = document.getElementById("sucursal");
    const estadoElegido = document.getElementById("estado").value;
    const tipoCredito = document.getElementById("tipo__credito").value;
    let contadorSucursales = 0;
    sucursal.innerHTML = `<option value="0" selected disabled>Seleccione una opción</option>`;

    if (estadoElegido == 9 || estadoElegido == 15 ) {
    
        sucursal.innerHTML += `<option value = "54">Sucursal Mexico - Matriz</option>`
        contadorSucursales = contadorSucursales + 1;
    }

    

    if (tipoCredito == 3 || tipoCredito == 6) {

        if (contadorSucursales == 0) {

            sucursal.innerHTML += `<option value = "54">Sucursal Mexico - Matriz</option>`
        
        }
        
    } else {

        for (const optionesSucursal of window.DATOS_API.sucursales.filter(item => item.sucursal.includes("Sucursal"))) {

            if (estadoElegido == optionesSucursal.EstadoId){

                if (estadoElegido == 9 && (optionesSucursal.sucursal == "Sucursal Tlanepantla" || optionesSucursal.sucursal == "Sucursal Toluca")){


                } else if (estadoElegido == 15 && (optionesSucursal.sucursal == "Sucursal Iztapalapa" || optionesSucursal.sucursal == "Sucursal Gustavo A. Madero")) {


                } else {

                    sucursal.innerHTML += `<option value = "${optionesSucursal.SucursalId}">${optionesSucursal.sucursal}</option>`
                    contadorSucursales ++;

                }
        
                    
                    
            }
        }
    
        if (contadorSucursales == 0) {
    
            sucursal.innerHTML += `<option value = "54">Sucursal Mexico - Matriz</option>`
    
        }

    }
}

function mostrarTiposContacto(body) {

    const modoContacto = document.getElementById("modo__contacto");

    for (const modoContactoOption of body.tipos_contacto) {

        modoContacto.innerHTML += `<option value = "${modoContactoOption.ContactoTipoId}">${modoContactoOption.ContactoTipo}</option>`
        
    }

}

const URL_API = "https://4dki0v452m.execute-api.us-east-2.amazonaws.com/Pruebas"
let DATOS_API = obtenerDatos(URL_API).then(body => window.DATOS_API = body);
