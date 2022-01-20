// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LastSubmittedDate from "../components/LastSubmittedDate";

export default {
  component: LastSubmittedDate,
} as ComponentMeta<typeof LastSubmittedDate>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof LastSubmittedDate> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LastSubmittedDate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  filteredList: [{ id: "1", date: new Date() }],
};
