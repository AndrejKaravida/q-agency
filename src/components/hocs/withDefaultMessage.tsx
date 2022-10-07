import { ComponentType } from "react";

type WithDefaultMessageTzpe = {
  message: string;
};

const withDefaultMessage = <P,>(OriginalComponent: ComponentType<P>) => {
  return (props: P & WithDefaultMessageTzpe) => {
    const { ...componentProps } = props;

    return (message = "Hello from") => (
      <OriginalComponent
        {...(componentProps as unknown as P)}
        message={message}
      />
    );
  };
};

export default withDefaultMessage;
