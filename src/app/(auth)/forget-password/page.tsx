"use client";

import { useForgetPasswordMutation } from "@/redux/api/authApi/authApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const ForgetPassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  // Initialize the forgot password mutation hook
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onFinish = async (values: { email: string }) => {
    try {
      const response = await forgetPassword({
        email: values?.email,
      }).unwrap();
      localStorage.setItem("user_token", response?.data?.resetPasswordToken);

      SuccessSwal({
        title: "Sent OTP in your email!",
        text: `Check your email in ${values?.email}`,
      });
      router.push(`/verify-email?email=${values?.email}`);
    } catch (error) {
      console.error("Forgot Password error:", error);
      ErrorSwal({
        title: ``,
        text:
          (error as { message?: string; data?: { message?: string } })
            ?.message ||
          (error as { message?: string; data?: { message?: string } })?.data
            ?.message ||
          `Something went wrong!`,
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-hash items-center p-4 ">
      <div className="bg-secondary border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-primary text-2xl font-semibold mt-4 border-b-2 border-b-gray-100">
            Forgot Password
          </h2>
          <p className="text-center text-white mt-2">
            {"Enter your account email to get OTP!"}
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label={<span className="font-semibold"> Email </span>}
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address!" },
              { required: true, message: "Email is required!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Send OTP
            </Button>
          </Form.Item>

          <p className="text-center">
            <span className="text-white">Remembered your password? </span>
            <Link href="/login" className="text-primary underline">
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
