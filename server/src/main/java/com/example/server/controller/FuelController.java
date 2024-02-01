package com.example.server.controller;

import com.example.server.entity.Fuel;
import com.example.server.entity.Response;
import com.example.server.service.FuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fuel")
public class FuelController {
    @Autowired
    private FuelService fuelService;

    @GetMapping("")
    public ResponseEntity<Response> getAllFuels() {
        List<Fuel> fuels = fuelService.getAllFuels();
        return ResponseEntity.ok(new Response(fuels, "Fuels fetched successfully", HttpStatus.OK.value()));
    } 

    @GetMapping("/{fuelId}")
    public ResponseEntity<Response> getFuel(@PathVariable String fuelId) {
        Fuel fuel = fuelService.getFuelById(fuelId);
        return ResponseEntity.ok(new Response(fuel, "Fuel fetched successfully", HttpStatus.OK.value()));
    }

    @PostMapping("/")
    public ResponseEntity<Response> addFuel(@RequestBody Fuel fuel) {
        Fuel savedFuel = fuelService.addFuel(fuel);
        return ResponseEntity.ok(new Response(savedFuel, "Fuel added successfully", HttpStatus.OK.value()));
    }

    @PutMapping("/{fuelId}")
    public ResponseEntity<Response> updateFuel(@PathVariable String fuelId, @RequestBody Fuel fuel) {
        Fuel updatedFuel = fuelService.editFuel(fuelId, fuel);
        return ResponseEntity.ok(new Response(updatedFuel, "Fuel updated successfully", HttpStatus.OK.value()));
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Response> handleException(Exception ex) {
        Response errorResponse = new Response(null, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
