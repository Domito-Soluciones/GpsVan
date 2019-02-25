/* global urlBase, alertify */

$(document).ready(function(){
    $("#buscar").click(function(){
        var op = $("#tipo").val();
        if(op !== '')
        {
            if(op === '0')
            {
                buscarConductor();
            }
            else if(op === '1')
            {
                buscarCliente();
            }
        }
        else
        {
            alertify.error("Ingrese el tipo de busqueda");
        }
    });
});

function buscarConductor()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        cerrarSession(response);
        var conductores = $("#lista_busqueda_contrato");
        conductores.html("");
        CONDUCTORES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].conductor_id;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var mapellido = response[i].conductor_mapellido;
            var contrato = response[i].conductor_contrato;
            var titulo = recortar(id+" / "+nombre+" "+papellido+" "+ mapellido);            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"mostrarContrato('"+id+"','"+contrato+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"mostrarContrato('"+id+"','"+contrato+"')\">"+ titulo +"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success,false);
}

function buscarCliente()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
        var success = function(response)
    {
        cerrarSession(response);
        var conductores = $("#lista_busqueda_contrato");
        conductores.html("");
        CONDUCTORES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            var contrato = response[i].cliente_contrato;
            var titulo = recortar(id+" / "+nombre);            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"mostrarContrato('"+id+"','"+contrato+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"mostrarContrato('"+id+"','"+contrato+"')\">"+ titulo +"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success,false);
}

function mostrarContrato(id,contrato)
{
    if(contrato === '')
    {
        cambiarPropiedad($(".mensaje_bienvenida"),"display","block");
        var visor = "";
        $(".contenedor_contrato").html(visor);
        alertify.error("Conductor no tiene contrato adjunto");
        return;
    }
    ID_CONDUCTOR = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    var visor = "<object class=\"visor_pdf\" data=\"source/util/pdf/"+contrato+"\" type=\"application/pdf\"></object>";
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    $(".contenedor_contrato").html("");
    $(".contenedor_contrato").append(visor);
}