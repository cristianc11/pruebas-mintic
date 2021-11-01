function autoInicioInformacionCategory(){
    console.log("Se está ejecutando los datos de la tabla");
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function accion(respuesta){
            console.log(respuesta);
            pintarRespuestaCategory(respuesta);
        }
    })
}

function traerLlaveCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function accion(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function llave(id,name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>')
                console.log("select"+name.id);
            });
        }
    })
}

function pintarRespuestaCategory(respuesta){
    let myTable="<table class='table'>";
    myTable = "<thead>";
    myTable += "<tr>";
        myTable += "<th>Nombre</th>";
        myTable += "<th>Descripcion</th>";
    myTable += "</tr>";
    myTable += "<thead>";
    for(let i=0; i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionCategory("+respuesta[i].id+")' class='btn btn-success'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarInformacionCategory("+respuesta[i].id+")' class='btn btn-danger'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tabla").html(myTable);
}

function guardarInformacionCategory(){
    let myData={
        name:$("#name").val(),
        description:$("#description").val(),
    };
    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype: 'JSON',
        data:JSON.stringify(myData),

        url:"http://localhost:8080/api/Category/save",

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

function actualizarInformacionCategory(idElemento){
    let myData={
        id:idElemento,
        name:$("#actuaname").val(),
        description:$("#actuadescription").val(),
    };
    console.log(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#table").empty();
            $("#name").val("");
            $("#description").val("");
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

function borrarInformacionCategory(idElemento){
    let myData={
        id:idElemento,
    };
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:JSON.stringify(myData),
        contentType:"application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta){
            $("#tabla").empty();
            autoInicioInformacionCategory();
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