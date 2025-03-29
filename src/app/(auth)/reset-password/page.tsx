"use client";

import { useResetPasswordMutation } from "@/redux/api/authApi/authApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const [form] = Form.useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("user_token");
      const response = await resetPassword({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      SuccessSwal({
        title: ``,
        text:
          response?.message ||
          response?.data.message ||
          `Password Reset Successful!`,
      });

      router.push("/login");
    } catch (error) {
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

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-hash px-4">
      <div className="bg-secondary border border-primary shadow-2xl rounded-2xl w-full max-w-xl p-8 md:p-16 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-primary text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-gray-100">
            Reset Your Password
          </h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-8"
        >
          {/* New Password Field */}
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: "Please enter a new password." },
              { min: 6, message: "Password must be at least 6 characters." },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
