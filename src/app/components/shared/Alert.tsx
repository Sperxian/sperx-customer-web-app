"use client";

import {
  TriangleAlertIcon,
  CircleXIcon,
  CheckCircleIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

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
  dismissible?: boolean;
};

export function Alert({
  title,
  message,
  variant = "warning",
  className = "",
  actionSlot = undefined,
  dismissible = false,
}: AlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { container, iconBg, Icon } = variantConfig[variant];

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={[
        "relative w-full border border-2 rounded-2xl p-2 flex items-start gap-2 text-sm font-medium",
        container,
        className,
      ].join(" ")}
    >
      <div className={`aspect-square p-1.5 rounded-lg ${iconBg}`}>
        <Icon className="text-white" />
      </div>
      <div className={`w-full flex flex-col ${dismissible ? "pr-6" : ""}`}>
        <span className="text-md font-bold">{title}</span>
        <span className="w-full text-xs font-medium">{message}</span>

        {actionSlot && <div className="mt-2 pr-4">{actionSlot}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={() => setIsDismissed(true)}
          className="absolute right-2 top-2 rounded p-1 text-current hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <XIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
