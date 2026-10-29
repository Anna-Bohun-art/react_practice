function assertPositive(name: string, value: number): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number, got ${value}`)
  }
}

function calculateBsa(weightKg: number, heightCm: number): number {
  assertPositive('weightKg', weightKg)
  assertPositive('heightCm', heightCm)
  const bsa = Math.sqrt((heightCm * weightKg) / 3600)
  return Math.round(bsa * 100) / 100
}

function calculateDoseByBsa(bsa: number, dosePerM2: number): number {
  assertPositive('bsa', bsa)
  assertPositive('dosePerM2', dosePerM2)
  return bsa * dosePerM2
}

function calculateDoseByWeight(weightKg: number, dosePerKg: number): number {
  assertPositive('weightKg', weightKg)
  assertPositive('dosePerKg', dosePerKg)
  return weightKg * dosePerKg
}

export { calculateBsa, calculateDoseByBsa, calculateDoseByWeight }
