import {
  TriangleAlertIcon,
  CircleXIcon,
  CheckCircleIcon,
  InfoIcon,
} from "lucide-react";

type Variant = "warning" | "error" | "success" | "info";

const variantConfig = {
  warning: {
    container: "border-amber-600 text-amber-600",
    iconBg: "bg-amber-600",
    Icon: TriangleAlertIcon,
  },
  error: {
    container: "border-red-600 text-red-600",
    iconBg: "bg-red-600",
    Icon: CircleXIcon,
  },
  success: {
    container: "border-green-600 text-green-600",
    iconBg: "bg-green-600",
    Icon: CheckCircleIcon,
  },
  info: {
    container: "border-blue-600 text-blue-600",
    iconBg: "bg-blue-600",
    Icon: InfoIcon,
  },
};

type AlertProps = {
  title: string;
  message: string;
  variant?: Variant;
  className?: string;
  actionSlot?: React.ReactNode;
};

export function Alert({
  title,
  message,
  variant = "warning",
  className = "",
  actionSlot = undefined,
}: AlertProps) {
  const { container, iconBg, Icon } = variantConfig[variant];

  return (
    <div
      className={[
        "w-full border border-2 rounded-2xl p-2 flex items-start gap-2 text-sm font-medium",
        container,
        className,
      ].join(" ")}
    >
      <div className={`aspect-square p-1.5 rounded-lg ${iconBg}`}>
        <Icon className="text-white" />
      </div>
      <div className=" w-full flex flex-col">
        <span className="text-md font-bold">{title}</span>
        <span className="w-full text-xs font-medium">{message}</span>

        {actionSlot && <div className="mt-2 pr-4">{actionSlot}</div>}
      </div>
    </div>
  );
}
