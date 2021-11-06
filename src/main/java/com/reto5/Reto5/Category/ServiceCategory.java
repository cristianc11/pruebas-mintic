package com.reto5.Reto5.Category;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Cristian
 */
@Service
public class ServiceCategory {
    @Autowired
    private RepositoryCategory mCrud;
    
    public List<Category> getAll(){
        return mCrud.getAll();
    }
    
    public Optional <Category> getCategory(int categoryId){
        return mCrud.getCategory(categoryId);
    }
    
    public Category save(Category category){
        if(category.getId()==null){
            return mCrud.save(category);
        }else{
            Optional<Category> evt=mCrud.getCategory(category.getId());
            if(evt.isEmpty()){
                return mCrud.save(category);
            }else{
                return category;
            }
        }
    }
    
      public Category update(Category category){
          if(category.getId() != null){
              Optional<Category>evt=mCrud.getCategory(category.getId());
              if(!evt.isEmpty()){
                  if(category.getDescription() != null){
                      evt.get().setDescription(category.getDescription());
                  }
                  if(category.getName() != null){
                      evt.get().setName(category.getName());
                  }
                  return mCrud.save(evt.get());
              }else{
                  return category;
              }
          }else{
               return category;
          }
      }
      
      public boolean deleteCategory(int categoryId){
          Boolean evt=getCategory(categoryId).map(category -> {
             mCrud.delete(category);
            return true;
          }).orElse(false);
          return evt;
      }
    
}
