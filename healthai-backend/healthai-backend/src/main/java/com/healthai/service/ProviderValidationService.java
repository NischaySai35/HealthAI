package com.healthai.service;

import com.healthai.model.Provider;
import com.healthai.repository.ProviderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProviderValidationService {

    private final ProviderRepository providerRepository;

    public ProviderValidationService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    // Main method to validate, enrich, score, and save provider
    public Provider validateAndScoreProvider(Provider provider) {

        // --- Agent 1: Data Validation (simulate error rates)
        boolean phoneValid = validatePhone(provider.getPhone());
        boolean addressValid = validateAddress(provider.getAddress());
        boolean licenseValid = validateLicense(provider.getLicenseNumber());

        provider.setPhoneValid(phoneValid);
        provider.setAddressValid(addressValid);
        provider.setLicenseValid(licenseValid);

        // --- Agent 2: Enrichment
        provider.setSpecialty(enrichSpecialty(provider.getSpecialty()));

        // --- Agent 3: Confidence Scoring
        int confidence = calculateConfidence(phoneValid, addressValid, licenseValid);
        provider.setConfidenceScore(confidence);

        // --- Agent 4: Directory Management
        provider.setStatus(confidence >= 85 ? "AUTO_APPROVED" : "NEEDS_REVIEW");

        // Timestamp
        provider.setValidatedAt(LocalDateTime.now());

        // Save to database
        return providerRepository.save(provider);
    }

    // ---------------- Helper Methods ----------------

    private boolean validatePhone(String phone) {
        // 85% chance phone is valid
        return Math.random() > 0.15;
    }

    private boolean validateAddress(String address) {
        // 90% chance address is valid
        return Math.random() > 0.10;
    }

    private boolean validateLicense(String license) {
        // 92% chance license is valid
        return Math.random() > 0.08;
    }

    private String enrichSpecialty(String specialty) {
        if (specialty == null || specialty.isEmpty()) return "General Medicine";
        return specialty;
    }

    private int calculateConfidence(boolean phone, boolean address, boolean license) {
        int confidence = 100;
        confidence -= phone ? 0 : 25;
        confidence -= address ? 0 : 20;
        confidence -= license ? 0 : 30;
        return confidence;
    }
}
