package com.healthai.controller;

import com.healthai.model.Provider;
import com.healthai.repository.ProviderRepository;
import com.healthai.service.ProviderValidationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*") // allows frontend calls
public class ProviderController {

    private final ProviderRepository providerRepository;
    private final ProviderValidationService validationService;

    public ProviderController(ProviderRepository providerRepository,
                              ProviderValidationService validationService) {
        this.providerRepository = providerRepository;
        this.validationService = validationService;
    }

    // --- GET all providers
    @GetMapping
    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    // --- GET provider by ID
    @GetMapping("/{id}")
    public Optional<Provider> getProviderById(@PathVariable UUID id) {
        return providerRepository.findById(id);
    }

    // --- POST a new provider
    @PostMapping
    public Provider addProvider(@RequestBody Provider provider) {
        return providerRepository.save(provider);
    }

    // --- PUT: Update existing provider
    @PutMapping("/{id}")
    public Provider updateProvider(@PathVariable UUID id, @RequestBody Provider updatedProvider) {
        return providerRepository.findById(id).map(provider -> {
            provider.setName(updatedProvider.getName());
            provider.setPhone(updatedProvider.getPhone());
            provider.setAddress(updatedProvider.getAddress());
            provider.setLicenseNumber(updatedProvider.getLicenseNumber());
            provider.setSpecialty(updatedProvider.getSpecialty());
            return providerRepository.save(provider);
        }).orElseThrow(() -> new RuntimeException("Provider not found with id " + id));
    }

    // --- DELETE a provider
    @DeleteMapping("/{id}")
    public void deleteProvider(@PathVariable UUID id) {
        providerRepository.deleteById(id);
    }

    // --- POST: Batch validation for all providers
    @PostMapping("/validate-all")
    public List<Provider> validateAllProviders() {
        List<Provider> providers = providerRepository.findAll();

        for (int i = 0; i < providers.size(); i++) {
            Provider validated = validationService.validateAndScoreProvider(providers.get(i));
            providers.set(i, validated); // update list
        }

        return providers; // return updated providers
    }
}
