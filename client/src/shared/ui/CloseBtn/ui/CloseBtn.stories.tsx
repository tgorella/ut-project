/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from "@storybook/react";
import { CloseBtn } from "./CloseBtn";
import { DarkDecorator } from "@/shared/config/storybook/ThemeDecorator/DarkDecorator";
import { LightDecorator } from "@/shared/config/storybook/ThemeDecorator/LightDecorator";

const meta: Meta<typeof CloseBtn> = {
  title: "shared/CloseBtn",
  component: CloseBtn,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CloseBtn>;

export const Dark: Story = {
  args: {
    onClose: () => {},
  },
  decorators: [DarkDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const DarLightk: Story = {
  args: {
    onClose: () => {},
  },
  decorators: [LightDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
