import { CalculationParams } from "@/types/menu-types";
import { useCallback } from "react";

export function useMenuCalculations() {
  const calculateSavings = useCallback(
    ({ regularPricePerPax, price, servingSize }: CalculationParams): number =>
      regularPricePerPax * servingSize - price,
    []
  );

  const calculateSavingsPercentage = useCallback(
    ({ regularPricePerPax, price, servingSize }: CalculationParams): number =>
      ((regularPricePerPax * servingSize - price) /
        (regularPricePerPax * servingSize)) *
      100,
    []
  );

  const calculatePricePerPax = useCallback(
    (price: number, servingSize: number): number => price / servingSize,
    []
  );

  const calculatePrice = useCallback(
    (regularPricePerPax: number, servingSize: number): number =>
      regularPricePerPax * servingSize,
    []
  );

  return {
    calculateSavings,
    calculateSavingsPercentage,
    calculatePricePerPax,
    calculatePrice,
  };
}
