import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import ProjectEdit from "./ProjectEdit";
import {
  EditProjectStoreDecorator,
  orderStatusesErrorStoreDecorator,
} from "@/shared/config/storybook/StoreDecorator/ProjectStoreDecorator";

const meta: Meta<typeof ProjectEdit> = {
  title: "widgets/ProjectEdit",
  component: ProjectEdit,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectEdit>;

export const Default: Story = {
  args: {},
  decorators: [WithColorsTheme, EditProjectStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const Error: Story = {
  args: {},
  decorators: [WithColorsTheme, orderStatusesErrorStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
