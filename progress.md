# Progress: Tablet Dose Calculator

Exercise: see `EXERCISE.md`.

**Working rule:** I write the code myself. Claude reviews it and gives hints only, unless I ask for changes.

## Done

### Part 1: logic (`src/dosing.ts`), partly done
- `calculateBsa(weightKg, heightCm)`: Mosteller formula, rounded to 2 decimals
- `calculateDoseByBsa(bsa, dosePerM2)`
- `calculateDoseByWeight(weightKg, dosePerKg)`
- `assertPositive(name, value)`: one shared check that throws an error naming the parameter
- Named exports, camelCase, no `any`
- Type-checks without errors, and a temporary check of the exercise values passed


## What I learned
- `Math.round(x, 2)` ignores the 2. Round to decimals with `Math.round(x * 100) / 100`
- Never use `any` (and `number | any` is just `any`). Return `number | null`, or throw for invalid input
- `=` assigns, `===` compares. `NaN === NaN` is `false`, so use `Number.isNaN` / `Number.isFinite`
- `Number.isFinite` catches both `NaN` and `Infinity`, and doesn't convert strings (unlike the global `isFinite` / `isNaN`)
- `NaN <= 0` is `false`, so a plain `<= 0` check lets `NaN` through
- Put repeated logic (the *condition*, not just the `throw`) in one helper
- Error messages should name the parameter, not just print values
- Named vs default exports: `export default { a, b }` doesn't allow `import { a }`
- A function that always throws has the return type `never`
- Use consistent naming: camelCase in JS/TS

## Next steps
1. **Review** `src/dosing.ts` and make sure I understand every line
2. **Write `src/dosing.test.ts`** (Part 4): BSA values (80/180 → 2, 70/175 → 1.84, 60/160 → 1.63), both dose functions, and the error cases (`NaN`, `Infinity`, negative)
3. **Drug type**: a field for the dosing basis (look up discriminated unions), the made-up drug list, and one `calculateDoseMg(drug, weightKg, heightCm)` that picks the right formula (look up exhaustiveness checking with `never`)
4. `calculateTablets(doseMg, strengthMg)` and `toGrams(mg)`
5. Part 2: UI, Part 3: validation, then stretch goals
