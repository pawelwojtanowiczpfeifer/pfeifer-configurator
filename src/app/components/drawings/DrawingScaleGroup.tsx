import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  getDrawingBoundsFromChildren,
  mergeDrawingBounds,
  type DrawingBounds,
} from "./DrawingCanvas";

type DrawingScaleGroupProps = {
  children: ReactNode;
};

type ScaleGroupChildProps = {
  children?: ReactNode;
  fitBounds?: DrawingBounds;
};

export default function DrawingScaleGroup({
  children,
}: DrawingScaleGroupProps) {
  const sharedBounds =
    mergeDrawingBounds(
      Children.toArray(children).flatMap((child) => {
        if (!isValidElement<ScaleGroupChildProps>(child)) {
          return [];
        }

        const bounds = getDrawingBoundsFromChildren(child.props.children);
        return bounds ? [bounds] : [];
      }),
    ) ?? undefined;

  return Children.map(children, (child) => {
    if (!isValidElement<ScaleGroupChildProps>(child) || !sharedBounds) {
      return child;
    }

    return cloneElement(child as ReactElement<ScaleGroupChildProps>, {
      fitBounds: sharedBounds,
    });
  });
}
