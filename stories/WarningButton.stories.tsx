// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from "@storybook/react";

import WarningButton from "../components/WarningButton";

export default {
  component: WarningButton,
} as ComponentMeta<typeof WarningButton>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof WarningButton> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <WarningButton {...args} />
);

export const Default = Template.bind({});
Default.args = { children: "button" };
