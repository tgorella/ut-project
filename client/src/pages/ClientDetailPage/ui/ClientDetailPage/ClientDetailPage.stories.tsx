import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import ClientDetailPage from "./ClientDetailPage";
import { clientDetailsStoreDecorator } from "@/shared/config/storybook/StoreDecorator/clientDetailsStoreDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ClientDetailPage> = {
  title: "pages/ClientDetailPage",
  component: ClientDetailPage,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ClientDetailPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {},
  decorators: [WithColorsTheme, clientDetailsStoreDecorator],
  parameters: {
    id: "643c5fe7013e22868a6eb63c",
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
