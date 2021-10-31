package com.reto3.Reto3.Quadbike;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Cristian
 */
@Service
public class ServiceQuadbike {
    @Autowired
    private RepositoryQuadbike metodosCrud;
    
    public List<Quadbike> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Quadbike>getQuadbike(int id){
        return metodosCrud.getQuadbike(id);
    }
    
    public Quadbike save(Quadbike quadbike){
        if(quadbike.getId() == null){
            return metodosCrud.save(quadbike);
        }else{
            Optional<Quadbike> evt=metodosCrud.getQuadbike(quadbike.getId());
            if(evt.isEmpty()){
                return metodosCrud.save(quadbike);
            }else{
                return quadbike;
            }
        }
    }
    
    public Quadbike update(Quadbike quadbike){
        if(quadbike.getId() != null){
            Optional<Quadbike> evt=metodosCrud.getQuadbike(quadbike.getId());
            if(!evt.isEmpty()){
                if(quadbike.getBrand() != null){
                    evt.get().setBrand(quadbike.getBrand());
                }
                 if(quadbike.getName() != null){
                    evt.get().setName(quadbike.getName());
                }
                 if(quadbike.getYear() != null){
                     evt.get().setYear(quadbike.getYear());
                 }
                if(quadbike.getDescription() != null){
                    evt.get().setDescription(quadbike.getDescription());
                }
                if(quadbike.getCategory() != null){
                    evt.get().setCategory(quadbike.getCategory());
                }
                return metodosCrud.save(evt.get());
            }
        }
        return quadbike;
    }
    
    public boolean deleteQuadbike(int quadbikeid){
        Boolean evt=getQuadbike(quadbikeid).map(quadbike ->{
            metodosCrud.delete(quadbike);
            return true;
        }).orElse(false);
        return evt;
    }
    
}
