"use client";

import { Form, message, UploadFile } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
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

  // Set initial preview image
  useEffect(() => {
    if (user?.profileImage?.url) {
      setPreviewImage(
        user.profileImage.url.startsWith("http")
          ? user.profileImage.url
          : baseUrl + user.profileImage.url
      );
    } else {
      setPreviewImage(default_img.src);
    }
  }, [user, baseUrl]);

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

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setFile(null);
    setIdCardFile(null);
    form.resetFields();
  };

  const handleEditFormSubmit = async (values: {
    name: string;
    country: string;
    state: string;
    city: string;
    phone: string;
  }) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("address.country", values.country);
    formData.append("address.state", values.state);
    formData.append("address.city", values.city);

    if (file && file.originFileObj instanceof Blob) {
      formData.append("profileImage", file.originFileObj);
    }

    if (idCardFile) {
      formData.append("idCardImage", idCardFile);
    }

    try {
      await updateUserData(formData).unwrap();
      message.success("Profile updated successfully!");

      if (file && file.originFileObj instanceof Blob) {
        setPreviewImage(URL.createObjectURL(file.originFileObj));
      }

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
                        : `${baseUrl}${user.idCardImage.url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 font-semibold hover:underline"
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
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleEditFormSubmit}
        form={form}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        file={file}
        setFile={setFile}
        idCardFile={idCardFile}
        setIdCardFile={setIdCardFile}
        isUpdating={isUpdating}
        user={user}
        baseUrl={baseUrl}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        visible={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}
