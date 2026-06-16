import "@/app/globals.css";
import Image from "next/image";

type Props = {
  defaultSlot: React.ReactNode;
  actionSlot?: React.ReactNode;
};

export default function SplashPageTemplate({ defaultSlot, actionSlot }: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-8 xw-full h-full mt-[64px] py-8 m-auto relative">
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] w-[320px] h-[320px] rounded-full border-[12px] border-primary/5" />

      <div className="flex flex-col items-center gap-8">
        <Image
          className="aspect-square object-cover animate-pulse"
          src={"/sperx-logo.png"}
          alt="Sperx"
          width={120}
          height={120}
          priority
        />
        {defaultSlot}
      </div>

      {actionSlot && (
        <div className="flex flex-col items-center w-full p-8 gap-4 bottom-16">
          {actionSlot}
        </div>
      )}
    </div>
  );
}
