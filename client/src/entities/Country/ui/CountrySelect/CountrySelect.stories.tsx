import type { Meta, StoryObj } from "@storybook/react";
import { WithColorsTheme } from "@/shared/config/storybook/ThemeDecorator/WithColorsTheme";
import { CountrySelect } from "../CountrySelect/CountrySelect";
import { Country } from "../../model/types/country";

const meta: Meta<typeof CountrySelect> = {
  title: "entities/CountrySelect",
  component: CountrySelect,
};

let country = Country.UK;
const handleChange = (value: Country) => {
  country = value;
};
export default meta;
type Story = StoryObj<typeof CountrySelect>;

export const Default: Story = {
  args: {
    value: country,
    onChange: handleChange,
  },
  decorators: [WithColorsTheme],
};
