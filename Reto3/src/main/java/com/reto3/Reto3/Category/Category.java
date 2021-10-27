package com.reto3.Reto3.Category;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import javax.persistence.GenerationType;

/**
 *
 * @author Cristian
 */
@Entity
@Table(name="category")
public class Category  implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    
    /*@OneToMany(cascade = {CascadeType.PERSIST},mappedBy="category")
    @JsonIgnoreProperties("category")
    private List<Quadbike> quadbike;*/

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
   /* public List<Quadbike> getQuadbike() {
        return quadbike;
    }

    public void setQuadbike(List<Quadbike> quadbike) {
        this.quadbike = quadbike;
    }
    */
    
    
    
}
