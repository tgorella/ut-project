import type { Meta, StoryObj } from "@storybook/react";
import { PageLoader } from "./PageLoader";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";

const meta: Meta<typeof PageLoader> = {
  title: "widgets/PageLoader",
  component: PageLoader,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
  decorators: [WithColorsTheme],
};
