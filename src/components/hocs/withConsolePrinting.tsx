import { ComponentType, useEffect } from "react";

const withConsolePrinting = <P,>(OriginalComponent: ComponentType<P>) => {
  return (props: any) => {
    useEffect(() => {
      if (OriginalComponent.name) {
        console.log("Hello from " + OriginalComponent.name);
      }
    }, [props]);

    return <OriginalComponent {...props} />;
  };
};

export default withConsolePrinting;
