package com.healthai.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "providers")
public class Provider {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    private String name;
    private String phone;
    private String address;
    private String licenseNumber;
    private String specialty;

    private Boolean phoneValid;
    private Boolean addressValid;
    private Boolean licenseValid;
    private Integer confidenceScore;
    private String status;

    private LocalDateTime validatedAt;

    // --- GETTERS AND SETTERS ---

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    public Boolean getPhoneValid() { return phoneValid; }
    public void setPhoneValid(Boolean phoneValid) { this.phoneValid = phoneValid; }

    public Boolean getAddressValid() { return addressValid; }
    public void setAddressValid(Boolean addressValid) { this.addressValid = addressValid; }

    public Boolean getLicenseValid() { return licenseValid; }
    public void setLicenseValid(Boolean licenseValid) { this.licenseValid = licenseValid; }

    public Integer getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Integer confidenceScore) { this.confidenceScore = confidenceScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getValidatedAt() { return validatedAt; }
    public void setValidatedAt(LocalDateTime validatedAt) { this.validatedAt = validatedAt; }
}
