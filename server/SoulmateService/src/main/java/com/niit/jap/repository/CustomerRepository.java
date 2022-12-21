package com.niit.jap.repository;

import com.niit.jap.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends MongoRepository<Customer,Integer> {
    @Query("{'customer.id':{$in:[?0]}}")
    Customer findById(String id);
}
