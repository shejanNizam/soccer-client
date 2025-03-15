"use client";
import { SuccessSwal } from "@/utils/allSwal";
import { Button, Checkbox, DatePicker, Form, Modal, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VENUE_IMG from "../../assets/book_venue/book_venue_img.png";

const { Option } = Select;

type Venue = {
  date: string;
  time: string;
};

export default function BookVenue() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values: Venue) => {
    setIsModalVisible(true);
    console.log("Form values:", values);
  };

  const handlePoints = () => {
    SuccessSwal({
      title: "By Points!",
      text: ` Venue booked! `,
    });
    router.push(`/profile/booked-list`);
    console.log("Points button clicked");
    setIsModalVisible(false);
  };

  const handleCard = () => {
    SuccessSwal({
      title: "By Card Payments!",
      text: ` Venue booked! `,
    });
    router.push(`/profile/booked-list`);
    console.log("Card button clicked");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-secondary py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading and Subtitle */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Book a Venue</h1>
          <p className="text-xl md:w-[70%] mx-auto">
            Easily book a soccer venue for matches, training, or events. Choose
            from top facilities, check availability, and secure your spot
            hassle-free. Perfect for teams, tournaments, and recreational play.
            Reserve today!
          </p>
        </div>

        {/* Main Content: Image and Form */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-4 rounded-lg md:w-[70%] mx-auto border border-primary p-4 md:p-8">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src={VENUE_IMG}
              alt="Venue Image"
              width={1000}
              height={1000}
              className="rounded-lg"
            />
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-1/2">
            <Form onFinish={onFinish} layout="vertical">
              {/* Date Input */}
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select a date!" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              {/* Time Schedule Select */}
              <Form.Item
                label="Time Schedule"
                name="time"
                rules={[{ required: true, message: "Please select a time!" }]}
              >
                <Select placeholder="Select a time slot" className="w-full">
                  <Option value="02:00 am – 03:00 am">
                    02:00 am – 03:00 am
                  </Option>
                  <Option value="10:00 am – 11:00 am">
                    10:00 am – 11:00 am
                  </Option>
                  <Option value="02:00 pm – 03:00 pm">
                    02:00 pm – 03:00 pm
                  </Option>
                  <Option value="10:00 pm – 11:00 pm">
                    10:00 pm – 11:00 pm
                  </Option>
                </Select>
              </Form.Item>

              {/* Warning Message and Checkbox */}
              <div className="mb-6">
                <p className="text-sm text-button mb-4">
                  <strong>Warning:</strong> Play at your own risk. Injuries may
                  occur. Follow all rules. Proper gear required. Field
                  maintenance varies. Stay safe!
                </p>
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("You must agree to the terms!"),
                    },
                  ]}
                >
                  <Checkbox>
                    <span className="text-white"> {"Don't show again."} </span>
                  </Checkbox>
                </Form.Item>
              </div>

              {/* Book Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full ">
                  Book Now
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {/* Modal for Payment Confirmation */}
      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            Confirm Payment
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        centered
        footer={
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button key="points" onClick={handlePoints}>
              Points
            </Button>
            <Button key="card" type="primary" onClick={handleCard}>
              Card
            </Button>
          </div>
        }
      >
        <p style={{ textAlign: "center" }}>
          Buy coins instantly for exclusive rewards, fast transactions, and
          secure payments. Get yours now!
        </p>
      </Modal>
    </div>
  );
}
