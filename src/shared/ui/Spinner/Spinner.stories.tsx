import type {  Meta, StoryObj } from '@storybook/react';
import { DarkDecorator } from 'shared/config/storybook/ThemeDecorator/DarkDecorator';
import { LightDecorator } from 'shared/config/storybook/ThemeDecorator/LightDecorator';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'shared/Spinner',
  component: Spinner,
  argTypes: {
  }
};


export default meta;
type Story = StoryObj<typeof Spinner>;

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