# Exercise: Tablet Dose Calculator

> Practice only. The drugs and numbers below are made up. Never use this for real patients.

## The task

Build a small React + TypeScript app. It takes a patient's weight and height and works out how many tablets they should take, and how much that is in grams.

### Background: how chemo doses work

Chemotherapy doses are usually given **per square metre of body surface area (BSA)**, not per kg.

1. **BSA (Mosteller formula):** `BSA (m²) = √( height_cm × weight_kg / 3600 )`
2. **Dose:** `dose_mg = BSA × dose_per_m2`
   (some drugs are dosed per kg instead: `dose_mg = weight_kg × dose_per_kg`)
3. **Tablets:** a tablet has a fixed strength (e.g. 500 mg), so the dose has to be rounded to a whole number of tablets.
4. **Grams:** `grams = tablets × strength_mg / 1000`

### Made-up drug list

| Drug      | Dosing basis | Dose         | Tablet strength |
|-----------|--------------|--------------|-----------------|
| Oncotab   | BSA          | 1000 mg/m²   | 500 mg          |
| Curamid   | BSA          | 250 mg/m²    | 100 mg          |
| Weightix  | Weight       | 10 mg/kg     | 250 mg          |

## Requirements

### Part 1: the logic, as pure functions (`src/dosing.ts`)
Keep all the maths out of the components.

- `calculateBsa(weightKg, heightCm): number`, rounded to 2 decimals
- `calculateDoseMg(drug, weightKg, heightCm): number`
- `calculateTablets(doseMg, strengthMg): number`, rounded to the nearest whole tablet, minimum 1
- `toGrams(mg): number`

### Part 2: the UI (`src/App.tsx` + components)
- Number inputs for **weight (kg)** and **height (cm)**
- A `<select>` for the drug
- A result panel showing BSA (only for BSA-based drugs), exact dose in mg, number of tablets, total in grams, and the **deviation** between the rounded dose and the exact dose in %
- Results update live as you type (no submit button needed)

### Part 3: validation
- Empty, non-numeric, zero or negative values show an error and no result
- Implausible values show an error: weight outside 20–300 kg, height outside 100–250 cm
- Errors are shown next to the field they belong to (accessible: `aria-invalid`, `aria-describedby`)
- Show a warning (not an error) if the deviation is more than ±10 %

### Part 4: tests (Vitest + Testing Library, already set up: `npm test`)
Unit tests for `dosing.ts`:

| Input                          | Expected          |
|--------------------------------|-------------------|
| BSA 80 kg, 180 cm              | 2.00 m²           |
| BSA 70 kg, 175 cm              | 1.84 m²           |
| BSA 60 kg, 160 cm              | 1.63 m²           |
| Oncotab, 70 kg, 175 cm         | ~1845 mg → 4 tablets → 2.0 g (+8.4 %) |
| Weightix, 70 kg                | 700 mg → 3 tablets → 0.75 g |

Component tests:
- Typing a weight and height and picking a drug shows the right tablet count
- An invalid weight shows an error message and hides the result

## Stretch goals (choose any)
1. **BSA cap:** many hospitals cap BSA at 2.0 m². Add a checkbox "Cap BSA at 2.0 m²".
2. **Dose reduction:** a select for 100 % / 75 % / 50 % (doctors reduce doses because of side effects).
3. **Half tablets:** allow rounding to 0.5 if the drug is scored.
4. **Multiple strengths:** a drug has 500 mg *and* 150 mg tablets. Find the combination closest to the dose (e.g. 1845 mg → 3×500 + 2×150 = 1800 mg).
5. **Units:** an alternative input in lb / inches.
6. Use `useReducer` or a custom hook (`useDoseCalculator`) instead of several `useState`s.

## Things you should be able to explain
- Why you kept the calculation in pure functions (easy to test, no UI involved)
- How you handled floating-point rounding (`Math.round(x * 100) / 100`) and **when** you round (round only at the end, not at each step)
- Why validation matters especially in medical software (a typo like 700 kg instead of 70 kg means a 10× overdose)
- Number input pitfalls: `""` vs `0`, `valueAsNumber` giving `NaN`, German decimal comma `70,5`
- Accessibility of forms: labels, error messages, keyboard use
- Derived state: the result is *calculated* from the inputs during render and isn't stored in its own `useState`

Suggested time: Parts 1–4 in about 2–3 hours.
