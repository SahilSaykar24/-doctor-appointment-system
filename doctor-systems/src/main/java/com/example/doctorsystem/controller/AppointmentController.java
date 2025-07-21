package com.example.doctorsystem.controller;

import com.example.doctorsystem.dto.AppointmentRequest;
import com.example.doctorsystem.entity.Appointment;
import com.example.doctorsystem.entity.Doctor;
import com.example.doctorsystem.entity.Patient;
import com.example.doctorsystem.repository.AppointmentRepository;
import com.example.doctorsystem.repository.DoctorRepository;
import com.example.doctorsystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow CORS from React frontend
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    PatientRepository patientRepository;

    // Book appointment
    // @PostMapping
    // public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request) {
    //     Doctor doctor = doctorRepository.findById(request.doctorId).orElse(null);
    //     Patient patient = patientRepository.findById(request.patientId).orElse(null);

    //     if (doctor == null || patient == null) {
    //         return ResponseEntity.badRequest().body("Doctor or Patient not found");
    //     }

    //     LocalDateTime dateTime = LocalDateTime.parse(request.dateTime);
    //     boolean exists = appointmentRepository.existsByDoctorAndAppointmentDateTime(doctor, dateTime);
    //     if (exists) {
    //         return ResponseEntity.badRequest().body("Appointment already exists for this doctor at this time");
    //     }

    //     Appointment appointment = new Appointment();
    //     appointment.setDoctor(doctor);
    //     appointment.setPatient(patient);
    //     appointment.setAppointmentDateTime(dateTime);

    //     return ResponseEntity.ok(appointmentRepository.save(appointment));
    // }
@PostMapping
public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request) {
    Doctor doctor = doctorRepository.findById(request.doctorId).orElse(null);
    Patient patient = patientRepository.findById(request.patientId).orElse(null);

    if (doctor == null || patient == null) {
        return ResponseEntity.badRequest().body("Doctor or Patient not found");
    }

    LocalDateTime dt;
    try {
        dt = LocalDateTime.parse(request.dateTime);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Invalid date format: " + request.dateTime);
    }

    boolean exists = appointmentRepository.existsByDoctorAndAppointmentDateTime(doctor, dt);
    if (exists) {
        return ResponseEntity.badRequest().body("Appointment already exists for this doctor at this time");
    }

    Appointment appointment = new Appointment();
    appointment.setDoctor(doctor);
    appointment.setPatient(patient);
    appointment.setAppointmentDateTime(dt);

    return ResponseEntity.ok(appointmentRepository.save(appointment));
}

    // Get all appointments
    @GetMapping
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    // Get appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getById(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id) {
        if (!appointmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
