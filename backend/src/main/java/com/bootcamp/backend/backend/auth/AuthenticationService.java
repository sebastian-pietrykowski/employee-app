package com.bootcamp.backend.backend.auth;

import com.bootcamp.backend.backend.employee.Employee;
import com.bootcamp.backend.backend.employee.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {
        Optional<Employee> response = this.employeeRepository.findUserByUsername(
                authenticationRequest.username()
        );
        if (response.isPresent() && passwordEncoder.matches(
                authenticationRequest.password(), response.get().getPassword())
        ) {
            return new AuthenticationResponse(authenticationRequest.username());
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }
}
