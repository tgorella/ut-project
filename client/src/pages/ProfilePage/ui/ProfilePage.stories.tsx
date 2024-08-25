import type { Meta, StoryObj } from "@storybook/react";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import ProfilePage from "./ProfilePage";
import { ProfileStoreDecorator } from "@/shared/config/storybook/StoreDecorator/ProfileStoreDecorator";

const meta: Meta<typeof ProfilePage> = {
  title: "pages/ProfilePage",
  component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  args: {},
  decorators: [WithColorsTheme, ProfileStoreDecorator],
};
