"use client";

import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import { Collapse } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import faqImage from "../../../assets/home/faq/faq_img.png";

const { Panel } = Collapse;

interface FAQItem {
  _id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    _id: 1,
    question: "1. How can I watch live soccer matches on this website?",
    answer:
      'You can watch live soccer matches by navigating to the "Live Matches" section on our website.',
  },
  {
    _id: 1,
    question: "2. Where can I find the latest soccer news and updates?",
    answer:
      'The latest soccer news and updates are available in the "News" section.',
  },
  {
    _id: 1,
    question: "3. How do I check match schedules and fixtures?",
    answer:
      'Match schedules and fixtures can be found in the "Schedule" section.',
  },
  {
    _id: 1,
    question: "4. Can I buy tickets for soccer matches on this website?",
    answer: 'Yes, you can purchase tickets in the "Tickets" section.',
  },
  {
    _id: 1,
    question: "5. How do I register for an account on this website?",
    answer:
      'You can register for an account by clicking on the "Sign Up" button at the top right corner of the homepage.',
  },
];

const Faq: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>(["1"]);

  const onChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading */}
      <CustomHeading>FAQ</CustomHeading>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        {/* Image on the left (or top on smaller screens) */}
        <div className="w-full lg:w-1/2">
          <Image
            src={faqImage}
            alt="FAQ"
            width={600}
            height={300}
            className="rounded-xl w-full h-auto"
          />
        </div>

        {/* FAQ Accordion on the right (or bottom on smaller screens) */}
        <div className="w-full lg:w-1/2 py-4">
          <Collapse
            activeKey={activeKey}
            onChange={onChange}
            accordion
            bordered={false}
            className="faq-accordion"
          >
            {faqData.map((item, index) => (
              <Panel
                header={
                  <span className="text-primary font-semibold">
                    {item.question}
                  </span>
                }
                key={String(index + 1)}
                className="mb-4 border border-primary rounded-lg"
              >
                <div className="p-4 rounded-lg">
                  <p className="text-white">{item.answer}</p>
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Faq;
