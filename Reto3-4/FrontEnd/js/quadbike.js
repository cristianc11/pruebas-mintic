function autoInicioInformacionQuadbike(){
    console.log("Se está ejecutando los datos de la tabla");
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaQuadbike(respuesta);
        }
    })
}

function traerLlaveQuadbike(){
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-quadbike");
            $.each(respuesta, function(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>')
                console.log("select"+name.id);
            })
        }
    })
}

function pintarRespuestaQuadbike(respuesta){
    let myTable="<table class='table'>";
    myTable = "<thead>";
    myTable += "<tr>";
        myTable += "<th>Marca</th>"
        myTable += "<th>Nombre</th>";
        myTable += "<th>Año</th>";
        myTable += "<th>Descripcion</th>";
        myTable += "<th>Categoria</th>";
    myTable += "</tr>";
    myTable += "<thead>";
    for(let i=0; i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionQuadbike("+respuesta[i].id+")' class='btn btn-success'>Actualizar</button>"
        myTable+="<td> <button onclick='borrarInformacionQuadbike("+respuesta[i].id+")' class='btn btn-danger'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tabla").html(myTable);
}

function guardarInformacionQuadbike(){
    let myData={
        brand:$("#brand").val(),
        name:$("#name").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id:+$("#select-category").val()},
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype: 'JSON',
        data:JSON.stringify(myData),

        url:"http://localhost:8080/api/Quadbike/save",

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

function actualizarInformacionQuadbike(idElemento){
    let myData={
        id:idElemento,
        brand:$("#actuabrand").val(),
        name:$("#actuaname").val(),
        year:$("#actuayear").val(),
        description:$("#actuadescription").val(),
    };
    console.log(myData);
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#table").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#name").val("");
            $("#year").val("");
            $("#description").val("");
            $("#select-category").val("");
            autoInicioInformacionQuadbike();
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

function borrarInformacionQuadbike(idElemento){
    let myData={
        id:idElemento,
    };
    $.ajax({
        url:"http://localhost:8080/api/Quadbike/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#tabla").empty();
            autoInicioInformacionQuadbike();
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