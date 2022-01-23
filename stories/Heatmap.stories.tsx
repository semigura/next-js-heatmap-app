import { ComponentStory, ComponentMeta } from "@storybook/react";

import Heatmap from "../components/Heatmap";

export default {
  component: Heatmap,
} as ComponentMeta<typeof Heatmap>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Heatmap> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Heatmap {...args} />
);

export const Default = Template.bind({});
Default.args = {
  filteredList: [{ id: "1", date: new Date() }],
};
