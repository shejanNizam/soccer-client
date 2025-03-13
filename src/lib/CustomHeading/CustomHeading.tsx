import { ReactNode } from "react";

interface CustomHeadingProps {
  children: ReactNode;
}

export default function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <>
      <div className="text-3xl font-bold text-primary text-center py-8">
        {children}{" "}
      </div>
    </>
  );
}
