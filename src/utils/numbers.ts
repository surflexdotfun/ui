import BigNumber from "bignumber.js";

export const formatBalance = (balance: number, decimal?: number) => {
  const integerPart = Math.floor(balance);
  const decimalPart = balance - integerPart;
  const formattedIntegerPart = integerPart.toLocaleString();
  const multiplier = Math.pow(10, decimal || 0);
  const roundedDown = Math.floor(decimalPart * multiplier) / multiplier;
  const formattedDecimalPart = roundedDown.toString().slice(2);
  return `${formattedIntegerPart}.${formattedDecimalPart}`;
}

export const mistToSui = (mist: string) => {
  return BigNumber(mist).div(BigNumber(10).pow(9)).toNumber();
}
