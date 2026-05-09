"use client";

import {
  BadgeCheckIcon,
  CakeIcon,
  CakeSliceIcon,
  CandyIcon,
  CarFrontIcon,
  CoffeeIcon,
  CookieIcon,
  CupSodaIcon,
  HamburgerIcon,
  HeartIcon,
  IceCreamBowlIcon,
  IceCreamConeIcon,
  PawPrintIcon,
  PizzaIcon,
  PopsicleIcon,
  SaladIcon,
  SandwichIcon,
  ScissorsIcon,
  ShirtIcon,
  ShoppingBagIcon,
  StarIcon,
  UtensilsCrossedIcon,
  UtensilsIcon,
  WashingMachineIcon,
} from "lucide-react";
import { useMemberLoyalty } from "../MemberContext";

const iconMap = {
  milk_tea: CupSodaIcon,
  coffee: CoffeeIcon,
  utensils: UtensilsIcon,
  utensils_crossed: UtensilsCrossedIcon,
  cookie: CookieIcon,
  popsicle: PopsicleIcon,
  candy: CandyIcon,
  pizza: PizzaIcon,
  salad: SaladIcon,
  hamburger: HamburgerIcon,
  sandwich: SandwichIcon,
  cake: CakeIcon,
  cake_slice: CakeSliceIcon,
  ice_cream: IceCreamBowlIcon,
  ice_cream2: IceCreamConeIcon,
  scissors: ScissorsIcon,
  star: StarIcon,
  heart: HeartIcon,
  laundry: WashingMachineIcon,
  clothes: ShirtIcon,
  car: CarFrontIcon,
  shop: ShoppingBagIcon,
  pet: PawPrintIcon,
  badge: BadgeCheckIcon,
};
type IconName = keyof typeof iconMap;

const DEFAULT_ICON = BadgeCheckIcon;

interface Props {
  filled: boolean;
  icon?: IconName;
  size?: number;
}

export function LoyaltyStamp({
  filled = false,
  size = 20,
  icon: overrideIcon,
}: Props) {
  const memberLoyalty = useMemberLoyalty();
  const { stampIcon } = memberLoyalty.loyaltyProgram.config;

  const finalIcon = (overrideIcon ?? stampIcon) as IconName;
  const IconComponent = iconMap[finalIcon] ?? DEFAULT_ICON;
  const color = filled ? "var(--secondary)" : "var(--primary-lighter)";

  return <IconComponent color={color} size={size} />;
}
