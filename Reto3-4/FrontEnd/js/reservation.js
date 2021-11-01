function autoInicioInformacionReservation(){
    console.log("Se está ejecutando los datos de la tabla");
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    })
}

function traerLlaveReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-status");
            $.each(respuesta, function(id,status){
                $select.append('<option value='+status.idReservation+'>'+status.status+'</option>')
                console.log("select"+name.idReservation);
            });
        }
    })
}

function pintarRespuestaReservation(respuesta){
    let myTable="<table class='table'>";
    myTable = "<thead>";
    myTable += "<tr>";
        myTable += "<th>ID</th>"
        myTable += "<th>Fecha Inicio</th>";
        myTable += "<th>Fecha Entrega</th>";
        myTable += "<th>Status</th>";
        myTable += "<th>ID Cliente</th>";
        myTable += "<th>Nombre</th>";
        myTable += "<th>Email</th>";
    myTable += "</tr>";
    myTable += "<thead>";
    for(let i=0; i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+formatoFecha(respuesta[i].startDate)+"</td>";
        myTable+="<td>"+formatoFecha(respuesta[i].devolutionDate)+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.idClient+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionReservation("+respuesta[i].idReservation+")' class='btn btn-success'>Actualizar</button>"
        myTable+="<td> <button onclick='borrarInformacionReservation("+respuesta[i].idReservation+")' class='btn btn-danger'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tabla").html(myTable);
}

function formatoFecha(fecha){
    return fecha.substring(0,10)
}

function guardarInformacionReservation(){
    let myData={
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        quadbike:{id:$("#select-quadbike").val()},
        client:{idClient:$("#select-client").val()},
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype: 'JSON',
        data:JSON.stringify(myData),

        url:"http://localhost:8080/api/Reservation/save",

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

function actualizarInformacionReservation(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#actuastartDate").val(),
        devolutionDate:$("#actuadevolutionDate").val(),
        status:$("#select-status").val(),
    };
    console.log(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#table").empty();
            $("#id").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#select-status").val("");
            autoInicioInformacionReservation();
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

function borrarInformacionReservation(idElemento){
    let myData={
        idReservation:idElemento,
    };
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#tabla").empty();
            autoInicioInformacionReservation();
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