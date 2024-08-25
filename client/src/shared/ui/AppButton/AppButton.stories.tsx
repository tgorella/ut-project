import type { Meta, StoryObj } from "@storybook/react";
import { AppButton, ButtonSize, ButtonTheme } from "./AppButton";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppButton> = {
  title: "shared/Button",
  component: AppButton,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "Text",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const Rounded: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "Text",
    rounded: true,
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const LargeSize: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "Text",
    size: ButtonSize.L,
  },
  decorators: [WithColorsTheme],
};

export const XLargeSize: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "Text",
    size: ButtonSize.XL,
  },
  decorators: [WithColorsTheme],
};

export const SquareMedium: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "+",
    square: true,
  },
  decorators: [WithColorsTheme],
};

export const SquareLarge: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "+",
    square: true,
    size: ButtonSize.L,
  },
  decorators: [WithColorsTheme],
};

export const SquareXLarge: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "+",
    square: true,
    size: ButtonSize.XL,
  },
  decorators: [WithColorsTheme],
};

export const Solid: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "Button",
  },
  decorators: [WithColorsTheme],
};

export const Clear: Story = {
  args: {
    theme: ButtonTheme.CLEAR,
    children: "Button",
  },
  decorators: [WithColorsTheme],
};

export const Outlined: Story = {
  args: {
    theme: ButtonTheme.OUTLINED,
    children: "Button",
  },
  decorators: [WithColorsTheme],
};

export const Disabled: Story = {
  args: {
    theme: ButtonTheme.SOLID,
    children: "Button",
    disabled: true,
  },
  decorators: [WithColorsTheme],
};
