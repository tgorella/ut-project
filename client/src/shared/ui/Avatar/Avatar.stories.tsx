import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { Avatar, AvatarSize } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "shared/Avatar",
  component: Avatar,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
  args: {
    size: AvatarSize.S,
    src: "https://avatars.githubusercontent.com/u/107557323?v=4",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const Medium: Story = {
  args: {
    size: AvatarSize.M,
    src: "https://avatars.githubusercontent.com/u/107557323?v=4",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const Large: Story = {
  args: {
    size: AvatarSize.L,
    src: "https://avatars.githubusercontent.com/u/107557323?v=4",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const XLarge: Story = {
  args: {
    size: AvatarSize.XL,
    src: "https://avatars.githubusercontent.com/u/107557323?v=4",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const WithoutSRC: Story = {
  args: {
    size: AvatarSize.XL,
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
