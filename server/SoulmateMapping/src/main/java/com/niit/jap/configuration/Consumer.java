package com.niit.jap.configuration;

import com.niit.jap.domain.User;
import com.niit.jap.service.UserService;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    private UserService userService;

    @Autowired
    public Consumer(UserService userService) {
        this.userService = userService;
    }

    @RabbitListener(queuesToDeclare = @Queue("user_map_queue"))
    public void getData(UserDTO userDTO){
        User user = new User();
        user.setName(userDTO.getName());
        user.setAge(userDTO.getAge());
        user.setGender(userDTO.getGender());
        user.setCity(userDTO.getCity());
        user.setEmail(userDTO.getEmail());
        userService.saveUser(user);
    }
}
