/* global urlBase, alertify, KEY */
$(document).ready(function(){
    darFoco($("#usuario"));
    $("#usuario").keypress(function(e){
        if(isTeclaEnter(e)){
            darFoco($("#password"));
        }
    });
    $("#password").keypress(function(e){
        if(isTeclaEnter(e)){
            login();
        }
    });
    $("#entrar").click(function(){
        login();
    });
});

function login(){
    var usuario = $("#usuario").val();
    var password = btoa($("#password").val());
    if(usuario === '' || password === '')
    {
        alertify.error("Ingrese usuario y password");
        return;
    }
    var url = urlBase + "/agente/Login.php";
    var params = { usuario: usuario, password : (password)};
    var success = function(response){
        if(response.agente_id === 0)
        {
            alertify.error("Usuario y/o password no coinciden");
        }
        else if(parseInt(response.agente_id) > 0)
        {
            if(parseInt(response.agente_tipo) === 0)
            {
                redireccionar("principal.php");
            }
            else
            {
                CLIENTE = response.agente_empresa;
                redireccionar("asignacion.php");
            }
        }
    };
    postRequest(url,params,success);
}
