"use client";

import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import { Collapse } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import faqImage from "../../../assets/home/faq/faq_img.svg";

const { Panel } = Collapse;

interface FAQItem {
  _id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    _id: 1,
    question: "1. How long are the games?",
    answer:
      "Your playing time is a total of 1 hour. Each game is 4 minutes or first to 2 goals (whichever comes first)",
  },
  {
    _id: 2,
    question: "2. Am I on a team?",
    answer: "5-a-side teams with 5 waiting on the bench.",
  },
  {
    _id: 3,
    question: "3. What teams win?",
    answer:
      "King of the court concept. Each game is 4 minutes or first to 2 goals (whichever comes first). If one team wins 4 games in a row, we pick new teams to even out the competition.",
  },
  {
    _id: 4,
    question: "4. Are there refs?",
    answer: "No refs. Call your own fouls. Shin guards encouraged!",
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
            className="faq-accordion [&>.ant-collapse-item>.ant-collapse-header]:text-white"
          >
            {faqData?.map((item) => (
              <Panel
                header={
                  <span className="text-primary font-semibold">
                    {item.question}
                  </span>
                }
                key={String(item._id)}
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
