import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import SettingPage from "./SettingPage";
import { EditPageStoreDecorator } from "@/shared/config/storybook/StoreDecorator/settingPageStoreDecorator";
import { TeamMemberStoreDecorator } from "@/shared/config/storybook/StoreDecorator/teamMemberStoreDecorator";

const meta: Meta<typeof SettingPage> = {
  title: "pages/SettingPage",
  component: SettingPage,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SettingPage>;

export const OwnerAndManager: Story = {
  args: {},
  decorators: [WithColorsTheme, EditPageStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const TeamMember: Story = {
  args: {},
  decorators: [WithColorsTheme, TeamMemberStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
