package com.niit.jap.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Configuration
public class AppConfig {
    @Bean
    public RouteLocator getRoutes(RouteLocatorBuilder builder)
    {
        return builder.routes().route(p->p.path("/api/v1/**").uri("http://authentication-service:8085/"))
                .route(p->p.path("/api/v2/**").uri("http://soulmate-service:8082/")).build();
    }
}
