/* global urlBase, alertify */
var ID_CONDUCTOR;
var CONDUCTORES;
var MOVILES;
var MOVILES_OCUPADOS = [];
var AGREGAR = true;
var PAGINA = 'CONDUCTORES';
var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","mail","nacimiento","tipoLicencia",
                "renta","tipoContrato","afp","isapre","mutual","seguroInicio","seguroRenovacion",
                "nick","password","password2"];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarConductor();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        buscarMovil('');
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_conductor.html", function( response, status, xhr ) {
            iniciarPestanias();
            cambioEjecutado();
            iniciarFecha(['#nacimiento','#seguroInicio','#seguroRenovacion']);
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
                    $("#rut").val("");
                    return;
                }
            });

            $("#nick").blur(function (){
                if(validarExistencia('nick',$(this).val()))
                {
                    alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                    $("#nick").val("");
                    return;
                }
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });
    
    $("#cancelar").click(function(){
        validarCancelar();
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarConductor();
        }
        else
        {
            modificarConductor();
        }
    });
    $("#busqueda").keyup(function(){
        buscarConductor($(this).val());
    });
    
    $("#eliminar").click(function (){
        confirmar("Eliminar conductor","Esta seguro que desea eliminar al conductor "+$("#rut").val(),
        function(){
                eliminarConductor();
            },null);
    });
});

function agregarConductor()
{
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var mail = $("#mail").val();
    var nacimiento = formato_fecha($("#nacimiento").val());
    var renta = $("#renta").val();
    var contrato = $("#tipoContrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var mutual = $("#mutual").val();
    var seguroInicio = formato_fecha($("#seguroInicio").val());
    var seguroRenovacion = formato_fecha($("#seguroRenovacion").val());
    var descuento = $("#descuento").val() === '' ? '0' : $("#descuento").val();
    var anticipo = $("#anticipo").val() === '' ? '0' : $("#anticipo").val();
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var tipoLicencia = $("#tipoLicencia").val();
    var patente = $("#moviles").val();
    var array = [rut,nombre,papellido,mapellido,celular,direccion,mail,nacimiento,tipoLicencia,
                renta,contrato,afp,isapre,mutual,seguroInicio,seguroRenovacion,
                nick,password,password2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(password !== password2)
    {
        marcarCampoError($("#password"));
        marcarCampoError($("#password2"));
        alertify.error("La password no coincide");
        return;
    }
    if(validarTipoDato())
    {
        var imagen = $("#imagenOculta").val();
        var archivoContrato = $("#contratoOculta").val();
        var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
        +"&rut="+rut+"&nick="+nick+"&password="+password+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
        +"&mail="+mail+"&tipoLicencia="+tipoLicencia+"&nacimiento="+nacimiento
        +"&renta="+renta+"&contrato="+contrato+"&afp="+afp+"&isapre="+isapre
        +"&mutual="+mutual+"&seguroInicio="+seguroInicio+"&seguroRenovacion="+seguroRenovacion
        +"&descuento="+descuento+"&anticipo="+anticipo+"&imagen="+imagen+"&archivoContrato="+archivoContrato+"&patente="+patente;
        var url = urlBase + "/conductor/AddConductor.php?"+data;
        var success = function(response)
        {
            ID_CONDUCTOR = undefined;
            if(patente !== '')
            {
                MOVILES_OCUPADOS.push(patente);
            }
            cerrarSession(response);
            alertify.success("Conductor Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarConductor();
            cambiarPropiedad($(".imagen"),"background-image","url('img/usuario-hombre.svg')");
        };
        postRequest(url,success);
    }
}

function modificarConductor()
{
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var mail = $("#mail").val();
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var tipoLicencia = $("#tipoLicencia").val();
    var nacimiento = $("#nacimiento").val();
    var renta = $("#renta").val();
    var contrato = $("#tipoContrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var mutual = $("#mutual").val();
    var seguroInicio = $("#seguroInicio").val();
    var seguroRenovacion = $("#seguroRenovacion").val();
    var descuento = $("#descuento").val();
    var anticipo = $("#anticipo").val();
    var patente = $("#moviles").val();
    var array;
    var claveData = '';
    if(password !== '' || password2 !== '')
    {
        if(password !== password2)
        {
            alertify.error("La password no coincide");
            marcarCampoError(password);
            marcarCampoError(password2)
            return;
        }
        array = [rut,nombre,papellido,mapellido,celular,direccion,mail,
        tipoLicencia,nacimiento,renta,contrato,afp,isapre,mutual,seguroInicio,
        seguroRenovacion,nick,password,password2];
        claveData = "&password="+password;
    }
    else
    {
        array = [rut,nombre,papellido,mapellido,celular,direccion,mail,
        tipoLicencia,nacimiento,renta,contrato,afp,isapre,mutual,seguroInicio,
        seguroRenovacion,nick];   
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var imagen = $("#imagenOculta").val();
        var archivoContrato = $("#contratoOculta").val();
        var data = "id="+ID_CONDUCTOR+"&nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
        +"&rut="+rut+"&nick="+nick+claveData+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
        +"&mail="+mail+"&tipoLicencia="+tipoLicencia+"&nacimiento="+nacimiento
        +"&renta="+renta+"&contrato="+contrato+"&afp="+afp+"&isapre="+isapre
        +"&mutual="+mutual+"&seguroInicio="+seguroInicio+"&seguroRenovacion="+seguroRenovacion
        +"&descuento="+descuento+"&anticipo="+anticipo+"&imagen="+imagen+"&archivoContrato="+archivoContrato+"&patente="+patente;
        var url = urlBase + "/conductor/ModConductor.php?"+data;
        var success = function(response)
        {
            MOVILES_OCUPADOS.push(patente);
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Conductor Modificado");
            resetFormulario();
            buscarConductor();
        };
        postRequest(url,success);
    }
}

function buscarConductor()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/conductor/GetConductores.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var conductores = $("#lista_busqueda");
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
            var titulo = recortar(rut+" / "+nombre+" "+papellido+" "+ mapellido);
            MOVILES_OCUPADOS.push(response[i].conductor_movil);
            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+ titulo +"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}
function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de conductor",
        "¿Desea cambiar de conductor sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            abrirModificar(id);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        abrirModificar(id);
    }
}

function abrirModificar(id)
{
    ID_CONDUCTOR = id;
    AGREGAR = false;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_conductor.html", function( response, status, xhr ) {
        iniciarPestanias();
        cambioEjecutado();
        iniciarFecha(['#nacimiento','#seguroInicio','#seguroRenovacion']);
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
                alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                $("#nick").val("");
                return;
            }
        });
        var conductor;
        for(var i = 0 ; i < CONDUCTORES.length; i++)
        {
            if(CONDUCTORES[i].conductor_id === id)
            {
                conductor = CONDUCTORES[i];
            }
        }
        $("#rut").val(conductor.conductor_rut);
        $("#rut").prop("readonly",true);
        $("#nombre").val(conductor.conductor_nombre);
        $("#papellido").val(conductor.conductor_papellido);
        $("#mapellido").val(conductor.conductor_mapellido);
        $("#nick").val(conductor.conductor_nick);
        $("#telefono").val(conductor.conductor_telefono);
        $("#celular").val(conductor.conductor_celular);
        $("#direccion").val(conductor.conductor_direccion);
        $("#mail").val(conductor.conductor_mail);
        $("#tipoLicencia").val(conductor.conductor_tipoLicencia);
        $("#nacimiento").val(conductor.conductor_nacimiento);
        $("#renta").val(conductor.conductor_renta);
        $("#tipoContrato").val(conductor.conductor_tipo_contrato);
        $("#afp").val(conductor.conductor_afp);
        $("#isapre").val(conductor.conductor_isapre);
        $("#mutual").val(conductor.conductor_mutual);
        $("#seguroInicio").val(conductor.conductor_seguro_inicio);
        $("#seguroRenovacion").val(conductor.conductor_seguro_renovacion);
        $("#descuento").val(conductor.conductor_descuento);
        $("#anticipo").val(conductor.conductor_anticipo);
        var imagen = conductor.conductor_imagen;
        var contrato = conductor.conductor_contrato;
        if(imagen !== '')
        {
            $("#imagenOculta").val(imagen);
            cambiarPropiedad($(".imagen"),"background-image","url('source/util/img/"+imagen+"')");
        }
        if(contrato !== '')
        {
            $("#contratoOculta").val(contrato);
            var enlace = "<a href=\"source/util/pdf/"+contrato+"\" target=\"_blanck\">Ver</a>";
            $("#contenedor_contrato").html(enlace);
        }
        buscarMovil(conductor.conductor_movil);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarConductor()
{
    var rut = $("#rut").val();
    var patente = $("patente").val();
    var url = urlBase + "/conductor/DelConductor.php?rut="+rut;
    var success = function(response)
    {
        var index = MOVILES_OCUPADOS.indexOf(patente);
        delete MOVILES_OCUPADOS[index];
        alertify.success("Conductor eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarConductor();
    };
    getRequest(url,success);
}

function succesSubirImagen()
{
    var archivo = $("#imagenOculta").val();
    var ext = archivo.split("\.")[1];
    if(ext !== 'png'){
        if(ext !== 'jpg'){
            alertify.error("Archivo invalido");
            return;
        }
    }
    cambiarPropiedad($(".imagen"),"background-image","url('source/util/img/"+archivo+"')");
}
function succesSubirContrato()
{
    var archivo = $("#contratoOculta").val();
    var ext = archivo.split("\.")[1];
    if(ext !== 'pdf'){
        alertify.error("Archivo invalido");
        return;
    }
    else
    {
        var enlace = "<a href=\"source/util/pdf/"+archivo+"\" target=\"_blanck\">Ver</a>";
        $("#contenedor_contrato").html(enlace);
    }
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < CONDUCTORES.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === CONDUCTORES[i].conductor_rut)
            {
                return true;
            }
        }
        if(tipo === 'nick')
        {
            if(valor === CONDUCTORES[i].conductor_nick)
            {
                alertify.error("El nick "+valor+" no se encuentra disponible");
                $("#nick").val("");
                $("#nick").focus();
                return ;
            }
        }
    }    
}

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var rut = $("#rut");
    var telefono = $("#telefono");
    var celular = $("#celular");
    var mail = $("#mail");
    var renta = $("#renta");
    var mutual = $("#mutual");
    var descuento = $("#descuento");
    var anticipo = $("#anticipo");
    if(!validarRut(rut.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(rut);
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono.val()))
    {
        marcarCampoOk(telefono);
        cambiarPestaniaGeneral();
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarNumero(celular.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(celular);
        alertify.error('Celular debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail);
        alertify.error('E-mail invalido');
        return false;
    }
    if(!validarNumero(renta.val()))
    {
        cambiarPestaniaContrato();
        marcarCampoError(renta);
        alertify.error('Renta debe ser numerico');
        return false;
    }
    if(!validarNumero(mutual.val()))
    {
        cambiarPestaniaContrato();
        marcarCampoError(mutual);
        alertify.error('% Mutual debe ser numerico');
        return false;
    }
    if(!validarNumero(descuento.val() === '' ? '0' : descuento.val()))
    {
        marcarCampoOk(descuento);
        cambiarPestaniaContrato();
        marcarCampoError(descuento);
        alertify.error('% Descuento debe ser numerico');
        return false;
    }
    if(!validarNumero(anticipo.val() === '' ? '0' : anticipo.val()))
    {
        marcarCampoOk(anticipo);
        cambiarPestaniaContrato();
        marcarCampoError(anticipo);
        alertify.error('Anticipo debe ser numerico');
        return false;
    }
    
    return true;
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPropiedad($("#cont_general"),"display","block");
        cambiarPropiedad($("#cont_contrato"),"display","none");
        cambiarPropiedad($("#cont_app"),"display","none");
        cambiarPropiedad($("#cont_movil"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_contrato"),"dispose");
        agregarclase($("#p_app"),"dispose");
        agregarclase($("#p_movil"),"dispose");
    });
    $("#p_contrato").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_contrato"),"display","block");
        cambiarPropiedad($("#cont_app"),"display","none");
        cambiarPropiedad($("#cont_movil"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"),"dispose");
        agregarclase($("#p_app"),"dispose");
        agregarclase($("#p_movil"),"dispose");
    });
    $("#p_app").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_contrato"),"display","none");
        cambiarPropiedad($("#cont_app"),"display","block");
        cambiarPropiedad($("#cont_movil"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_contrato"),"dispose");
        agregarclase($("#p_general"),"dispose");
        agregarclase($("#p_movil"),"dispose");
    });
    $("#p_movil").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_contrato"),"display","none");
        cambiarPropiedad($("#cont_app"),"display","none");
        cambiarPropiedad($("#cont_movil"),"display","block");
        quitarclase($(this),"dispose");
        agregarclase($("#p_contrato"),"dispose");
        agregarclase($("#p_general"),"dispose");
        agregarclase($("#p_app"), "dispose");
    });
}

function buscarMovil(movil)
{
    var url = urlBase + "/conductor/GetMovilesConductor.php";
    var success = function(response)
    {
        cerrarSession(response);
        var moviles = $("#moviles");
        moviles.html("");
        MOVILES = response;
        moviles.append("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            var patente = response[i].movil_patente;
            if(patente === movil)
            {
                moviles.append("<option value=\""+patente+"\" selected>"+patente+"</option>");
            }
            else
            {
                if(MOVILES_OCUPADOS.indexOf(patente) === -1)
                {
                    moviles.append("<option value=\""+patente+"\">"+patente+"</option>");                
                }
            }
            if(MOVILES.length === MOVILES_OCUPADOS.length)
            {
                alertify.error("No hay veh&iacute;culos disponibles");
                return;
            }
        }
        cambiarMovil();
    };
    getRequest(url,success);
}

function cambiarMovil()
{
    var patente = $("#moviles").val();
    for(var i = 0 ; i < MOVILES.length; i++)
    {
        if(MOVILES[i].movil_patente === patente)
        {
            $("#nombreM").val(MOVILES[i].movil_nombre);
            $("#marca").val(MOVILES[i].movil_marca);
            $("#modelo").val(MOVILES[i].movil_modelo);
        }
    }
}

function activarPestania(array)
{
    var general = false;
    var contrato = false;
    var aplicacion = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            if(i < 9)
            {
                general = true;
            }
            if(i > 8 && i < 16)
            {
                if(!general)
                {
                    contrato = true;
                }
            }
            if(i > 15)
            {
                if(!contrato)
                {
                    aplicacion = true;
                }
            }
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
    if(general)
    {
        cambiarPestaniaGeneral();
    }
    if(contrato)
    {
        cambiarPestaniaContrato();
    }
    if(aplicacion)
    {
        cambiarPestaniaAplicacion();
    }
    
}
function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_contrato"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","none");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_contrato"),"dispose");
    agregarclase($("#p_app"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}


function cambiarPestaniaContrato()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_contrato"),"display","block");
    cambiarPropiedad($("#cont_app"),"display","none");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_contrato"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_app"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}

function cambiarPestaniaAplicacion()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_contrato"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","block");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_app"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_contrato"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}

