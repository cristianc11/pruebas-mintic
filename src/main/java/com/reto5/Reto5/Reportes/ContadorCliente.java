package com.reto5.Reto5.Reportes;

import com.reto5.Reto5.Client.Client;

/**
 *
 * @author Cristian
 */
public class ContadorCliente {
    private Long total;
    private Client client;
    
    public ContadorCliente(Long total, Client client){
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
    
}
