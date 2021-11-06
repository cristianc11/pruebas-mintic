package com.reto5.Reto5.Client;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Cristian
 */
@Service
public class ServiceClient {
    @Autowired
    private RepositoryClient mCrud;
    
    public List<Client> getAll(){
        return mCrud.getAll();
    }
    
    public Optional <Client> getClient(int clientId){
        return mCrud.getClient(clientId);
    }
    
    public Client save(Client client){
        if(client.getIdClient()==null){
            return mCrud.save(client);
        }else{
            Optional<Client> evt=mCrud.getClient(client.getIdClient());
            if(evt.isEmpty()){
                return mCrud.save(client);
            }else{
                return client;
            }
        }
    }
    
      public Client update(Client client){
          if(client.getIdClient() != null){
              Optional<Client>evt=mCrud.getClient(client.getIdClient());
              if(!evt.isEmpty()){
                  if(client.getEmail() != null){
                      evt.get().setEmail(client.getEmail());
                  }
                  if(client.getPassword() != null){
                      evt.get().setPassword(client.getPassword());
                  }
                  if(client.getName() != null){
                      evt.get().setName(client.getName());
                  }
                  if(client.getAge() != null){
                      evt.get().setAge(client.getAge());
                  }
                  return mCrud.save(evt.get());
              }else{
                  return client;
              }
          }else{
              return client;
          }
      }
      
      public boolean deleteClient(int clientId){
          Boolean evt=getClient(clientId).map(client -> {
             mCrud.delete(client);
            return true;
          }).orElse(false);
          return evt;
      }
}
