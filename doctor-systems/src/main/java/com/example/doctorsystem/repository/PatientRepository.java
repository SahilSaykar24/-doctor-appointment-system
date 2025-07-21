package com.example.doctorsystem.repository;

import com.example.doctorsystem.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {}
