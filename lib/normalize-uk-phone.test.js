import { describe, it, expect } from 'vitest';
import { normalizeUKPhone } from './normalize-uk-phone.js';

describe('normalizeUKPhone', () => {
  it('should normalize UK mobile numbers starting with 07', () => {
    expect(normalizeUKPhone('07123456789')).toBe('+447123456789');
    expect(normalizeUKPhone('07987654321')).toBe('+447987654321');
  });

  it('should handle numbers with spaces and formatting', () => {
    expect(normalizeUKPhone('07123 456 789')).toBe('+447123456789');
    expect(normalizeUKPhone('07-123-456-789')).toBe('+447123456789');
    expect(normalizeUKPhone('(07) 123 456 789')).toBe('+447123456789');
  });

  it('should handle numbers already starting with +44', () => {
    expect(normalizeUKPhone('+447123456789')).toBe('+447123456789');
    expect(normalizeUKPhone('+447987654321')).toBe('+447987654321');
  });

  it('should handle numbers starting with 44 (without +)', () => {
    expect(normalizeUKPhone('447123456789')).toBe('+447123456789');
    expect(normalizeUKPhone('447987654321')).toBe('+447987654321');
  });

  it('should handle numbers without country code', () => {
    expect(normalizeUKPhone('7123456789')).toBe('+447123456789');
    expect(normalizeUKPhone('7987654321')).toBe('+447987654321');
  });

  it('should return null for invalid UK mobile numbers', () => {
    // Not a mobile number (doesn't start with 7)
    expect(normalizeUKPhone('02071234567')).toBe(null);
    expect(normalizeUKPhone('+442071234567')).toBe(null);
    
    // Wrong length
    expect(normalizeUKPhone('0712345')).toBe(null);
    expect(normalizeUKPhone('071234567890')).toBe(null);
    
    // Empty or invalid input
    expect(normalizeUKPhone('')).toBe(null);
    expect(normalizeUKPhone('abc')).toBe(null);
  });

  it('should handle non-UK numbers gracefully', () => {
    expect(normalizeUKPhone('+1234567890')).toBe(null);
    expect(normalizeUKPhone('+33123456789')).toBe(null);
  });

  it('should handle edge cases', () => {
    expect(normalizeUKPhone('0')).toBe(null);
    expect(normalizeUKPhone('+44')).toBe(null);
    expect(normalizeUKPhone('44')).toBe(null);
  });
});
