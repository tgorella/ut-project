import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { ProjectRow } from "./ProjectRow";
import { OrderExtended } from "@/entities/Order";
import { EditProjectStoreDecorator } from "@/shared/config/storybook/StoreDecorator/ProjectStoreDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProjectRow> = {
  title: "entities/Project/StatusRow",
  component: ProjectRow,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  tags: ["autodocs"],
};

const order: OrderExtended = {
  clientId: {
    _id: "sdjldsjflsdjk",
    name: "Kristina Gold",
  },
  total: "20000",
  notes: "",
  eventDate: "",
  eventType: "",
  orderNumber: "",
  status: {
    _id: "sdlk89ftgd7jskgfrdfk",
    name: "В процессе",
    color: "#ffd129",
    isDefault: false,
  },
  title: "Брендбук Vaf work",
  userId: "",
  projectType: {
    _id: "",
    name: "",
    userId: "",
    stages: [],
  },
  steps: [
    "done",
    "done",
    "in_progress",
    "in_progress",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectRow>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    status: order.status,
    client: order.clientId,
    order: order,
  },
  decorators: [WithColorsTheme, EditProjectStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
