package com.bootcamp.backend.backend.exception;

import com.bootcamp.backend.backend.employee.exception.*;
import com.bootcamp.backend.backend.project.exception.*;
import com.bootcamp.backend.backend.skill.exception.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DifferentEmployeeIdInPathAndBodyException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            DifferentEmployeeIdInPathAndBodyException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(DifferentProjectIdInPathAndBodyException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            DifferentProjectIdInPathAndBodyException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(DifferentSkillIdInPathAndBodyException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            DifferentSkillIdInPathAndBodyException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EmployeeAlreadyExistsException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            EmployeeAlreadyExistsException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            EmployeeNotFoundException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ManagerWasNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            ManagerWasNotFoundException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProjectAlreadyExistsException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            ProjectAlreadyExistsException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            ProjectNotFoundException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SkillAlreadyExistsException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            SkillAlreadyExistsException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(SkillNotFoundException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleException(
            SkillNotFoundException e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e,
            HttpServletRequest request
    ) {
        String errors = e.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));

        return handleExceptionHelper(e, request, HttpStatus.CONFLICT, errors);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<ApiError> handleGlobalException(
            Exception e,
            HttpServletRequest request
    ) {
        return handleExceptionHelper(e, request, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ApiError> handleExceptionHelper(
            Exception e,
            HttpServletRequest request,
            HttpStatus httpStatus
    ) {
        return handleExceptionHelper(e, request, httpStatus, e.getMessage());
    }

    private ResponseEntity<ApiError> handleExceptionHelper(
            Exception e,
            HttpServletRequest request,
            HttpStatus httpStatus,
            String message
    ) {
        ApiError apiError = new ApiError(request.getRequestURI(), httpStatus, message, LocalDate.now());
        return ResponseEntity.status(httpStatus).body(apiError);
    }
}
