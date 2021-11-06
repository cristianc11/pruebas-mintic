package com.reto5.Reto5.Reservation;

import com.reto5.Reto5.Client.Client;
import com.reto5.Reto5.Reportes.ContadorCliente;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristian
 */
@Repository
public class RepositoryReservation {
    @Autowired
    private InterfaceReservation crud;
    
    public List <Reservation> getAll(){
        return (List<Reservation>) crud.findAll();
    }
    
    public Optional <Reservation> getReservation(int id){
        return crud.findById(id);
    }
    
    public Reservation save(Reservation reservation){
        return crud.save(reservation);
    }
    
    public void delete(Reservation reservation){
        crud.delete(reservation);
    }
    
    public List<Reservation> reservationStatus(String status){
        return crud.findAllByStatus(status);
    }
    
    public List<Reservation> reservationTime(Date dateA, Date dateB){
        return crud.findAllByStartDateAfterAndStartDateBefore(dateA, dateB);
    }
    
    public List<ContadorCliente> getTopClientes(){
        List<ContadorCliente> res = new ArrayList<>();
        List<Object[]>report= crud.countTotalReservationByClient();
        for(int i=0; i<report.size();i++){
            res.add(new ContadorCliente((Long)report.get(i)[1], (Client)report.get(i)[0]));
        }
        return res;
    }
    
}
