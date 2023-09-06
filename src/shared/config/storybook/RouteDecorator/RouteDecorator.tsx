import { Decorator } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export const RouteDecorator: Decorator = (Story) => (
  <BrowserRouter>
      {Story()}
      </BrowserRouter>
)