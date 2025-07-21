package com.example.doctorsystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private String email;
    private String phone;
}