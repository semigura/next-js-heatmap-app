// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Task from "../components/Task";

export default {
  component: Task,
} as ComponentMeta<typeof Task>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Task> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Task {...args} />
);

export const Default = Template.bind({});
Default.args = {};
