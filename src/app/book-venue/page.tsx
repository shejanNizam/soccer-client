"use client";
import {
  useAddBookUsingPaymentMutation,
  useAddBookUsingPointMutation,
  useGetShiftQuery,
  useGetSingleRequestQuery,
  useRescheduleRequestMutation,
} from "@/redux/features/venue/venueApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  message,
  Modal,
  Select,
  Spin,
} from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import VENUE_IMG from "../../assets/book_venue/book_venue_img.png";

const { Option } = Select;

type VenueBookingForm = {
  date: string;
  time: string;
  agree: boolean;
};

export default function BookVenue() {
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const venueId = searchParams.get("venueId");
  const requestId = searchParams.get("requestId");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [stateVenueId, setStateVenueId] = useState(venueId);

  const { data, isLoading } = useGetShiftQuery({ stateVenueId, date });
  const timeSlots = data?.data;

  const [bookByPoint, { isLoading: isLoadingPoint }] =
    useAddBookUsingPointMutation();

  const [bookByPayment, { isLoading: isLoadingPayment }] =
    useAddBookUsingPaymentMutation();

  // useAddBookUsingPointMutation();

  const [rescheduleRequest, { isLoading: isLoadingReschelude }] =
    useRescheduleRequestMutation();

  // console.log(requestId, "------------------------>>");
  const { data: requestedData } = useGetSingleRequestQuery(requestId);
  console.log(requestedData?.data, "------------>>");

  useEffect(() => {
    if (!requestId || !requestedData) {
      return;
    }

    setStateVenueId(requestedData?.data?.venue?.id);
  }, [requestId, requestedData]);

  useEffect(() => {
    if (requestedData) {
      const request = requestedData?.data;

      form.setFieldsValue({
        date: dayjs(request.date),
      });
      setDate(request.date.split("T")[0]);
      setSelectedTimeRange(request.timeRange);
      form.setFieldsValue({
        time: request.timeRange,
      });
    }
  }, [requestedData, form]);

  const onFinish = async (values: VenueBookingForm) => {
    if (venueId) {
      setIsModalVisible(true);
      setSelectedTimeRange(values.time);
    } else if (requestId) {
      try {
        // Create the reschedule data in the format the backend expects
        const rescheduleData = {
          id: requestId,
          date: date,
          timeRange: values.time, // Changed from timeRange to time if needed
          status: "pending",
        };
        // console.log(rescheduleData);
        await rescheduleRequest(rescheduleData).unwrap();
        // console.log(response);

        SuccessSwal({
          title: "Rescheduled!",
          text: "Reschedule request sent successfully!",
        });
        router.push(`/profile/booked-list`);
      } catch (error) {
        ErrorSwal({
          title: "Re Schedule request Failed!",
          text:
            (error as { data?: { message?: string } })?.data?.message ||
            (error as { message?: string })?.message ||
            "Failed Reschedule!",
        });
      }
    } else {
      console.log("No venueId or requestId found");
    }
  };

  const handlePoints = async () => {
    try {
      if (!venueId || !date || !selectedTimeRange) {
        throw new Error("Missing required booking information");
      }

      const bookingData = {
        venue: venueId,
        date: date,
        timeRange: selectedTimeRange,
      };

      const response = await bookByPoint(bookingData).unwrap();

      if (response.code === 200) {
        SuccessSwal({
          title: "Booked with Points!",
          text:
            response?.message ||
            response?.data?.message ||
            "Venue booked successfully!",
        });
        router.push(`/profile/booked-list`);
      } else {
        throw new Error(response.message || "Failed to book with points");
      }
    } catch (error: unknown) {
      ErrorSwal({
        title: "Booking Failed",
        text:
          (error as { data?: { message?: string } })?.data?.message ||
          (error as { message?: string })?.message ||
          "Failed to book venue with points",
      });
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCard = async () => {
    try {
      if (!venueId || !date || !selectedTimeRange) {
        throw new Error("Missing required booking information");
      }

      const bookingData = {
        venue: venueId,
        date: date,
        timeRange: selectedTimeRange,
      };

      const response = await bookByPayment(bookingData).unwrap();

      if (response.code === 200 && response.data?.url) {
        // Redirect to payment URL
        window.location.href = response.data.url;
      } else {
        message.error(
          response?.message ||
            response?.data?.message ||
            "Failed to initiate payment. Please try again."
        );
        // throw new Error(response.message || "Failed to initiate payment");
      }
    } catch (error: unknown) {
      ErrorSwal({
        title: "Payment Failed",
        text:
          (error as { message?: string; data?: { message?: string } })
            ?.message ||
          (error as { data?: { message?: string } })?.data?.message ||
          "Failed to process payment",
      });
      setIsModalVisible(false);
    }
  };

  const handleDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") {
      setDate(dateString);
    }
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
              className="rounded-xl"
            />
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-1/2">
            <Form form={form} onFinish={onFinish} layout="vertical">
              {/* Date Input */}
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select a date!" }]}
              >
                <DatePicker
                  className="w-full"
                  onChange={handleDateChange}
                  value={date ? dayjs(date) : null}
                />
              </Form.Item>

              {/* Time Schedule Select */}
              <Form.Item
                label="Time Schedule"
                name="time"
                rules={[{ required: true, message: "Please select a time!" }]}
              >
                <Select
                  allowClear
                  placeholder="Select a time slot"
                  className="w-full"
                  notFoundContent={
                    isLoading ? (
                      <Spin size="small" />
                    ) : (
                      "No time slots available"
                    )
                  }
                >
                  {timeSlots?.map(
                    (slot: {
                      timeRange: string;
                      isMute: boolean;
                      totalBooking: number;
                    }) => (
                      <Option
                        key={slot.timeRange}
                        value={slot.timeRange}
                        disabled={slot.isMute}
                      >
                        <div className="flex justify-between">
                          <span>{slot.timeRange}</span>
                          <span className="text-gray-500 ml-2">
                            ({" "}
                            <span className="text-secondary font-bold text-lg">
                              {" "}
                              {slot.totalBooking}{" "}
                            </span>{" "}
                            booked)
                          </span>
                        </div>
                      </Option>
                    )
                  )}
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
                    <span className="text-white">{"Don't show again."}</span>
                  </Checkbox>
                </Form.Item>
              </div>

              {/* Book Button */}
              <Form.Item>
                {requestId ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    // loading={isLoading}
                  >
                    Re Schedule
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    // loading={isLoading}
                  >
                    Book Now
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {/* Modal for Payment Confirmation */}
      <Modal
        title={
          <div className="text-center text-xl font-bold">Confirm Payment</div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        centered
        footer={
          <div className="flex justify-center gap-4">
            <Button
              key="points"
              onClick={handlePoints}
              loading={isLoadingPoint || isLoadingReschelude}
            >
              Points
            </Button>
            <Button
              key="card"
              type="primary"
              onClick={handleCard}
              loading={isLoadingPayment || isLoadingReschelude}
            >
              Card
            </Button>
          </div>
        }
      >
        <p className="text-center">
          Please choose your preferred payment method to complete the booking.
        </p>
      </Modal>
    </div>
  );
}
