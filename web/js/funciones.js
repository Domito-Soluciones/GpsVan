
var bordeAzul = "solid 1px #0b41d3";
var bordeRojo = "solid 1px red";
var bordeBlanco = "solid 1px white";



function darFoco(elemento)
{
    elemento.focus();
}
function cambiarPropiedad(elemento,propiedad,valor)
{
    elemento.css(propiedad,valor);
}
function isTeclaEnter(e){
    if(e.which === 13){
        return true;
    }
    return false;
}

function postRequest(url,success)
{
    $.ajax({
        url: url,
        method:'POST',
        beforeSend: function (xhr) {
            cambiarPropiedad($("#loader"),"visibility","visible");
        },
        success: success,
        error: function (resposeError)
        {
            $("#error").text(resposeError);
            cambiarPropiedad($("#loader"),"visibility","hidden");
        }
    });
}
function getRequest(url,success)
{
    $.ajax({
        url: url,
        method:'GET',
        success: success,
        beforeSend: function (xhr) {
            cambiarPropiedad($("#loader"),"visibility","visible");
        },
        error: function (resposeError)
        {
            $("#error").text(resposeError);
            cambiarPropiedad($("#loader"),"visibility","hidden");
        }
    });
}
function redireccionar(url)
{
    window.location.href = url;
}

function addTexto(div,texto)
{
    div.text(texto);
}

function validarCamposOr(array)
{
    for (var i = 0 ; i < array.length; i++)
    {
        if(array[i] === undefined || array[i] === '')
        {
            return false;
        }
    }
    return true;
}
function validarCamposAnd(array)
{
    var cont = 0;
    for (var i = 0 ; i < array.length; i++)
    {
        if(array[i] === undefined || array[i] === '')
        {
            cont++;
        }
    }
    if(cont == array.length)
    {
        return false;
    }
    return true;
}

function agregarclase(div,clase)
{
    div.addClass(clase);
}
function quitarclase(div,clase)
{
    div.removeClass(clase);
}

function cambiarModulo(pagina)
{
    redireccionar(pagina+".php");
}

function cerrarSession(response)
{
    if(response === 'return')
    {
        alertify.error('sesion expirada');
        location.href = "../web/index.php";
        return;
    }
}

function vaciarFormulario(div)
{
    div.each(function() {
        $(this).val("");
    });
}

function formato_fecha(texto){
  return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
}

