import React from "react";
import { Card } from "../ui/card";
import { useMenuCalculations } from "@/hooks/useMenuCalculations";

export default function TrayPriceCard({
  data,
  regularPrice,
  addMenu = false,
}: {
  data: { minimumPax: number; maximumPax: number; price: number };
  regularPrice: number;
  addMenu?: boolean;
}) {
  const { calculateSavings, calculatePrice } = useMenuCalculations();
  const { minimumPax, maximumPax } = data;
  let { price } = data;
  price = Number(price);
  let discountRate = 0;
  if (maximumPax === 6) {
    discountRate = 0.0308;
  }
  if (maximumPax === 10) {
    discountRate = 0.0646;
  }
  if (maximumPax === 15) {
    discountRate = 0.0903;
  }
  if (maximumPax === 20) {
    discountRate = 0.14;
  }
  const pricePerPax = calculatePrice(regularPrice, maximumPax).toFixed(2);
  const priceDiscountAmount = Math.round(
    calculatePrice(regularPrice, maximumPax) * discountRate
  ).toFixed(2);
  const discountFinal = (
    Number(pricePerPax) - Number(priceDiscountAmount)
  ).toFixed(2);

  return (
    <Card key={price} className="flex justify-between items-center p-2">
      <div>
        <p className="font-medium">{`${minimumPax} - ${maximumPax}`} pax</p>
        <p className="text-sm text-muted-foreground">
          &#8369;
          {addMenu ? discountFinal : price.toFixed(2)} per person
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold">
          &#8369;
          {addMenu ? discountFinal : price.toFixed(2)}
        </p>
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Save &#8369;
          {addMenu
            ? priceDiscountAmount
            : calculateSavings({
                regularPricePerPax: regularPrice,
                price: price,
                servingSize: maximumPax,
              }).toFixed(2)}
        </p>
      </div>
    </Card>
  );
}
