var PAGINA = 'CONFIGURACION';
var CAMPOS = ["valor_uf","porcentaje_afp","porcentaje_isapre","porcentaje_mutual"];

$(document).ready(function(){
    obtenerConfiguracion();
    cambioEjecutado();
    PAGINA_ANTERIOR = PAGINA;
    $("#guardar").click(function(){
        modificarConfiguracion();
    });
    
});


function obtenerConfiguracion()
{
    var params = {};
    var url = urlBase + "/configuracion/GetConfiguracion.php";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length;i++)
        {
            var dato = response[i].configuracion_dato;
            var valor = formatoMoneda(response[i].configuracion_valor);
            if(dato === 'valor_uf')
            {
                $("#valor_uf").val(valor);
            }
            else if(dato === 'porcentaje_afp')
            {
                $("#porcentaje_afp").val(valor);
            }
            else if(dato === 'porcentaje_isapre')
            {
                $("#porcentaje_isapre").val(valor);
            }
            else if(dato === 'porcentaje_mutual')
            {
                $("#porcentaje_mutual").val(valor);
            }
        }
    };
    postRequest(url,params,success);
}

function modificarConfiguracion()
{
    var uf = $("#valor_uf").val();
    var afp = $("#porcentaje_afp").val();
    var isapre = $("#porcentaje_isapre").val();
    var mutual = $("#porcentaje_mutual").val();
    var params = {uf : uf,afp: afp, isapre : isapre, mutual : mutual};
    var array = [uf,afp,isapre,mutual];  
    if(!validarNumero(uf)){
        alertify.error("Valor UF debe ser numérico");
        return;
    }
    if(!validarNumero(afp)){
        alertify.error("Descuento AFP debe ser numérico");
        return;
    }
    if(!validarNumero(isapre)){
        alertify.error("Descuento Isapre debe ser numérico");
        return;
    }
    if(!validarNumero(mutual)){
        alertify.error("Descuento Mutual debe ser numérico");
        return;
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var url = urlBase + "/configuracion/ModConfiguracion.php";
        var success = function(response)
        {
            cerrarSession(response);
            MODIFICADO = false;
            alertify.success("Configuración Guardada");
        };
        postRequest(url,params,success);
    }
}

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var uf = $("#valor_uf");
    var afp = $("#porcentaje_afp");
    var isapre = $("#porcentaje_isapre");
    var mutual = $("#porcentaje_mutual");
    if(!validarNumero(uf.val()))
    {
        marcarCampoError(uf);
        alertify.error('UF debe ser numérico');
        return false;
    }
    if(!validarNumero(afp.val()))
    {
        marcarCampoError(afp);
        alertify.error('AFP debe ser numérico');
        return false;
    }
    if(!validarNumero(isapre.val()))
    {
        marcarCampoError(isapre);
        alertify.error('Isapre debe ser numérico');
        return false;
    }
    if(!validarNumero(mutual.val()))
    {
        marcarCampoError(mutual);
        alertify.error('Mutual debe ser numérico');
        return false;
    }
    
    return true;
}

function activarPestania(array)
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
}