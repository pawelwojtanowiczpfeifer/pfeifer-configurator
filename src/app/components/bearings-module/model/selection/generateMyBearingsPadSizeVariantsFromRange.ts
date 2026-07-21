import type { MyBearingsPadSizeRange, MyBearingsPadSizeVariant } from "./types";

type GenerateMyBearingsPadSizeVariantsFromRangeInput = {
  range: MyBearingsPadSizeRange;
};

function createStep(value: number | undefined) {
  return value && value > 0 ? value : 10;
}

function alignToStep(value: number, step: number) {
  return Math.ceil(value / step) * step;
}

function createVariantCode(widthMm: number, lengthMm: number) {
  return `${widthMm}x${lengthMm}`;
}

export function generateMyBearingsPadSizeVariantsFromRange({
  range,
}: GenerateMyBearingsPadSizeVariantsFromRangeInput): MyBearingsPadSizeVariant[] {
  const widthStepMm = createStep(range.widthStepMm);
  const lengthStepMm = createStep(range.lengthStepMm);

  const adjustedMinWidthMm = alignToStep(range.minWidthMm, widthStepMm);
  const adjustedMinLengthMm = alignToStep(range.minLengthMm, lengthStepMm);

  const variants: MyBearingsPadSizeVariant[] = [];

  for (
    let widthMm = adjustedMinWidthMm;
    widthMm <= range.maxWidthMm;
    widthMm += widthStepMm
  ) {
    for (
      let lengthMm = adjustedMinLengthMm;
      lengthMm <= range.maxLengthMm;
      lengthMm += lengthStepMm
    ) {
      variants.push({
        code: createVariantCode(widthMm, lengthMm),
        widthMm,
        lengthMm,
        label: `${widthMm} x ${lengthMm} mm`,
      });
    }
  }

  return variants.sort((left, right) => {
    const leftArea = left.widthMm * left.lengthMm;
    const rightArea = right.widthMm * right.lengthMm;

    if (leftArea !== rightArea) {
      return leftArea - rightArea;
    }

    if (left.widthMm !== right.widthMm) {
      return left.widthMm - right.widthMm;
    }

    return left.lengthMm - right.lengthMm;
  });
}

