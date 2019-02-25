/* global urlBase, alertify */

var MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
var ID_LIQUIDACION;
var PAGINA = "LIQUIDACION";
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    getMeses();
    getAnio();
    buscarConductor();
    
    $("#exportar").click(function(){
        if(typeof ID_LIQUIDACION === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
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
            var titulo = recortar(id+" / "+nombre+" "+papellido+" "+ mapellido);            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"generarLiquidacion('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"generarLiquidacion('"+id+"')\">"+ titulo +"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function generarLiquidacion(id)
{
    ID_LIQUIDACION = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    $(".contenedor_liquidacion").html("");
    var url = urlBase + "/liquidacion/GenerarLiquidacion.php";
    var params = {id : id};
    var success = function(response)
    {
        $(".contenedor_liquidacion").load("html/datos_liquidacion.html", function( response, status, xhr ) {
            $("#subtitulo_liquidacion").text("Periodo: "+MESES[$("#mes").val()] + " " + $("#anio").val());
            $("#nombre_conductor").html("<b>Nombre:</b> nombre");
            $("#rut_conductor").html("<b>Rut:</b> rut");
        });
    };
    postRequest(url,params,success);
}
function getMeses()
{
    var mes = new Date().getMonth()-1;
    if(mes === '0')
    {
        mes = '11';
    }
    $("#mes").val(mes);
}
function getAnio()
{
    var anio = new Date().getFullYear();
    $("#anio").val(anio);
}