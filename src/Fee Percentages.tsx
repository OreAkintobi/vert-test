const ARCHITECT_FEE_PERCENTAGES = [
  0.0475, 0.045, 0.0425, 0.04, 0.035, 0.03, 0.025,
];

const STRUCTURAL_ENGINEER_FEE_PERCENTAGES = [
  0.03, 0.025, 0.0225, 0.02, 0.0175, 0.015, 0.0125,
];

const ELECTRICAL_ENGINEER_FEE_PERCENTAGES = [
  0.0195, 0.0175, 0.0155, 0.0135, 0.0115, 0.01, 0.0085,
];

const MECHANICAL_ENGINEER_FEE_PERCENTAGES = [
  0.0195, 0.0175, 0.0155, 0.0135, 0.0115, 0.01, 0.0085,
];

const QUANTITY_SURVEYOR_FEE_PERCENTAGES = [
  0.0275, 0.025, 0.023, 0.02, 0.0175, 0.014, 0.01,
];

const COMPARISON_AMOUNTS = [
  [5000000, 5000000],
  [15000000, 10000000],
  [30000000, 15000000],
  [75000000, 45000000],
  [150000000, 75000000],
  [300000000, 150000000],
  [500000000, 200000000],
];

export const ESTIMATED_TOTAL_COST = 5000000000;

export const FEE_PERCENTAGES = {
  Architect_Fees: ARCHITECT_FEE_PERCENTAGES,
  Structural_Engineer_Fees: STRUCTURAL_ENGINEER_FEE_PERCENTAGES,
  Electrical_Engineer_Fees: ELECTRICAL_ENGINEER_FEE_PERCENTAGES,
  Mechanical_Engineer_Fees: MECHANICAL_ENGINEER_FEE_PERCENTAGES,
  Quantity_Surveyor_Fees: QUANTITY_SURVEYOR_FEE_PERCENTAGES,
};

export const getChargeableValues = (value: number) => {
  let finalValues: number[] = [];
  let sumToSubtract = 0;

  for (let i = 0; i < COMPARISON_AMOUNTS.length; i++) {
    if (value >= COMPARISON_AMOUNTS[i][0]) {
      finalValues.push(COMPARISON_AMOUNTS[i][1]);
    } else {
      finalValues.length === 0
        ? finalValues.push(value)
        : finalValues.push(value - sumToSubtract);
    }

    sumToSubtract += finalValues[i];
  }

  return finalValues.filter(
    (finalValue) => !Number.isNaN(finalValue) && finalValue > 0
  );
};
