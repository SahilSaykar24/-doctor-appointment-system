package com.example.doctorsystem.controller;

import com.example.doctorsystem.entity.Appointment;
import com.example.doctorsystem.entity.Patient;
import com.example.doctorsystem.repository.AppointmentRepository;
import com.example.doctorsystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    @PostMapping
    public Patient add(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!patientRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Patient patient = patientRepository.findById(id).orElse(null);
        List<Appointment> appointments = appointmentRepository.findByPatient(patient);
        appointmentRepository.deleteAll(appointments); // Delete related appointments

        patientRepository.deleteById(id); // Delete patient
        return ResponseEntity.ok().build();
    }
}
