"use client";

import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import { useContactWithadminMutation } from "@/redux/features/common/commonApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import GET_IN_TOUCH from "../../../assets/home/touch/get-in_touch_img.svg";

export default function GetInTouch() {
  const [form] = useForm();
  const [contactwithAdmin, { isLoading }] = useContactWithadminMutation();

  const onFinish = async (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    try {
      // Send the form data to the API
      const response = await contactwithAdmin(values).unwrap();

      SuccessSwal({
        title: "Success",
        text:
          response?.message ||
          response?.data?.message ||
          "Your message has been sent to Admin!",
      });

      form.resetFields();
    } catch (error) {
      ErrorSwal({
        title: "Error",
        text:
          (error as { data?: { message?: string } })?.data?.message ||
          (error as { message?: string })?.message ||
          "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="pt-8 pb-20">
      <CustomHeading>GET IN TOUCH</CustomHeading>
      <p className="mb-6 text-center w-[90%] md:w-[40%] mx-auto text-white">
        {`Have questions or need support? `}
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 border border-primary rounded-lg max-w-4xl mx-auto p-4">
        <Form
          form={form}
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
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
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
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
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
