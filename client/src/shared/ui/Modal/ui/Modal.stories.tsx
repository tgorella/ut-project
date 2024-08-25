import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { DarkDecorator } from "@/shared/config/storybook/ThemeDecorator/DarkDecorator";
import { LightDecorator } from "@/shared/config/storybook/ThemeDecorator/LightDecorator";

const meta: Meta<typeof Modal> = {
  title: "widgets/Modal",
  component: Modal,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Dark: Story = {
  args: {
    isOpen: true,
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
  },
  decorators: [LightDecorator],
};
