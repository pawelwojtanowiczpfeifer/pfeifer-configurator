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
} from "./MyDrawingCanvas";

type MyDrawingScaleGroupProps = {
  children: ReactNode;
};

type ScaleGroupChildProps = {
  children?: ReactNode;
  fitBounds?: DrawingBounds;
};

type ScaleGroupChildType = {
  getBounds?: (props: ScaleGroupChildProps) => DrawingBounds | null;
};

export default function MyDrawingScaleGroup({
  children,
}: MyDrawingScaleGroupProps) {
  const sharedBounds =
    mergeDrawingBounds(
      Children.toArray(children).flatMap((child) => {
        if (!isValidElement<ScaleGroupChildProps>(child)) {
          return [];
        }

        const element = child as ReactElement<ScaleGroupChildProps>;
        const elementType = element.type as ScaleGroupChildType;

        if (elementType.getBounds) {
          const bounds = elementType.getBounds(element.props);
          return bounds ? [bounds] : [];
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
