import type { Meta, StoryObj } from "@storybook/react";
import "@/app/styles/index.scss";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { ProjectBlock } from "./ProjectBlock";
import { UserStoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Project } from "../../model/types/Project";

const meta: Meta<typeof ProjectBlock> = {
  title: "entities/Project/Block",
  component: ProjectBlock,
  argTypes: {},
  tags: ["autodocs"],
};
const project: Project = {
  _id: "jhmgjh54rhre",
  name: "Разработка бренд бука",
  userId: "апвапр",
  stages: [
    {
      _id: "",
      name: "Подготовка",
      userId: "",
      projectId: "",
      index: 0,
      steps: [
        {
          _id: "skjfsh",
          name: "Подписать договор",
          projectId: "",
          userId: "",
          stageId: "",
          index: 1,
        },
        {
          _id: "wrwerr453",
          name: "Заполнить бриф / ТЗ",
          projectId: "",
          userId: "",
          stageId: "",
          index: 2,
        },
        {
          _id: "s3443ghfhsh",
          name: "Аванс",
          projectId: "",
          userId: "",
          stageId: "",
          index: 3,
        },
      ],
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectBlock>;

export const Default: Story = {
  args: {
    project: project,
  },
  decorators: [WithColorsTheme, UserStoreDecorator],
  parameters: {
    docs: {
      canvas: { sourceState: "shown" },
    },
  },
};
