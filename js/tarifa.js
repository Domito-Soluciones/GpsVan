/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE, markers, map, google, API_KEY */
var ID_TARIFA;
var TARIFAS;
var AGREGAR = true;
var PAGINA = 'TARIFAS';
var CAMPOS = ["tipo","horario","descripcion","numero","hora","nombre","valor1","valor2"];
var clientes_tarifa = [];
var DIRECCION_EMPRESA;
var mapa_oculto = true;
var _buscaPartida = false;
var _buscaDestino = false;


$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarClienteTarifa();
    buscarTarifasAll(true);
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa.html", function( response, status, xhr ) {
            iniciarHora([$("#hora")]);
            quitarclase($("#guardar"),"oculto");
            cambiarPropiedad($("#agregar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
            $("#clientes").val(NOMBRE_CLIENTE);
            cambioEjecutado();
            cargarClientes();
            $("#clientes").on('input',function(){
                generarNombre('cliente');
            });
            $("#tipo").change(function(){
                generarNombre('tipo');
                var tipo = $(this).val();
                if(tipo === 'RG')
                {
                    $("#destino").val(DIRECCION_EMPRESA);
                    $("#origen").val("");
                }
                else if(tipo === 'ZP')
                {
                    $("#origen").val(DIRECCION_EMPRESA);
                    $("#destino").val("");
                }
            });
            $("#horario").change(function(){
                generarNombre('horario');
            });

            $("#nombre").blur(function (){
                if(validarExistencia('nombre',$(this).val()))
                {
                    alertify.error("El nombre "+$(this).val()+" ya existe");
                    $("#nombre").val("");
                    return;
                }
            });
            $("#clientes").on('blur',function () {
                if($("#clientes").val() === "")
                {
                    //cargarPasajeros();
                }
                var noExiste = validarInexistencia($("#clientes").val(),clientes);
                if(noExiste)
                {
                    alertify.error("Cliente inexistente");
                    $("#clientes").val("");

                }
            });
            
            $("#volver").click(function(){
                buscarTarifas(NOMBRE_CLIENTE,ID_CLIENTE);
                if(typeof ID_CLIENTE === "undefined")
                {
                    cambiarPropiedad($("#agregar"),"visibility","hidden");
                }   
                else
                {
                    cambiarPropiedad($("#agregar"),"visibility","visible");
                }
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");

            });
            
            $("#buscaOrigen").click(function(){
                _buscaPartida = true;
                if(mapa_oculto)
                {
                    colocarMarcadorPlacesTarifa();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = true;
                }
            });
            
            $("#buscaDestino").click(function(){
                _buscaDestino = true;
                if(mapa_oculto)
                {
                    colocarMarcadorPlacesTarifa();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = true;
                }
            });            
            mostrarMapa();
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });

    $("#busqueda").keyup(function(){
        buscarClienteTarifa($(this).val());
    });
                
    $("#guardar").click(function (){
        if(AGREGAR)
        {
            agregarTarifa();
        }
        else
        {
            modificarTarifa();
        }
    });
});

