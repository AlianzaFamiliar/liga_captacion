const creditos = {

    2: `

        <option value="credito Tradicional">Crédito Tradicional</option>
        <option value="credito Conyugal">Crédito Conyugal</option>
        <option value="credito Mancomunado">Crédito Mancomunado</option>
        <option value="credito Pensionados">Crédito Pensionados</option>
        <option value="Credito Infonavit - fovissste individual">Fovissste - Infonavit Individual</option>    

    `,
    3: `
    
        <option value="Credito Infonavit">Credito Infonavit</option>
        <option value="Apoyo infonavit">Apoyo infonavit</option>
        <option value="Unamos credito">Unamos credito</option>
    
    `,
    4: `

    <option value="credito Tradicional construyes ctp">Crédito Tradicional</option>
    <option value="credito Mancomunado contruyes ctp">Crédito Mancomunado</option>
    <option value="credito Pensionados constryes ctp">Crédito Pensionados</option>    

    `,
    5: `

    <option value="credito Tradicional construyes atc">Crédito Tradicional</option>
    <option value="credito Mancomunado construyes atc">Crédito Mancomunado</option>
    <option value="credito Pensionados construyes atc">Crédito Pensionados</option>    

    `,

    6: `
    
        <option value="bancario Tradicional">Bancario Tradicional</option>
        <option value="Hipoteca Liquidez">Hipoteca Liquidez</option>
        <option value="Remodelacion Vivienda">Remodelacion vivienda</option>
        <option value="Mejora de hipoteca">Mejora de hipoteca</option>
        <option value="Fovissste para todos">Fovissste para todos</option>    
        <option value="Confinavit">Confinavit</option>
        <option value="Confinavit Ingresos adicionales">Confinavit Ingresos adicionales</option>

    `,

}

function mostrarModalidad(tipoCredito) {

    let creditoSeleccionado = tipoCredito.value;
    let modalidades = creditos[creditoSeleccionado];

    selectModalidades = document.getElementById("modalidad");
    selectModalidades.innerHTML = modalidades;

}