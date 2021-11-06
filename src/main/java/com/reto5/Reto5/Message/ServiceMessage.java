package com.reto5.Reto5.Message;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Cristian
 */
@Service
public class ServiceMessage {
     @Autowired
    private RepositoryMessage mCrud;
    
    public List<Message> getAll(){
        return mCrud.getAll();
    }
    
    public Optional <Message> getMessage(int messageId){
        return mCrud.getMessage(messageId);
    }
    
    public Message save(Message message){
        if(message.getIdMessage()==null){
            return mCrud.save(message);
        }else{
            Optional<Message> evt=mCrud.getMessage(message.getIdMessage());
            if(evt.isEmpty()){
                return mCrud.save(message);
            }else{
                return message;
            }
        }
    }
    
      public Message update(Message message){
          if(message.getIdMessage() != null){
              Optional<Message>evt=mCrud.getMessage(message.getIdMessage());
              if(!evt.isEmpty()){
                  if(message.getMessageText() != null){
                      evt.get().setMessageText(message.getMessageText());
                  }
                  return mCrud.save(evt.get());
              }else{
                  return message;
              }
          }else{
              return message;
          }
      }
      
      public boolean deleteMessage(int messageId){
          Boolean evt=getMessage(messageId).map(message -> {
             mCrud.delete(message);
            return true;
          }).orElse(false);
          return evt;
      }
}
