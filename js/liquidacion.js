/* global urlBase, alertify, ID_CONDUCTOR */

var MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"

];
var ID_LIQUIDACION;
var MES;
var ANIO;
var RUT;
var NOMBRE;
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
        else
        {
            var params = "mes="+MES+"&anio="+ANIO+"&conductor="+ID_LIQUIDACION+"&rut="+RUT+"&nombre="+NOMBRE;
            exportar('liquidacion/GetExcelLiquidacion',params);
        }
    });
    $("#exportar2").click(function(){
        if(typeof ID_LIQUIDACION === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
        }
        else
        {
            var params = "mes="+MES+"&anio="+ANIO+"&conductor="+ID_LIQUIDACION+"&rut="+RUT+"&nombre="+NOMBRE;
            window.open(urlBase+"/liquidacion/GetPdfLiquidacion.php?"+params, '_blank');
        }
    });
    
    $("#busqueda").keyup(function(){
        buscarConductor();
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
            var rut = response[i].conductor_rut;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var mapellido = response[i].conductor_mapellido;
            var titulo = recortar(id+" / "+nombre+" "+papellido+" "+ mapellido);            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"generarLiquidacion('"+id+"','"+rut+"','"+nombre+" "+papellido+" "+ mapellido+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"generarLiquidacion('"+id+"','"+rut+"','"+nombre+" "+papellido+" "+ mapellido+"')\">"+ titulo +"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function generarLiquidacion(id,rut,nombre)
{
    ID_LIQUIDACION = id;
    RUT = rut;
    NOMBRE = nombre;
    MES = $("#mes").val();
    ANIO =$("#anio").val();
    var d = new Date();
//    if (ANIO > d.getFullYear())
//    {
//        alertify.error("La liquidación no esta lista");
//        return;
//    }
//    if(parseInt(MES) >= (d.getMonth()))
//    {
//        alertify.error("La liquidación no esta lista");
//        return;
//    }
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    $(".contenedor_liquidacion").html("");
    var params = {conductor:id,mes:MES,anio:ANIO};
    var url = urlBase + "/liquidacion/GetLiquidacion.php";
    var success = function(responseLiquidacion)
    {
        quitarclase($("#exportar"),"oculto");
        $(".contenedor_liquidacion").load("html/datos_liquidacion.html", function( response, status, xhr ) {
            $("#subtitulo_liquidacion").text("Periodo: "+MESES[MES] + " " + ANIO);
            $("#nombre_conductor").html("<b>Nombre:</b> "+nombre);
            $("#rut_conductor").html("<b>Rut:</b> "+rut);
            var cont = $("#contenido_tabla_liq_prod");
            var cont2 = $("#contenido_tabla_liq_desc");
            var cont3 = $("#contenido_tabla_liq_rend");
            var totalBruto = responseLiquidacion[0].liquidacion_produccion_bruta===''?'0':responseLiquidacion[0].liquidacion_produccion_bruta;
            var participacion = responseLiquidacion[0].liquidacion_participacion===''?'0':responseLiquidacion[0].liquidacion_participacion;
            var totalLiquido = responseLiquidacion[0].liquidacion_produccion_liquida===''?'0':responseLiquidacion[0].liquidacion_produccion_liquida;
            var totalDesc = responseLiquidacion[0].liquidacion_total_descuentos===''?'0':responseLiquidacion[0].liquidacion_total_descuentos;
            var totalRend = responseLiquidacion[0].liquidacion_total_rendicion===''?'0':responseLiquidacion[0].liquidacion_total_rendicion;
            var total = responseLiquidacion[0].liquidacion_liquido_pagar===''?'0':responseLiquidacion[0].liquidacion_liquido_pagar;
            for(var i = 0 ; i < responseLiquidacion[0].liquidacion_produccion.length;i++)
            {
                var produccion = responseLiquidacion[0].liquidacion_produccion[i];
                cont.append("<div class=\"liquidacion_item\">"+produccion.detalle_item + "</div>"+
                            "<div class=\"liquidacion_valor\">$  "+produccion.detalle_valor+"</div>");
            }
            $("#prod_bruta").html("$  "+totalBruto);
            $("#participacion").html(participacion+" %");
            $("#prod_liquida").html("$  "+totalLiquido);
            if(responseLiquidacion[0].liquidacion_produccion.length > 0)
            {
                var descuento = responseLiquidacion[0].liquidacion_descuento;
                cont2.append("<div class=\"liquidacion_item\">Pagos Previsionales</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[0].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro Obligatorio</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[1].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro RC+DM</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[2].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro Asientos</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[3].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro RC Exceso</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[4].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">GPS</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[5].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Celular</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[6].detalle_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">APP</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuento[7].detalle_valor+"</div>");
                for(var k = 0; k < responseLiquidacion[0].liquidacion_descuento.length;k++)
                {
                    if(k > 7){
                        var desc =  responseLiquidacion[0].liquidacion_descuento[k];
                        cont2.append("<div class=\"liquidacion_item\">"+desc.detalle_item+"</div>"+
                                "<div class=\"liquidacion_valor\">$  "+desc.detalle_valor+"</div>");
                    }
                }
                $("#total_desc").html("$  "+totalDesc);
               
                for(var l = 0; l < responseLiquidacion[0].liquidacion_rendicion.length;l++)
                {
                    var rend =  responseLiquidacion[0].liquidacion_rendicion[l];
                    cont3.append("<div class=\"liquidacion_item\">"+rend.detalle_item+"</div>"+
                            "<div class=\"liquidacion_valor\">$  "+rend.detalle_valor+"</div>");
                }
                $("#total_rend").html("$  "+totalRend);
            }
            $("#liq_pagar").html("$  "+total);
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