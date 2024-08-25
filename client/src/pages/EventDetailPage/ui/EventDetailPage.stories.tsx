import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { EventDetailPage } from "./EventDetailPage";
import { eventDetailStoreDecorator } from "@/shared/config/storybook/StoreDecorator/EventDetailStoreDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EventDetailPage> = {
  title: "pages/EventDetailPage",
  component: EventDetailPage,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventDetailPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {},
  decorators: [WithColorsTheme, eventDetailStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
