"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const positionMap = {
  1: "Bench-warmer",
  2: "Rising Talent",
  3: "First Teamer",
  4: "Play Maker",
  5: "Elite Player",
};

export default function EditPositionPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedStars, setSelectedStars] = useState(1);

  const handleStarClick = (starCount: number) => {
    setSelectedStars(starCount);
    form.setFieldsValue({
      starCount,
      position: positionMap[starCount as keyof typeof positionMap],
    });
  };

  const onFinish = (values: {
    name: string;
    starCount: number;
    position: string;
  }) => {
    console.log("Submitted values:", values);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 relative">
      {/* back left arrow button */}
      <button
        onClick={handleBack}
        className="absolute left-0 top-0 p-4 text-primary hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Go back"
      >
        <FaArrowLeft size={24} />
      </button>

      <div className="w-full max-w-6xl rounded-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Star Rating and Form */}

          <div className="w-full mx-auto md:w-1/3 ">
            <h2 className="text-2xl font-bold mb-2 mt-8 md:mt-0">
              Set Your Level
            </h2>
            <div className="border border-primary p-4 rounded-lg">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Your Level">
                  <div className="flex space-x-2 mb-4 text-primary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className="text-3xl focus:outline-none"
                      >
                        {star <= selectedStars ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                  <Form.Item name="starCount" hidden>
                    <Input type="hidden" />
                  </Form.Item>
                </Form.Item>

                <Form.Item name="position" label="Your Position">
                  <Input size="large" readOnly />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          {/* Right Side - Static Reference Guide */}
          <div className="w-full mx-auto md:w-1/3">
            <h2 className="text-2xl font-bold mb-4 mt-12 md:mt-0">
              Level Guide
            </h2>

            <div className="space-y-2">
              {Object.entries(positionMap).map(([stars, position]) => (
                <div
                  key={stars}
                  className="p-2 rounded-lg border border-primary"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary text-xl">
                        {"★".repeat(Number(stars))}
                        {/* {"☆".repeat(5 - Number(stars))} */}
                      </p>
                      <p className="text-lg text-primary font-semibold mt-1">
                        {position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
