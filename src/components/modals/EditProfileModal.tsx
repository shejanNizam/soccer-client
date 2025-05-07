"use client";

import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: {
    name: string;
    country: string;
    state: string;
    city: string;
    phone: string;
  }) => void;
  form: FormInstance;
  previewImage: string | null;
  setPreviewImage: (url: string | null) => void;
  file: UploadFile | null;
  setFile: (file: UploadFile | null) => void;
  idCardFile: File | null;
  setIdCardFile: (file: File | null) => void;
  isUpdating: boolean;
  user: {
    profileImage?: { url?: string };
    idCardImage?: { url?: string };
  };
  baseUrl: string;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  previewImage,
  setPreviewImage,
  file,
  setFile,
  idCardFile,
  setIdCardFile,
  isUpdating,
  user,
  baseUrl,
}: EditProfileModalProps) {
  // Handle file upload for profile image
  const handleBeforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      return Upload.LIST_IGNORE;
    }
    // Convert File to UploadFile
    const uploadFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: "done",
      originFileObj: file,
    };
    setFile(uploadFile);
    setPreviewImage(URL.createObjectURL(file));
    return false; // Prevent automatic upload
  };

  // Handle file change for profile image
  const handleFileChange: UploadProps["onChange"] = ({ file }) => {
    if (file.originFileObj && file.originFileObj instanceof Blob) {
      setPreviewImage(URL.createObjectURL(file.originFileObj));
    }
  };

  // Handle file upload for ID card
  const handleBeforeUploadIdCard = (file: File) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      return Upload.LIST_IGNORE;
    }
    setIdCardFile(file);
    return false; // Prevent automatic upload
  };

  // Handle ID card removal
  const handleIdCardRemove = () => {
    setIdCardFile(null);
  };

  return (
    <>
      <Modal
        title={
          <span className="text-xl font-bold text-primary">Update Profile</span>
        }
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={400}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          className="space-y-4"
        >
          {/* Profile Image Upload */}
          <Form.Item
            label={
              <span className="text-black font-semibold">Profile Image</span>
            }
          >
            <div className="relative flex justify-center">
              <div className="relative">
                <Image
                  src={
                    previewImage ||
                    (user?.profileImage?.url?.startsWith("http")
                      ? user?.profileImage?.url
                      : user?.profileImage?.url
                      ? `${baseUrl}${user.profileImage.url}`
                      : "/default-profile.png")
                  }
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="object-cover rounded-full w-24 h-24"
                />
                <Upload
                  name="profileImage"
                  maxCount={1}
                  fileList={file ? [file] : []}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleFileChange}
                  showUploadList={false}
                  className="absolute top-8 right-8"
                >
                  <div
                    className="p-2 bg-white rounded-full shadow cursor-pointer"
                    title="Change Profile Image"
                  >
                    <FaPlus />
                  </div>
                </Upload>
              </div>
            </div>
          </Form.Item>

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Country */}
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter your country" }]}
          >
            <Input placeholder="Enter your country" />
          </Form.Item>

          {/* State */}
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please enter your state" }]}
          >
            <Input placeholder="Enter your state" />
          </Form.Item>

          {/* City */}
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* ID Card Upload */}
          <Form.Item className="[&_.ant-upload]:w-full" label="ID Card">
            <Upload
              maxCount={1}
              accept="image/*"
              beforeUpload={handleBeforeUploadIdCard}
              showUploadList={true}
              fileList={
                idCardFile
                  ? [
                      {
                        uid: "-1",
                        name: idCardFile.name,
                        status: "done",
                      },
                    ]
                  : user?.idCardImage?.url
                  ? [
                      {
                        uid: "-2",
                        name: "current_id_card.jpg",
                        status: "done",
                        url: user.idCardImage.url.startsWith("http")
                          ? user.idCardImage.url
                          : `${baseUrl}${user.idCardImage.url}`,
                      },
                    ]
                  : []
              }
              onRemove={handleIdCardRemove}
            >
              <Button className="w-full" icon={<FaPlus />}>
                Upload ID Card
              </Button>
            </Upload>
          </Form.Item>

          {/* Save Changes Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isUpdating}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
