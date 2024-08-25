import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { EventExtended } from "../../model/types/Event";
import { EventBlock } from "./EventBlock";

const meta: Meta<typeof EventBlock> = {
  title: "entities/Event/EventBlock",
  component: EventBlock,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventBlock>;

const event: EventExtended = {
  title: "Тестовый заказ",
  eventDate: "2024-02-12",
  startTime: "12:00",
  endTime: "15:00",
  place: "Moscow",
  eventType: {
    _id: "6467834500aba6813881d4",
    name: "Друзья",
    color: "blue",
    isDefault: false,
  },
  _id: "sldjlsdj893945mnbxwe8",
  notes: "Не забыть с собой документы",
  userId: "9348kjr873l34",
};

export const Default: Story = {
  args: {
    event: event,
    color: "yellow",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
