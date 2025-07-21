package com.example.doctorsystem.repository;

import com.example.doctorsystem.entity.Appointment;
import com.example.doctorsystem.entity.Doctor;
import com.example.doctorsystem.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByDoctorAndAppointmentDateTime(Doctor doctor, LocalDateTime dateTime);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByPatient(Patient patient);
}
