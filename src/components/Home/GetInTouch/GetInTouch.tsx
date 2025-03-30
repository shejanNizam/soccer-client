"use client";

import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form"; // Import useForm hook
import Image from "next/image";
import GET_IN_TOUCH from "../../../assets/home/touch/get-in_touch_img.png";

export default function GetInTouch() {
  const [form] = useForm(); // Initialize the form instance

  const onFinish = (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log("Received values of form: ", values);

    // Clear the form fields after submission
    form.resetFields();
  };

  return (
    <div className="py-8">
      <CustomHeading>Get in Touch</CustomHeading>
      <p className="mb-6 text-center w-[90%] md:w-[40%] mx-auto">
        {`Have questions or need support? Contact us via email, live chat, or
        social media. We're here to assist with match updates, tickets,
        streaming, and more!`}
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 border border-primary rounded-lg max-w-4xl mx-auto p-4">
        <Form
          form={form} // Pass the form instance to the Form component
          onFinish={onFinish}
          layout="vertical"
          className="w-full md:w-1/2"
        >
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name..." />
          </Form.Item>
          <Form.Item
            label="Your Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email..." />
          </Form.Item>
          <Form.Item
            label="Your Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea placeholder="Enter your message..." rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send
            </Button>
          </Form.Item>
        </Form>
        <div className="w-full md:w-1/2">
          <Image
            src={GET_IN_TOUCH}
            alt="Contact Us"
            className="rounded-xl"
            layout="responsive"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
}
