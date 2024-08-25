/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from "@storybook/react";
import { DarkDecorator } from "@/shared/config/storybook/ThemeDecorator/DarkDecorator";
import { LightDecorator } from "@/shared/config/storybook/ThemeDecorator/LightDecorator";
import { PreviewWindow } from "./PreviewWindow";
import { Text } from "../../Text";

const meta: Meta<typeof PreviewWindow> = {
  title: "shared/PreviewWindow",
  component: PreviewWindow,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PreviewWindow>;

export const Dark: Story = {
  args: {
    isOpen: true,
    children: (
      <Text
        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, dolor debitis! Dolor ut consectetur optio"
        title="Lorem ipsum dolor"
      />
    ),
  },
  decorators: [DarkDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const Light: Story = {
  args: {
    isOpen: true,
    children: (
      <Text
        text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, dolor debitis! Dolor ut consectetur optio"
        title="Lorem ipsum dolor"
      />
    ),
  },
  decorators: [LightDecorator],
};
