"use client";

import { Button, Form, Input, message, Modal, Upload, UploadFile } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { useUpdateUserDataMutation } from "@/redux/api/userApi/userApi";
import default_img from "../../../assets/user_img_default.png";

interface User {
  name?: string;
  email?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
  };
  phone?: string;
  profileImage?: {
    url?: string;
  };
  idCardImage?: {
    url?: string;
  };
  points?: number;
  role?: string;
  createdAt?: string;
  id?: string;
}

export default function UserProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const { user: authUser } = useSelector(
    (state: { auth: { user: User } }) => state.auth
  );

  const [updateUserData, { isLoading: isUpdating }] =
    useUpdateUserDataMutation();

  const user = authUser;

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<UploadFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);

  const [form] = Form.useForm();

  // Set preview image for profile picture
  useEffect(() => {
    if (file && file.originFileObj instanceof Blob) {
      const objectUrl = URL.createObjectURL(file.originFileObj);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL
    } else if (user?.profileImage?.url) {
      setPreviewImage(
        user.profileImage.url.startsWith("http")
          ? user.profileImage.url
          : baseUrl + user.profileImage.url
      );
    } else {
      setPreviewImage(default_img.src); // Fallback to default image
    }
  }, [file, user, baseUrl]);

  // Handle file upload for profile image
  const handleBeforeUpload = (file: UploadFile) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }
    setFile(file);
    return false; // Prevent automatic upload
  };

  // Handle file change for profile image
  const handleFileChange = ({ file }: { file: UploadFile }) => {
    if (!file.type || !file.type.startsWith("image/")) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return;
    }
    setFile(file);
  };

  // Handle file upload for ID card
  const handleBeforeUploadIdCard = (file: File) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files (JPG, PNG, JPEG) are allowed!");
      return Upload.LIST_IGNORE;
    }
    setIdCardFile(file);
    return false; // Prevent automatic upload
  };

  // Open edit modal and set form values
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      name: user?.name || "",
      country: user?.address?.country || "",
      state: user?.address?.state || "",
      city: user?.address?.city || "",
      phone: user?.phone || "",
    });
  };

  // Close edit modal and reset state
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setFile(null);
    setIdCardFile(null);
    form.resetFields();
  };

  // Handle form submission
  const handleEditFormSubmit = async (values: {
    name: string;
    country: string;
    state: string;
    city: string;
    phone: string;
  }) => {
    const formData = new FormData();

    // Append form values
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("address.country", values.country);
    formData.append("address.state", values.state);
    formData.append("address.city", values.city);

    // Append profile image if a new file is selected
    if (file && file.originFileObj instanceof Blob) {
      formData.append("profileImage", file.originFileObj);
    }

    // Append ID card file if a new file is selected
    if (idCardFile) {
      formData.append("idCardImage", idCardFile);
    }

    try {
      await updateUserData(formData).unwrap();
      message.success("Profile updated successfully!");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 shadow-2xl border border-secondary rounded w-full max-w-4xl p-12 relative">
        <button
          onClick={handleOpenEditModal}
          className="absolute top-4 right-4 bg-button text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Update
        </button>

        {/* Profile Image */}
        <Image
          src={previewImage || default_img.src}
          alt="User Profile Image"
          className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full"
          width={256}
          height={256}
        />

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-primary mb-4">{user?.email}</p>
          <form className="w-full">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-primary font-semibold">
                  Country
                </label>
                <input
                  type="text"
                  value={user?.address?.country || ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-400 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label className="block text-primary font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    value={user?.address?.state || ""}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-400 cursor-not-allowed"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-primary font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    value={user?.address?.city || ""}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-primary font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={user?.phone || ""}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                {user?.idCardImage?.url ? (
                  <Link
                    href={
                      user.idCardImage.url.startsWith("http")
                        ? user.idCardImage.url
                        : baseUrl + user.idCardImage.url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 font-semibold"
                  >
                    View ID Card
                  </Link>
                ) : (
                  <p className="text-gray-200">No ID card uploaded</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Button */}
      <button
        onClick={() => setIsChangePasswordModalOpen(true)}
        className="mb-20 bg-button text-white px-4 py-2 md:px-6 md:py-2.5 rounded hover:bg-secondary-dark transition"
      >
        Change Password
      </button>

      {/* Edit Profile Modal */}
      <Modal
        title={
          <span className="text-xl font-bold text-primary">Update Profile</span>
        }
        open={isEditModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        destroyOnClose
        maskClosable
        closeIcon={<FaTimes size={20} />}
        width={500}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleEditFormSubmit}
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
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile Preview"
                    width={100}
                    height={100}
                    className="object-cover rounded-full w-24 h-24"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full" />
                )}
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
          <Form.Item label="ID Card">
            <Upload
              maxCount={1}
              accept="image/*"
              beforeUpload={handleBeforeUploadIdCard}
              showUploadList={!!idCardFile}
              fileList={
                idCardFile
                  ? [
                      {
                        uid: "-1",
                        name: idCardFile.name,
                        status: "done",
                      },
                    ]
                  : []
              }
              onRemove={() => setIdCardFile(null)}
            >
              <Button icon={<FaPlus />}>Upload ID Card</Button>
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

      {/* Change Password Modal */}
      <ChangePasswordModal
        visible={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}
