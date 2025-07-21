package com.example.doctorsystem.repository;

import com.example.doctorsystem.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {}
