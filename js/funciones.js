
var bordeAzul = "solid 1px #0b41d3";
var bordeRojo = "solid 1px red";
var bordeBlanco = "solid 1px white";
var urlBase= "source/httprequest";


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
        cache: false,
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
function agregarclase(div,clase)
{
    div.removeClass(clase);
}

function cambiarModulo(pagina)
{
    $("#contenido-central").load(pagina+".html");
    agregarclase($("#"+pagina),"menu-activo");
}

function cerrarSession(response)
{
    if(response === 'return')
    {
        alertify.error('sesion expirada');
        location.href = "index.php";
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
function formato_humano(texto){
  return texto.replace(/^(\d{2}-(\d{2})-(\d{4}))$/g,'$1/$2/$3');
}

function getfecha()
{
    var date = new Date();
    var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
    var monthIndex = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    
    return day+"/"+(monthIndex+1)+"/"+year + " " + hour + ":" +minute;
}

function mensajeBienvenida(mensaje)
{
    $("#contenedor_central").html("<div class=\"mensaje_bienvenida\">\n\
    SELECCIONE OPCIONES PARA AGREGAR EDITAR Y/O MODIFICAR "+mensaje+"</div>");
}

function resetFormulario(pagina) 
{
    $("#contenedor_central").html("");
    mensajeBienvenida(pagina+"</div>");
}

function abrirFile(e,obj){
    e.preventDefault();
    obj.trigger("click");
}

function subirFichero(event,form,url,success)
{
    $.ajax({
        async: true,
        type: 'POST',
        url: url,
        data: new FormData(form[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: success
    });
    event.preventDefault();
}

function enviarFormFile(file,hidden,form)
{   
    var filename = file.replace(/.*(\/|\\)/, '');
    hidden.val(filename);
    form.submit();
}

function iniciarFecha(inputs) {
    jQuery.datetimepicker.setLocale('es');
    var conf = {
        i18n:{
            de:{
                months:[
                    'Januar','Februar','März','April',
                    'Mai','Juni','Juli','August',
                    'September','Oktober','November','Dezember'
                ],
                dayOfWeek:[
                    "So.", "Mo", "Di", "Mi", 
                    "Do", "Fr", "Sa."
                ]
            }
        },
        timepicker:false,
        format:'d-m-Y'
    };
    for(var i = 0 ; i < inputs.length; i++)
    {
        jQuery(inputs[i]).datetimepicker(conf);    
    }
}

function validarRut(rut)
{
    var tmpstr = "";
    var intlargo = rut
    if (intlargo.length> 0)
    {
        largo = rut.length;
        if ( largo <2 )
        {
            return false;
        }
        for ( i=0; i <rut.length ; i++ )
        var crut = rut;
        if ( crut.charAt(i) != ' ' && crut.charAt(i) != '.' && crut.charAt(i) != '-' )
        {
                tmpstr = tmpstr + crut.charAt(i);
        }
        rut = tmpstr;
        crut=tmpstr;
        largo = crut.length; 
        if ( largo> 2 )
                rut = crut.substring(0, largo - 1);
        else
                rut = crut.charAt(0);
        dv = crut.charAt(largo-1);
        if ( rut == null || dv == null )
        return 0;
        var dvr = '0';
        suma = 0;
        mul  = 2;
        for (i= rut.length-1 ; i>= 0; i--)
        {
            suma = suma + rut.charAt(i) * mul;
            if (mul == 7)
                mul = 2;
            else
                mul++;
        } 
        res = suma % 11;
        if (res==1)
                dvr = 'k';
        else if (res==0)
                dvr = '0';
        else
        {
                dvi = 11-res;
                dvr = dvi + "";
        }
        if ( dvr != dv.toLowerCase() )
        {
                return false;
        }
        return true;
    }

}
function validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
   return true;
  } else {
   return false;
  }
}