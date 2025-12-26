package com.healthai.service;

import com.healthai.model.Provider;
import com.healthai.repository.ProviderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProviderService {

    private final ProviderRepository providerRepository;

    public ProviderService(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    // Save or update provider
    public Provider saveProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    // Get all providers
    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    // Get providers by status
    public List<Provider> getProvidersByStatus(String status) {
        return providerRepository.findByStatus(status);
    }

    // Get provider by ID
    public Provider getProviderById(UUID id) {
        return providerRepository.findById(id).orElse(null);
    }
}
