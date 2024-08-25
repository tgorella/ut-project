import type { Meta, StoryObj } from "@storybook/react";
import "app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { Textarea } from "./Textarea";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Textarea> = {
  title: "shared/Textarea",
  component: Textarea,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    onChange: () => {},
    rows: 5,
    name: "name",
    value: "Text here \n and another row",
    label: "description",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
