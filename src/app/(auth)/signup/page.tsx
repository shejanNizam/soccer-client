"use client";

import { useSignupMutation } from "@/redux/api/authApi/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { setCredentials } from "../../../redux/slices/authSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // signup api call
  const [signup, { isLoading }] = useSignupMutation();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        // confirmPassword: values.confirmPassword,
      }).unwrap();

      dispatch(
        setCredentials({
          user: response?.data?.user,
          // token: response?.data?.token,
        })
      );

      SuccessSwal({
        title: `Signup Successful!`,
        text: `Please login to continue!`,
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
          `Signup Failed!`,
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-hash pt-20 px-4">
        <div className="bg-secondary border border-primary shadow-2xl rounded-xl w-full max-w-xl p-8 md:p-16 relative">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label="Go Back"
          >
            <FaArrowLeft size={24} />
          </button>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-8 border-b-2 border-b-secondary">
              Create Your Account
            </h2>
          </div>

          {/* Signup Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-2"
          >
            <div className="grid grid-cols-1">
              {/* Name */}
              <Form.Item
                label={<span className="font-semibold"> Name </span>}
                name="name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input placeholder="Enter your name" size="large" />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label={<span className="font-semibold"> Email </span>}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                  { required: true, message: "Please enter your valid email" },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label={<span className="font-semibold"> Password </span>}
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                label={
                  <span className="font-semibold"> Confirm Password </span>
                }
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  size="large"
                />
              </Form.Item>
            </div>

            {/* I Agree Checkbox */}
            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("You must agree to the terms")
                        ),
                },
              ]}
            >
              <Checkbox>
                <span className="text-white">I agreed </span>
                <Link href="/terms-of-use">
                  <span className="text-primary underline">Terms</span>
                </Link>{" "}
                <span className="text-white">and </span>
                <Link href="/privacy-policy">
                  <span className="text-primary underline">Privacy Policy</span>
                </Link>
              </Checkbox>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                className="w-full transition-colors"
              >
                Create Account
              </Button>
            </Form.Item>

            <p className="text-center">
              <span className="text-white">Already have an account? </span>
              <Link href="/login" className="text-primary underline">
                Log In
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
