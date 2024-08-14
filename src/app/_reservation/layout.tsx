import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full grid min-h-[100dvh] md:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[250px] lg:w-[350px] xs:w-[350px] gap-6">
          {children}
        </div>
      </div>
      <div className="hidden bg-muted md:block top-0">
        <img
          src="https://i.pinimg.com/originals/1d/46/27/1d4627f8b0a294c5e98e87f6cdbeaa8d.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
