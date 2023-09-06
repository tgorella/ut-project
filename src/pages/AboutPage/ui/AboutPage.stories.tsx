import type {  Meta, StoryObj } from '@storybook/react';
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator';
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator';
import AboutPage from './AboutPage';

const meta: Meta<typeof AboutPage> = {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'Text'
  }
};


export default meta;
type Story = StoryObj<typeof AboutPage>;

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