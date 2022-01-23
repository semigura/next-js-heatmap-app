import { ComponentStory, ComponentMeta } from "@storybook/react";

import Form from "../components/Form";

export default {
  component: Form,
} as ComponentMeta<typeof Form>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Form> = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Form />
);

export const Default = Template.bind({});
Default.args = {};
