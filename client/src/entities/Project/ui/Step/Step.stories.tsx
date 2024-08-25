import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { Step } from "./Step";
import { UserStoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Step> = {
  title: "entities/Project/Step",
  component: Step,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Step>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    step: {
      _id: "sdfhkdjsfhgs",
      name: "Оплата",
      projectId: "",
      userId: "",
      stageId: "",
      index: 1,
    },
  },
  decorators: [WithColorsTheme, UserStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
