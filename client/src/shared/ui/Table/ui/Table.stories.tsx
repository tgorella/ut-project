import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { Table } from "./Table";
import { Column } from "../model/types/tableSchema";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Table> = {
  title: "shared/Table",
  component: Table,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns: Column[] = [
  { name: "Имя", path: "name" },
  { name: "Фамилия", path: "lastname" },
  { name: "Возраст", path: "age" },
];

const data: Array<Record<string, boolean | string | undefined>> = [
  { name: "John", lastname: "Doe", age: "28" },
  { name: "Merry", lastname: "Poppins", age: "34" },
  { name: "Tom", lastname: "Sower", age: "12" },
];
export const Default: Story = {
  args: {
    columns: columns,
    data: data,
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
