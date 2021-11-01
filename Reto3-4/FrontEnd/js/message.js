function autoInicioInformacionMessage(){
    console.log("Se está ejecutando los datos de la tabla");
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    })
}

function traerLlaveMessage(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-message");
            $.each(respuesta, function(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>')
                console.log("select"+name.id);
            });
        }
    })
}

function pintarRespuestaMessage(respuesta){
    let myTable="<table class='table'>";
    myTable = "<thead>";
    myTable += "<tr>";
        myTable += "<th>Mensaje</th>";
        myTable += "<th>Cuatrimoto</th>";
        myTable += "<th>Cliente</th>";
    myTable += "</tr>";
    myTable += "<thead>";
    for(let i=0; i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].quadbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionMessage("+respuesta[i].idMessage+")' class='btn btn-success'>Actualizar</button>"
        myTable+="<td> <button onclick='borrarInformacionMessage("+respuesta[i].idMessage+")' class='btn btn-danger'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tabla").html(myTable);
}

function guardarInformacionMessage(){
    let myData={
        messageText:$("#messageText").val(),
        quadbike:{id:$("#select-quadbike").val()},
        client:{idClient:$("#select-client").val()},
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype: 'JSON',
        data:JSON.stringify(myData),

        url:"http://localhost:8080/api/Message/save",

        success:function(respuesta){
            console.log(respuesta)
            console.log("Se guardo correctamente");
            alert("Se han guardado los datos");
            window.location.reload()
        },

        error:function(jqXHR, textStatus, errorThrow){
            window.location.reload()
            alert("No se pudo guardar correctamente");
        }
    });
}

function actualizarInformacionMessage(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#actuamessageText").val(),
    };
    console.log(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#table").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            autoInicioInformacionMessage();
            console.log("Se actualizó correctamente");
            alert("Se han actualizado los datos");
            window.location.reload()
        },

        error:function(jqXHR, textStatus, errorThrow){
            window.location.reload()
            alert("No se pudo actualizar correctamente");
        }
    });
}

function borrarInformacionMessage(idElemento){
    let myData={
        idMessage:idElemento,
    };
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#tabla").empty();
            autoInicioInformacionMessage();
            console.log("Se borró correctamente");
            alert("Se han borrado exitosamente los datos");
            window.location.reload()
        },

        error:function(jqXHR, textStatus, errorThrow){
            window.location.reload()
            alert("No se pudo borrar correctamente");
        }
    });
}