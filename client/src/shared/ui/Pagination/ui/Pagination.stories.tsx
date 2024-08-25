import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";

const meta: Meta<typeof Pagination> = {
  title: "shared/Pagination",
  component: Pagination,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 2,
    itemsLength: 64,
    itemsPerPage: 30,
    onPageChange: () => {},
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    itemsLength: 64,
    itemsPerPage: 30,
    onPageChange: () => {},
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 3,
    itemsLength: 64,
    itemsPerPage: 30,
    onPageChange: () => {},
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const WithoutTotalPages: Story = {
  args: {
    currentPage: 2,
    itemsLength: 64,
    itemsPerPage: 30,
    pages: false,
    onPageChange: () => {},
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};

export const WithoutTotalItems: Story = {
  args: {
    currentPage: 2,
    itemsLength: 64,
    itemsPerPage: 30,
    totalItems: false,
    onPageChange: () => {},
  },
  decorators: [WithColorsTheme],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
