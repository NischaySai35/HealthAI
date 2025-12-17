const FIRST_NAMES = ['Dr. Michael', 'Dr. Sarah', 'Dr. James', 'Dr. Jennifer', 'Dr. Robert', 'Dr. Emily'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
const SPECIALTIES = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'General Practice'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
const STATES = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'];

/**
 * Generate sample provider data for demo
 * @param {number} count - Number of providers to generate
 * @returns {Array} Provider records
 */
export function generateSampleProviders(count) {
  const providers = [];

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const stateIdx = CITIES.indexOf(city);
    const state = STATES[stateIdx];
    const specialty = SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)];

    providers.push({
      name: `${firstName} ${lastName}`,
      specialty,
      phone: generatePhoneNumber(),
      address: `${Math.floor(Math.random() * 9000) + 1000} Main St, ${city}, ${state}`,
      license: generateLicenseNumber(),
      npi: generateNPI(),
    });
  }

  return providers;
}

/**
 * Generate realistic phone number
 */
function generatePhoneNumber() {
  const valid = Math.random() > 0.15; // 85% valid

  if (!valid) {
    // Generate invalid phone
    return `${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 9000) + 1000}`;
  }

  return `${Math.floor(Math.random() * 900) + 200}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

/**
 * Generate license number
 */
function generateLicenseNumber() {
  return `LIC${Math.floor(Math.random() * 9000000) + 1000000}`;
}

/**
 * Generate NPI (National Provider Identifier)
 */
function generateNPI() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

/**
 * Validate providers and return detailed results
 * FAKE LOGIC - returns randomized validation results
 * @param {Array} providers - Provider records to validate
 * @returns {Array} Validation results with confidence scores
 */
export function validateProviders(providers) {
  return providers.map(provider => {
    // Simulate validation checks
    const phoneValid = Math.random() > 0.15; // 85% valid
    const addressValid = Math.random() > 0.10; // 90% valid
    const licenseValid = Math.random() > 0.08; // 92% valid

    // Calculate confidence score based on validations
    let confidence = 100;
    if (!phoneValid) confidence -= 25;
    if (!addressValid) confidence -= 20;
    if (!licenseValid) confidence -= 30;

    // Add randomization (+/- 5%)
    confidence += (Math.random() - 0.5) * 10;
    confidence = Math.max(0, Math.min(100, Math.round(confidence)));

    // Determine action based on confidence
    const action = confidence >= 85 ? 'approved' : 'review';

    return {
      ...provider,
      phoneValid,
      addressValid,
      licenseValid,
      confidence,
      action,
      validatedAt: new Date().toISOString(),
    };
  });
}
