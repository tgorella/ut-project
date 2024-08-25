import type { Meta, StoryObj } from "@storybook/react";
import { AppLink } from "./AppLink";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";

const meta: Meta<typeof AppLink> = {
  title: "shared/AppLink",
  component: AppLink,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: {
    to: "/",
    children: "Text",
  },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
  decorators: [WithColorsTheme],
};
