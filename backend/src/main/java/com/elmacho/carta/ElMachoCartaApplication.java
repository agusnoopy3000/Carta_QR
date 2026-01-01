package com.elmacho.carta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ElMachoCartaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElMachoCartaApplication.class, args);
    }
}
