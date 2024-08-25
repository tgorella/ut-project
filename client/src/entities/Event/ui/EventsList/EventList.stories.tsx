import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { Event } from "../../model/types/Event";
import { EventsList } from "./EventsList";

const meta: Meta<typeof EventsList> = {
  title: "entities/Event/List",
  component: EventsList,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventsList>;

const event: Event[] = [
  {
    title: "Стоматолог",
    eventDate: "2024-02-12",
    startTime: "12:00",
    endTime: "15:00",
    place: "Moscow",
    eventType: "personal",
    _id: "sldjlsdj893945mnbxwe8",
    notes: "Не забыть с собой документы",
    userId: "9348kjr873l34",
  },
  {
    title: "Боулинг",
    eventDate: "2024-01-25",
    startTime: "17:00",
    endTime: "20:00",
    place: "Moscow",
    eventType: "friends",
    _id: "sldjlsdj89sfsdf34bxwe8",
    notes: "Не забыть с собой документы",
    userId: "9348kjr873l34",
  },
];
export const Default: Story = {
  args: {
    events: event,
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const WithError: Story = {
  args: {
    error: "Error",
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
