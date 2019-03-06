/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_TARIFA;
var TARIFAS;
var AGREGAR = true;
var PAGINA = 'TARIFAS';
var CAMPOS = ["clientes","tipo","horario","nombre","valor1","valor2"];
var clientes_tarifa = [];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarClienteTarifa();
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa.html", function( response, status, xhr ) {
            quitarclase($("#guardar"),"oculto");
            cambiarPropiedad($("#agregar"),"visibility","hidden");
            $("#clientes").val(NOMBRE_CLIENTE);
            cambioEjecutado();
            cargarClientes();
            $("#clientes").on('input',function(){
                generarNombre('cliente');
            });
            $("#tipo").change(function(){
                generarNombre('tipo');
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
                cambiarPropiedad($("#agregar"),"visibility","visible");
            });
            
            $("#guardar").click(function (){
                agregarTarifa();
            });
            
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });
    $("#cancelar").click(function(){
        validarCancelar(PAGINA);
    });

    $("#busqueda").keyup(function(){
        buscarClienteTarifa($(this).val());
    });
});

