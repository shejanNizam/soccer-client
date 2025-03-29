"use client";

import { useChangePasswordMutation } from "@/redux/api/authApi/authApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";

import { Button, Form, Input, Modal } from "antd";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  visible,
  onClose,
}: ChangePasswordModalProps) {
  const [form] = Form.useForm();

  const [changePass, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (values: {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log(values);

    try {
      const response = await changePass(values).unwrap();
      SuccessSwal({
        title: "",
        text: response?.message,
      });
    } catch (error) {
      ErrorSwal({
        title: "",
        text:
          (error as { message?: string; data?: { message?: string } })
            ?.message ||
          (error as { message?: string; data?: { message?: string } })?.data
            ?.message ||
          "Static Failed!",
      });
    }

    form.resetFields();
    if (onClose) onClose();
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-primary">
          {" "}
          Change Password{" "}
        </span>
      }
      visible={visible}
      onCancel={() => {
        form.resetFields();
        if (onClose) onClose();
      }}
      footer={null}
      centered
      destroyOnClose
      maskClosable
      closeIcon={<FaTimes size={20} />}
      width={400}
    >
      <Form layout="vertical" onFinish={handleChangePassword} form={form}>
        <Form.Item
          label="Old Password"
          name="currentPassword"
          rules={[
            { required: true, message: "Please enter your old password" },
          ]}
        >
          <Input.Password placeholder="Enter your old password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={["confirmPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("confirmPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>

        <div className="flex justify-between items-center mb-2">
          <p></p>
          <Link href="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
