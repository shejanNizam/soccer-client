"use client";

import { Form, message, UploadFile } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { useUpdateUserDataMutation } from "@/redux/api/userApi/userApi";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import default_img from "../../../assets/user_img_default.png";

interface User {
  name?: string;
  email?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
  };
  rating: {
    level: string;
    score: number;
  };
  phone?: string;
  gender: string;
  dob: Date;
  profileImage?: {
    url?: string;
    path?: string;
  };
  idCardImage?: {
    url?: string;
    path?: string;
  };
  points?: number;
  role?: string;
  createdAt?: string;
  id?: string;
}

export default function UserProfile() {
  const router = useRouter();
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
  const [idCardError, setIdCardError] = useState(false);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);

  const [form] = Form.useForm();

  // Set initial preview image
  useEffect(() => {
    if (user?.profileImage?.url) {
      setPreviewImage(
        user.profileImage.url.startsWith("http")
          ? user.profileImage.url
          : `${baseUrl}${user.profileImage.url}`
      );
    } else {
      setPreviewImage(default_img.src);
    }
  }, [user, baseUrl]);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      // name: user?.name, // Do not set name field for editing
      country: user?.address?.country,
      state: user?.address?.state,
      city: user?.address?.city,
      phone: user?.phone,
    });
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setFile(null);
    form.resetFields();
  };

  const handleEditFormSubmit = async (values: {
    name: string;
    country: string;
    state: string;
    city: string;
    phone: string;
    // gender: string;
    // dob: Date;
  }) => {
    const formData = new FormData();

    // formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("address.country", values.country);
    formData.append("address.state", values.state);
    formData.append("address.city", values.city);

    if (file && file.originFileObj instanceof Blob) {
      formData.append("profileImage", file.originFileObj);
    }

    try {
      await updateUserData(formData).unwrap();
      message.success("Profile updated successfully!");

      if (file && file.originFileObj instanceof Blob) {
        setPreviewImage(URL.createObjectURL(file.originFileObj));
      }

      handleCloseModal();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  const handleIdCardClick = async (e: React.MouseEvent) => {
    if (!user?.idCardImage?.url) {
      e.preventDefault();
      return;
    }

    // Optional: Verify the file exists before opening
    const idCardUrl = user.idCardImage.url.startsWith("http")
      ? user.idCardImage.url
      : `${baseUrl}${user.idCardImage.url}`;

    try {
      const response = await fetch(idCardUrl, { method: "HEAD" });
      if (!response.ok) {
        e.preventDefault();
        setIdCardError(true);
        message.error("ID Card not found. Please upload again.");
      }
    } catch (error) {
      console.error("Error checking ID card:", error);
      // Continue with opening the link anyway
    }
  };

  const handleEditposition = () => {
    router.push("/profile/edit-position");
    console.log("first");
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

        <div className="relative">
          <Image
            src={previewImage || default_img.src}
            alt="User Profile Image"
            className="w-32 h-32 md:w-64 md:h-64 object-cover rounded-full"
            width={256}
            height={256}
            onError={() => setPreviewImage(default_img.src)}
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-auto min-w-[130px] rounded-2xl bg-orange-600 p-1 text-center mb-2">
            <div className="flex flex-col items-center text-primary font-bold text-sm">
              <div>
                {user?.rating?.score === 1
                  ? "★☆☆☆☆"
                  : user?.rating?.score === 2
                  ? "★★☆☆☆"
                  : user?.rating?.score === 3
                  ? "★★★☆☆"
                  : user?.rating?.score === 4
                  ? "★★★★☆"
                  : user?.rating?.score === 5 && "★★★★★"}
              </div>
              {/* <div>★☆☆☆☆</div> */}
              <div>{user?.rating?.level}</div>
              <button
                className="bg-primary/50 rounded-full px-2 py-1"
                onClick={handleEditposition}
              >
                <FaEdit size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-primary mb-4">{user?.email}</p>
          <p className="text-primary mb-4">Gender: {user?.gender}</p>
          <p className="text-primary mb-4">
            Date of birth:{" "}
            {`${new Date(user?.dob).getDay()}/${new Date(
              user?.dob
            ).getMonth()}/${new Date(user?.dob).getFullYear()}`}
          </p>
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
                      user?.idCardImage?.url.startsWith("http")
                        ? user?.idCardImage?.url
                        : `${baseUrl}${user.idCardImage.url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 font-semibold hover:underline"
                    onClick={handleIdCardClick}
                  >
                    View ID Card
                  </Link>
                ) : (
                  <p className="text-gray-200">
                    {idCardError
                      ? "ID Card not available"
                      : "No ID card uploaded"}
                  </p>
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
