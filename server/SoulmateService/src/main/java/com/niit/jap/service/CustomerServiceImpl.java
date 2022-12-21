package com.niit.jap.service;

import com.niit.jap.domain.Customer;
import com.niit.jap.exception.CustomerAlreadyExists;
import com.niit.jap.exception.CustomerIdNotFound;
import com.niit.jap.proxy.CustomerProxy;
import com.niit.jap.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository repository;


    @Autowired
    public CustomerServiceImpl(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Customer saveCustomer(Customer customer) throws CustomerAlreadyExists {
        return repository.save(customer);
    }

    @Override
    public Customer findById(String id) throws CustomerIdNotFound {
        return repository.findById(id);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

}
