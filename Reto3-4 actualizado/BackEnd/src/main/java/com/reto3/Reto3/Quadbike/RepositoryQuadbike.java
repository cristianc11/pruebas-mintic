package com.reto3.Reto3.Quadbike;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristian
 */
@Repository
public class RepositoryQuadbike {
     @Autowired
    private InterfaceQuadbike crud;
    
    public List <Quadbike> getAll(){
        return (List<Quadbike>) crud.findAll();
    }
    
    public Optional <Quadbike> getQuadbike(int id){
        return crud.findById(id);
    }
    
    public Quadbike save(Quadbike quadbike){
        return crud.save(quadbike);
    }
    
    public void delete(Quadbike quadbike){
        crud.delete(quadbike);
    }
}
