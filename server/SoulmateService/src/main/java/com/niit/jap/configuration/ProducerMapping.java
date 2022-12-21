package com.niit.jap.configuration;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class ProducerMapping {
    private RabbitTemplate rabbitTemplate;
    private DirectExchange directExchange;

    public ProducerMapping(RabbitTemplate rabbitTemplate, DirectExchange directExchange) {
        this.rabbitTemplate = rabbitTemplate;
        this.directExchange = directExchange;
    }

    public void sendMsg(CustomerDTO userDTO)
    {
        rabbitTemplate.convertAndSend(directExchange.getName(),"user_mapping",userDTO);
    }


}
