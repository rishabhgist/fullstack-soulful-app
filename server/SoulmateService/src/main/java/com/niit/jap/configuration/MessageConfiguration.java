package com.niit.jap.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sound.midi.Receiver;

@Configuration
public class MessageConfiguration {
    private String exchangeName="user_data_exchange";
    private String registerQueue="user_data_queue";

    private String qUserMap="user_map_queue";

    @Bean
    public DirectExchange directExchange()
    {
        return new DirectExchange(exchangeName);
    }

    @Bean
    public Queue registerQueue()
    {
        return new Queue(registerQueue,true);
    }
    @Bean
    public Queue qUserMap(){return new Queue(qUserMap, true);}

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter()    {
        return new  Jackson2JsonMessageConverter();
    }
    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory)
    {
        RabbitTemplate rabbitTemp=new RabbitTemplate(connectionFactory);
        rabbitTemp.setMessageConverter(producerJackson2MessageConverter());
        return rabbitTemp;
    }
    @Bean
    Binding bindingUser(DirectExchange exchange, Queue registerQueue)
    {
        return BindingBuilder.bind(registerQueue()).to(exchange).with("user_data");

    }

    @Bean
    Binding bindingMap(DirectExchange exchange, Queue qUserMap){
        return BindingBuilder.bind(qUserMap()).to(exchange).with("user_mapping");
    }



}
