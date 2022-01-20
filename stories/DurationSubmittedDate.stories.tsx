// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DurationSubmittedDate from "../components/DurationSubmittedDate";

export default {
  component: DurationSubmittedDate,
} as ComponentMeta<typeof DurationSubmittedDate>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof DurationSubmittedDate> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DurationSubmittedDate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  filteredList: [{ id: "1", date: new Date() }],
};
