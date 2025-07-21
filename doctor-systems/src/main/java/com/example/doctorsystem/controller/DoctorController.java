package com.example.doctorsystem.controller;

import com.example.doctorsystem.entity.Appointment;
import com.example.doctorsystem.entity.Doctor;
import com.example.doctorsystem.repository.AppointmentRepository;
import com.example.doctorsystem.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @PostMapping
    public Doctor add(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!doctorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Doctor doctor = doctorRepository.findById(id).orElse(null);
        List<Appointment> appointments = appointmentRepository.findByDoctor(doctor);
        appointmentRepository.deleteAll(appointments);  // Delete related appointments

        doctorRepository.deleteById(id); // Delete doctor
        return ResponseEntity.ok().build();
    }
}
