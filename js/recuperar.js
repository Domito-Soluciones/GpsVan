/* global alertify, urlBase */

$(document).ready(function(){
    $("#enviar").click(()=>{
        let rut = $("#rut").val();
        if(rut === ''){
            alertify.error("Debe ingresar rut");
            return;
        }
        if(!validarRut(rut)){
            alertify.error("Rut inválido");
            return;
        }
        var params = {rut: rut};
        var url = urlBase + "/agente/GetAgenteRec.php";
        var success = function(response)
        {
            let mail = response.agente_mail;
            let idSol = response.agente_idsol;
            if(mail !== ''){
                enviarCorreoRecuperacion(rut,mail,idSol);
                $("#rut").val("");
            }
            else{
                alertify.error("Usuario no registrado");
            }
        };
        postRequest(url,params,success,true);
    });
    
    $("#confirmar").click(()=>{
        let p1 = $("#password1").val();
        let p2 = $("#password2").val();
        if(p1 === '' || p2 === ''){
            alertify.error("Debe ingresar todos los campos necesarios");
            return;
        }
        if(p1 !== p2){
            alertify.error("Contraseñas no coinciden");
            return;
        }
        var params = {rut: $("#aux2").val(),password: btoa(p1),idSol:$("#aux").val()};
        var url = urlBase + "/agente/ModAgenteClave.php";
        var success = function(response)
        {
            let resp = response.agente_modificado;
            if(resp === 'exp'){
                alertify.error("este link a expirado favor reintentar")
            }
            else if(resp === 'si'){
                $("#password1").val("");
                $("#password2").val("");
                alertify.success("Clave de usuario cambiada con exito");
            }
        };
        postRequest(url,params,success,true);
    });
});

