package com.reto5.Reto5.Reservation;

import com.reto5.Reto5.Reportes.ContadorCliente;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.reto5.Reto5.Reportes.StatusReservation;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

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
      
      public StatusReservation getStatusReservation(){
          List<Reservation> completed = mCrud.reservationStatus("completed");
          List<Reservation> cancelled = mCrud.reservationStatus("cancelled");
          
          return new StatusReservation(completed.size(), cancelled.size());
      }
      
      public List<Reservation> getReservationTime(String dateA,String dateB){
          SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
         Date dateOne =new  Date();
         Date dateTwo = new Date();
         
         try{
         
             dateOne = parser.parse(dateA);
             dateTwo = parser.parse(dateB);
            
         }catch(ParseException evt){
         evt.printStackTrace();
         }
         if(dateOne.before(dateTwo)){
         return mCrud.reservationTime(dateOne, dateTwo);
         }else{
          return new ArrayList<>();
         }
      }
      
      public List<ContadorCliente> servicioTopClientes(){
          return mCrud.getTopClientes();
      }
      
}
