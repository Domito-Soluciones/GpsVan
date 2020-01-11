
/* global urlBase, alertify, PAGINA, CAMPOS, clientes_tarifa, google, map, markers, API_KEY, _buscaPartida, _buscaDestino */
function agregarTarifa()
{
    var cliente = formatearCadena($("#clientes").val());
    var tipo = formatearCadena($("#tipo").val());
    var horario = formatearCadena($("#horario").val());
    var hora = formatearCadena($("#hora").val());
    var numero = formatearCadena($("#numero").val());
    var descripcion = formatearCadena($("#descripcion").val());
    var nombre = formatearCadena($("#nombre").val());
    var origen = formatearCadena($("#origen").val());
    var destino = formatearCadena($("#destino").val());
    var valor1 = formatearCadena($("#valor1").val().split('.').join(''));
    var valor2 = formatearCadena($("#valor2").val().split('.').join(''));
    var array = [tipo,horario,descripcion,numero,hora,nombre,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoTarifa())
    {
        var params = {cliente : cliente, tipo : tipo,horario : horario, numero : numero, hora : hora,descripcion: descripcion,nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/tarifa/AddTarifa.php";
        var success = function(response)
        {
            ID_TARIFA = undefined;
            cerrarSession(response);
            alertify.success("Tarifa Agregada");
            if(PAGINA !== 'CLIENTES')
            {
                vaciarFormulario();
            }
            resetFormulario();
            buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
            cambiarPropiedad($("#agregar"),"visibility","visible");
            cambiarPropiedad($("#agregarT"),"visibility","visible");
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#guardarT"),"visibility","hidden");
        };
        postRequest(url,params,success);
    }
}

function modificarTarifa()
{
    var id = ID_TARIFA;
    var cliente = formatearCadena($("#clientes").val());
    var tipo = formatearCadena($("#tipo").val());
    var horario = formatearCadena($("#horario").val());
    var hora = formatearCadena($("#hora").val());
    var numero = formatearCadena($("#numero").val());
    var descripcion = formatearCadena($("#descripcion").val());
    var nombre = formatearCadena($("#nombre").val());
    var origen = formatearCadena($("#origen").val());
    var destino = formatearCadena($("#destino").val());
    var valor1 = formatearCadena($("#valor1").val().split('.').join(''));
    var valor2 = formatearCadena($("#valor2").val().split('.').join(''));
    var array = [tipo,horario,descripcion,numero, hora,nombre,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoTarifa())
    {
        var params = {id : id,cliente : cliente, tipo : tipo,horario : horario, numero : numero, hora : hora,descripcion : descripcion,nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/tarifa/ModTarifa.php";
        var success = function(response)
        {
            ocultarMapa();
            cerrarSession(response);
            alertify.success("Tarifa Modificada");
            resetFormulario();
            buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
            agregarclase($("#guardarT"),"oculto");
            agregarclase($("#eliminarT"),"oculto");
            quitarclase($("#agregarT"),"oculto");
        };
        postRequest(url,params,success);
    }
}

function buscarClienteTarifa()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda_tarifa");
        clientes.html("");
        CLIENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var rut = response[i].cliente_rut;
            var nombre = response[i].cliente_razon;
            var direccion = response[i].cliente_direccion;
            var titulo = recortar(rut+" / "+nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFilaTarifa('"+id+"','"+nombre+"','"+direccion+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFilaTarifa('"+id+"','"+nombre+"','"+direccion+"')\">"+titulo+"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function cambiarFilaTarifa(id,nombre,direccion)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de tarifa",
        "¿Desea cambiar de tarifa sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            buscarTarifas(id,nombre,direccion);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        buscarTarifas(id,nombre,direccion);
    }
}
function buscarTarifas(id,nombre,direccion)
{
    ID_CLIENTE = id;
    NOMBRE_CLIENTE = nombre;
    DIRECCION_EMPRESA = direccion;
    $("#clientes").val(nombre);
    marcarFilaActiva(id);
    quitarclase($("#agregar"),"oculto");
    $("#lista_busqueda_tarifa_detalle").html("");
    var busqueda = NOMBRE_CLIENTE;
    var params = {busqueda : busqueda};
    var url = urlBase + "/tarifa/GetTarifas.php";
    var success = function(response)
    {
        
        cambiarPropiedad($(".pie-tarifa"),"display","block");
        cambiarPropiedad($("#guardar"),"visibility","hidden");
        cambiarPropiedad($("#eliminar2"),"visibility","hidden");
        cerrarSession(response);
        var tarifas = $("#lista_busqueda_tarifa_detalle");
        tarifas.html("");
        TARIFAS = response;
        tarifas.append("<div class=\"contenedor_central_titulo_tarifa\"><div>Nombre</div><div class=\"col_empresa_pasajero\">Hora</div><div class=\"col_empresa_pasajero\">Descripción</div><div>Empresa</div><div></div></div>");
        if(response.length === 0)
        {
            tarifas.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].tarifa_id;
            var nombre = response[i].tarifa_descripcion;
            var hora = response[i].tarifa_hora;
            var descripcion = response[i].tarifa_nombre;
            var empresa = response[i].tarifa_cliente;
            tarifas.append("<div class=\"fila_contenedor fila_contenedor_tarifa_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+nombre+"</div>"+
                    "<div  class=\"col_empresa_pasajero\" onClick=\"abrirBuscador('"+id+"')\">"+hora+"</div>"+
                    "<div  class=\"col_empresa_pasajero\" onClick=\"abrirBuscador('"+id+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarTarifa('"+descripcion+"','"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
    
}

function abrirBuscador(id)
{
    AGREGAR = false;
    ID_TARIFA = id;
    if(PAGINA === 'TARIFAS')
    {
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar2"),"visibility","visible");   
    }
    cambiarPropiedad($("#pie-aniadir"),"display","none");
    agregarclase($("#agregarT"),"oculto");
    quitarclase($("#guardarT"),"oculto");
    quitarclase($("#eliminarT"),"oculto");
    $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa_cliente.html", function( response, status, xhr ) {
        iniciarHora([$("#hora")]);
        if(PAGINA === 'CLIENTES')
        {
            cambiarPropiedad($("#titulo_tarifa"),"background-color","white");
            cambiarPropiedad($(".contenedor-pre-input"),"height","25px");
        }
        else if(PAGINA !== 'TARIFAS')
        {
           cambiarPropiedad($("#contenedor_tarifa"),"display","none");
           $("#pie_tarifa #agregar").attr("id","agregarNo");
           $("#pie_tarifa #guardar").attr("id","guardarNo");
           $("#pie_tarifa #eliminar").attr("id","eliminarNo");
        }
        cambioEjecutado();
        var tarifa;
        for(var i = 0 ; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_id === id)
            {
                tarifa = TARIFAS[i];
            }
        }
        $("#tipo").change(function(){
            generarNombre();
        });
        $("#horario").change(function(){
            generarNombre();
        });
        cargarClientes();
        $("#clientes").val(tarifa.tarifa_cliente);
        $("#tipo").val(tarifa.tarifa_tipo);
        $("#horario").val(tarifa.tarifa_horario);
        $("#hora").val(tarifa.tarifa_hora);
        $("#numero").val(tarifa.tarifa_numero);
        $("#descripcion").val(tarifa.tarifa_descripcion);
        $("#nombre").prop("readonly",true);
        $("#nombre").val(tarifa.tarifa_nombre);
        $("#origen").val(tarifa.tarifa_origen);
        $("#destino").val(tarifa.tarifa_destino);
        $("#valor1").val(formatoMoneda(tarifa.tarifa_valor1));
        $("#valor2").val(formatoMoneda(tarifa.tarifa_valor2));
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        $("#eliminar2").click(function (){
            confirmar("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+$("#descripcion").val() + " " +$("#nombre").val(),
            function(){
                eliminarTarifa();
            },null);
        });

        $("#volverT").click(function(){
            ocultarSubMapa();
            ocultarMapa();
            if(typeof NOMBRE_CLIENTE === "undefined" || typeof ID_CLIENTE === "undefined")
            {
                buscarTarifasAll();
                cambiarPropiedad($("#agregar"),"visibility","hidden");
            }   
            else
            {
                buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
                cambiarPropiedad($("#agregar"),"visibility","visible");
            }
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar2"),"visibility","hidden");
        });
        
        $("#origen").focus(function(){
            input_direccion = $("#origen");
        });

        $("#destino").focus(function(){
            input_direccion = $("#destino");
        });

        $("#buscaOrigen").click(function(){
            input_direccion = $("#origen");
            if(mapa_oculto)
            {
                colocarMarcadorPlacesTarifa();
                quitarclase($("#contenedor_mapa"),"oculto");
                quitarclase($("#contenedor_mapa2"),"oculto");
                mapa_oculto = false;
            }
            else
            {
                agregarclase($("#contenedor_mapa"),"oculto");
                agregarclase($("#contenedor_mapa2"),"oculto");
                mapa_oculto = true;
            }
        });

        $("#buscaDestino").click(function(){
            input_direccion = $("#destino");
            if(mapa_oculto)
            {
                colocarMarcadorPlacesTarifa();
                quitarclase($("#contenedor_mapa"),"oculto");
                quitarclase($("#contenedor_mapa2"),"oculto");
                mapa_oculto = false;
            }
            else
            {
                agregarclase($("#contenedor_mapa"),"oculto");
                agregarclase($("#contenedor_mapa2"),"oculto");
                mapa_oculto = true;
            }
        });            
        mostrarSubMapa();
        mostrarMapa();
    });
}

function eliminarTarifa()
{
    var nombre = $("#nombre").val();
    var params = {nombre : nombre};
    var url = urlBase + "/tarifa/DelTarifa.php";
    var success = function(response)
    {
        alertify.success("Tarifa eliminada");
        cerrarSession(response);
        resetBotones();
        buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
        cambiarPropiedad($("#pie-aniadir"),"display","initial");
        agregarclase($("#eliminarT"),"oculto");
        agregarclase($("#guardarT"),"oculto");
        quitarclase($("#agregarT"),"oculto");
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < TARIFAS.length ; i++)
    {
        if(tipo === 'nombre')
        {
            if(valor === TARIFAS[i].tarifa_nombre)
            {
                return true;
            }
        }
    }    
}

function validarTipoDatoTarifa()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var numero = $("#numero");
    var valor1 = $("#valor1");
    var valor2 = $("#valor2");
    if(!validarNumero(numero.val()))
    {
        marcarCampoError(numero);
        alertify.error('Número ruta debe ser numerico');
        return false;
    }
    if(!validarNumero(valor1.val()))
    {
        marcarCampoError(valor1);
        alertify.error('Tarifa 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(valor2.val()))
    {
        marcarCampoError(valor2);
        alertify.error('Tarifa 2 debe ser numerico');
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

function cargarClientes()
{
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#lcliente").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            clientes_tarifa.push(nombre);
        }
    };
    postRequest(url,params,success);
}

function generarNombre()
{
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    if(horario === '' && tipo === '')
    {
        $("#nombre").val("-");
    }
    if(horario !== '' && tipo === '')
    {
        $("#nombre").val("-"+horario);
    }
    else if(tipo !== '' && horario === '')
    {
        $("#nombre").val(tipo+"-");
    }
    else if(tipo !== '' && horario !== '')
    {
        $("#nombre").val(tipo+"-"+horario);
    }
}

function preEliminarTarifa(nombre,descripcion)
{
    confirmar("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+descripcion+" "+nombre,
            function(){
                var params = {nombre : nombre};
                var url = urlBase + "/tarifa/DelTarifa.php";
                var success = function(response)
                {
                    agregarclase($("#eliminarT"),"oculto");
                    agregarclase($("#guardarT"),"oculto");
                    quitarclase($("#agregarT"),"oculto");
                    alertify.success("Tarifa eliminada");
                    cerrarSession(response);
                    resetBotones();
                    buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
                    cambiarFilaTarifa(ID_CLIENTE,NOMBRE_CLIENTE);
                };
                postRequest(url,params,success);
            });
}

function buscarTarifasAll(cargar = false)
{
    $("#lista_busqueda_tarifa_detalle").html("");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/tarifa/GetTarifas.php";
    var success = function(response)
    {
        cerrarSession(response);
        var tarifas = $("#lista_busqueda_tarifa_detalle");
        tarifas.html("");
        TARIFAS = response;
        tarifas.append("<div class=\"contenedor_central_titulo_tarifa\"><div>Nombre</div><div class=\"col_empresa_pasajero\">Hora</div><div class=\"col_empresa_pasajero\">Descripción</div><div>Empresa</div><div></div></div>");
        if(response.length === 0)
        {
            tarifas.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].tarifa_id;
            var nombre = response[i].tarifa_descripcion;
            var hora = response[i].tarifa_hora;
            var descripcion = response[i].tarifa_nombre;
            var empresa = response[i].tarifa_cliente;
            tarifas.append("<div class=\"fila_contenedor fila_contenedor_tarifa_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+nombre+"</div>"+
                    "<div class=\"col_empresa_pasajero\" onClick=\"abrirBuscador('"+id+"')\">"+hora+"</div>"+
                    "<div class=\"col_empresa_pasajero\" onClick=\"abrirBuscador('"+id+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarTarifa('"+descripcion+"','"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success,cargar);
    
}

function colocarMarcadorPlacesTarifa()
{
    eliminarMarkers();
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });
    
    markers.push(marker);

    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        input_direccion.val("Cargando...");
        var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
        $.getJSON(query, function (data) {
            if (data.status === 'OK') { 
                var zero = data.results[0];
                var address = zero.formatted_address;
                input_direccion.val(address);     
            } 
        });
    });
}