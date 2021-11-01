function autoInicioInformacionClient(){
    console.log("Se está ejecutando los datos de la tabla");
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    })
}

function traerLlaveClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(idClient,name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>')
                console.log("select"+name.idClient);
            });
        }
    })
}



function pintarRespuestaClient(respuesta){
    let myTable="<table class='table'>";
    myTable = "<thead>";
    myTable += "<tr>";
        myTable += "<th>ID</th>"
        myTable += "<th>Email</th>";
        myTable += "<th>Nombre</th>";
        myTable += "<th>Edad</th>";
    myTable += "</tr>";
    myTable += "<thead>";
    for(let i=0; i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionClient("+respuesta[i].idClient+")' class='btn btn-success'>Actualizar</button>"
        myTable+="<td> <button onclick='borrarInformacionClient("+respuesta[i].idClient+")' class='btn btn-danger'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tabla").html(myTable);
}

function guardarInformacionClient(){
    let myData={
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val(),
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype: 'JSON',
        data:JSON.stringify(myData),

        url:"http://localhost:8080/api/Client/save",

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

function actualizarInformacionClient(idElemento){
    let myData={
        idClient:idElemento,
        password:$("#actuapassword").val(),
        name:$("#actuaname").val(),
        age:$("#actuaage").val(),
    };
    console.log(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#table").empty();
            $("#id").val("");
            $("#name").val("");
            $("#age").val("");
            $("#password").val("");
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

function borrarInformacionClient(idElemento){
    let myData={
        idClient:idElemento,
    };
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#tabla").empty();
            autoInicioInformacionClient();
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