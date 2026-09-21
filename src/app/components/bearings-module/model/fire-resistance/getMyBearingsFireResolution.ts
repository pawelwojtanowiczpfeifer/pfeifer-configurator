import type { MyBearingsFireResistanceStrategy } from "./getMyBearingsFireResistanceStrategy";

type MyBearingsUnprotectedFireBearingTypeCode =
  | "Compression"
  | "S 65"
  | "S 70"
  | "CR 2000";

export type MyBearingsFireCheckStatus = "pass" | "fail";

export type MyBearingsFireResolution =
  | { action: "accept-base" }
  | {
      action: "try-next-unprotected-type";
      nextBearingTypeCode: MyBearingsUnprotectedFireBearingTypeCode;
    }
  | { action: "accept-next-unprotected-type" }
  | { action: "use-mineral-wool-on-base" };

export type MyBearingsFireResolutionInput = {
  baseBearingTypeCode: string;
  baseFireStrategy: MyBearingsFireResistanceStrategy;
  baseFireCheckStatus: MyBearingsFireCheckStatus | null;
  /** Present only after the single permitted stronger-type attempt. */
  nextTypeFireCheckStatus?: MyBearingsFireCheckStatus;
};

const NEXT_UNPROTECTED_FIRE_TYPE: Record<
  MyBearingsUnprotectedFireBearingTypeCode,
  MyBearingsUnprotectedFireBearingTypeCode | null
> = {
  Compression: "S 65",
  "S 65": "S 70",
  "S 70": "CR 2000",
  "CR 2000": null,
};

function getNextUnprotectedFireBearingTypeCode(
  bearingTypeCode: string,
): MyBearingsUnprotectedFireBearingTypeCode | null {
  if (
    !Object.prototype.hasOwnProperty.call(
      NEXT_UNPROTECTED_FIRE_TYPE,
      bearingTypeCode,
    )
  ) {
    return null;
  }

  return NEXT_UNPROTECTED_FIRE_TYPE[
    bearingTypeCode as MyBearingsUnprotectedFireBearingTypeCode
  ];
}

/**
 * Applies the approved one-step fire policy:
 * - a base type that passes remains selected;
 * - a failing unprotected base type gets one stronger unprotected attempt;
 * - a failed attempt, a final type, or a type without an unprotected rate
 *   returns to the base type with mineral wool.
 */
export function getMyBearingsFireResolution({
  baseBearingTypeCode,
  baseFireStrategy,
  baseFireCheckStatus,
  nextTypeFireCheckStatus,
}: MyBearingsFireResolutionInput): MyBearingsFireResolution {
  if (
    baseFireStrategy === "not-required" ||
    baseFireCheckStatus === "pass"
  ) {
    return { action: "accept-base" };
  }

  if (baseFireStrategy === "mineral-wool-required") {
    return { action: "use-mineral-wool-on-base" };
  }

  const nextBearingTypeCode = getNextUnprotectedFireBearingTypeCode(
    baseBearingTypeCode,
  );

  if (nextBearingTypeCode == null) {
    return { action: "use-mineral-wool-on-base" };
  }

  if (nextTypeFireCheckStatus == null) {
    return {
      action: "try-next-unprotected-type",
      nextBearingTypeCode,
    };
  }

  return nextTypeFireCheckStatus === "pass"
    ? { action: "accept-next-unprotected-type" }
    : { action: "use-mineral-wool-on-base" };
}
