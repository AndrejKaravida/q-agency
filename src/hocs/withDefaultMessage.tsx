import React from "react";

export interface WithMessageProps {
  message: string;
}

export function withMessage<T extends WithMessageProps = WithMessageProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithMessage = (props: Omit<T, keyof WithMessageProps>) => {
    const message = "Hello from";

    return <WrappedComponent {...(props as T)} message={message} />;
  };

  ComponentWithMessage.displayName = `withTheme(${displayName})`;

  return ComponentWithMessage;
}
