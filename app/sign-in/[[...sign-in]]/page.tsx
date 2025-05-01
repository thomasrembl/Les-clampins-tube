import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-[#0F0F0F]">
      <SignIn />
    </div>
  );
}
