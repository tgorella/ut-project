import type { Meta, StoryObj } from '@storybook/react';
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator';
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'widgets/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};


export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Dark: Story = {
  args: {
  },
  decorators: [
    DarkDecorator
  ]
};

export const Light: Story = {
  args: {
  },
  decorators: [
   LightDecorator
  ]
};