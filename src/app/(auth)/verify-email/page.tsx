"use client";
import {
  useResendOtpMutation,
  useVerifyForgetOtpMutation,
} from "@/redux/api/authApi/authApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import type { InputRef } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

type OtpState = string[];
interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: { token: string; message?: string };
}

const VerifyEmail = () => {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const [otp, setOtp] = useState<OtpState>(Array(6).fill(""));
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const [resendDisabled, setResendDisabled] = useState(false),
    [resendTimer, setResendTimer] = useState(180);
  const [verifyForgetOtp, { isLoading }] = useVerifyForgetOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  useEffect(() => {
    const stored = sessionStorage.getItem("resendExpireTime");
    if (stored) {
      const remaining = Math.floor((+stored - Date.now()) / 1000);
      if (remaining > 0) {
        setResendTimer(remaining);
        setResendDisabled(true);
      } else sessionStorage.removeItem("resendExpireTime");
    }
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          sessionStorage.removeItem("resendExpireTime");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onChangeOtp = (i: number, val: string) => {
    if (/^\d{0,6}$/.test(val)) {
      if (val.length === 6) {
        setOtp(val.split(""));
        inputRefs.current[5]?.focus();
      } else {
        setOtp((o) => {
          const arr = [...o];
          arr[i] = val;
          return arr;
        });
        if (val && i < 5) inputRefs.current[i + 1]?.focus();
      }
    }
  };

  const onKeyDownOtp = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[i] && i)
      inputRefs.current[i - 1]?.focus();
  };

  const onFinish = async () => {
    const code = otp.join("");
    if (code.length < 6)
      return ErrorSwal({
        title: "",
        text: "Please enter the complete 6-digit OTP.",
      });
    try {
      const res = (await verifyForgetOtp({
        otp: code,
      }).unwrap()) as VerifyEmailResponse;
      if (res.success) {
        SuccessSwal({
          title: "",
          text: res.message || res?.data?.message || "Something went wrong!",
        });
        localStorage.setItem("user_token", res.data?.token || "");
        router.push(`/reset-password`);
      } else
        SuccessSwal({
          title: "",
          text: res.message || "Invalid OTP. Please try again.",
        });

      if (email) {
        router.push(`/reset-password`);
      } else {
        router.push(`/login`);
      }
    } catch (error: unknown) {
      ErrorSwal({
        title: "",
        text:
          (error as { message?: string; data?: { message?: string } })
            ?.message ||
          (error as { message?: string; data?: { message?: string } })?.data
            ?.message ||
          `Something went wrong!`,
      });
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;
    if (!email)
      return ErrorSwal({
        title: "",
        text: "Email not found. Please go back and re-enter your email!",
      });
    try {
      const res = await resendOtp(email).unwrap();
      SuccessSwal({
        title: "",
        text: res?.message || res?.data?.message || "Something went wrong!",
      });
      sessionStorage.setItem(
        "resendExpireTime",
        (Date.now() + 180 * 1000).toString()
      );
      setResendDisabled(true);
      setResendTimer(180);
    } catch (error: unknown) {
      ErrorSwal({
        title: "",
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
    <div className="min-h-screen w-full flex flex-col justify-center bg-hash items-center p-4">
      <div className="bg-secondary border border-primary shadow-lg rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-800 focus:outline-none z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl text-primary font-semibold mt-4">
            Verify Your Email
          </h2>
          <p className="text-center text-white mt-2">
            Please enter the 6-digit OTP sent to your email.
          </p>
        </div>
        <Form layout="vertical" onFinish={onFinish} className="space-y-6">
          <div className="flex justify-between space-x-4">
            {otp.map((d, i) => (
              <Form.Item key={i} className="mb-0">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={d}
                  onChange={(e) => onChangeOtp(i, e.target.value)}
                  onKeyDown={(e) => onKeyDownOtp(i, e)}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className="text-center w-14 h-14 text-2xl border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                  aria-label={`OTP Digit ${i + 1}`}
                />
              </Form.Item>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white">Didn’t receive the code?</span>
            <Button
              type="link"
              onClick={handleResendOtp}
              disabled={resendDisabled || resendLoading}
              className="text-green-500 hover:text-green-600"
            >
              {resendDisabled ? (
                <span className="text-red-500">
                  Resend OTP in {resendTimer}s
                </span>
              ) : (
                "Resend"
              )}
            </Button>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 transition-colors"
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-white mt-2 text-xs italic">
          ‼️The OTP sent to your email might be in the spam folder. Please check
          there.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
