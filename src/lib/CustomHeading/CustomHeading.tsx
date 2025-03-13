import { ReactNode } from "react";

interface CustomHeadingProps {
  children: ReactNode;
}

export default function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <>
      <div className="text-4xl font-bold text-primary">{children} </div>
    </>
  );
}
