"use client";

import { useAppDispatch } from "@/redux/hooks";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

import { useLoginMutation } from "@/redux/api/authApi/authApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { setCredentials } from "../../../redux/slices/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // login api call
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: { email: string; password: string }) => {
    // console.log(values);
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      localStorage.setItem("user_token", response?.data?.token);

      dispatch(
        setCredentials({
          user: response?.data?.user,
          token: response?.data?.token,
        })
      );

      SuccessSwal({
        title: `Login successful!`,
        text:
          response?.data?.message ||
          response?.message ||
          "Welcome to GrassRootz!",
      });
      router.push("/");
    } catch (error) {
      ErrorSwal({
        title: `Login failed!`,
        text:
          (error as { message?: string; data?: { message?: string } })
            ?.message ||
          (error as { message?: string; data?: { message?: string } })?.data
            ?.message ||
          `Login Failed!`,
      });
    }
    router.push("/");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-hash px-4">
      <div className="bg-secondary border border-primary shadow-2xl rounded-2xl w-full max-w-xl p-8 md:p-16 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-primary text-2xl md:text-4xl font-semibold mb-8 border-b-2 border-b-gray-100">
            Login
          </h2>
        </div>

        {/* Login Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-0"
        >
          <div className="grid grid-cols-1">
            {/* Email Field */}
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

            {/* Password Field */}
            <Form.Item
              label={<span className="font-semibold"> Password </span>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>
                <span className="text-white">Remember me</span>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Link href="/forget-password" className="text-primary underline">
                Forget password?
              </Link>
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full transition-colors"
            >
              Login
            </Button>
          </Form.Item>

          {/* Navigation Link to Signup Page */}
          <p className="text-center">
            <span className="text-white"> {"Don't have an account?"} </span>
            <Link href="/signup" className="text-primary underline">
              {" "}
              Create Account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
