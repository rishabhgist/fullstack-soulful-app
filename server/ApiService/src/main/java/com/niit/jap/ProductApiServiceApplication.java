package com.niit.jap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ProductApiServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(ProductApiServiceApplication.class, args);
	}

}
