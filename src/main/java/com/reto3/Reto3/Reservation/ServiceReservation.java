package com.reto3.Reto3.Reservation;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Cristian
 */
@Service
public class ServiceReservation {
     @Autowired
    private RepositoryReservation mCrud;
    
    public List<Reservation> getAll(){
        return mCrud.getAll();
    }
    
    public Optional <Reservation> getReservation(int reservationId){
        return mCrud.getReservation(reservationId);
    }
    
    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation()==null){
            return mCrud.save(reservation);
        }else{
            Optional<Reservation> evt=mCrud.getReservation(reservation.getIdReservation());
            if(evt.isEmpty()){
                return mCrud.save(reservation);
            }else{
                return reservation;
            }
        }
    }
    
      public Reservation update(Reservation reservation){
          if(reservation.getIdReservation() != null){
              Optional<Reservation>evt=mCrud.getReservation(reservation.getIdReservation());
              if(!evt.isEmpty()){
                  if(reservation.getStartDate() != null){
                      evt.get().setStartDate(reservation.getStartDate());
                  }
                  if(reservation.getDevolutionDate() != null){
                      evt.get().setDevolutionDate(reservation.getDevolutionDate());
                  }
                  if(reservation.getStatus() != null){
                      evt.get().setStatus(reservation.getStatus());
                  }
                  return mCrud.save(evt.get());
              }else{
                  return reservation;
              }
          }else{
            return reservation;   
          }
      }
      
      public boolean deleteReservation(int reservationId){
          Boolean evt=getReservation(reservationId).map(reservation -> {
             mCrud.delete(reservation);
            return true;
          }).orElse(false);
          return evt;
      }
}
