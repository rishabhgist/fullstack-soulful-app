package com.niit.jap.configuration;

import com.niit.jap.domain.User;
import com.niit.jap.service.UserImpl;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    private UserImpl userService;

    @Autowired
    public Consumer(UserImpl userService) {
        this.userService = userService;
    }


    @RabbitListener(queuesToDeclare = @Queue("user_data_queue"))
    public void getData(UserDTO userDTO){
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        userService.saveUser(user);
    }
}
