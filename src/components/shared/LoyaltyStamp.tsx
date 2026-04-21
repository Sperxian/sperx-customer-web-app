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
  IceCream2Icon,
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

interface LoyaltyStampProps {
  icon: IconName;
  filled: boolean;
  size?: number;
}

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

export function LoyaltyStamp({
  filled = false,
  size = 20,
  icon = "badge",
}: LoyaltyStampProps) {
  const IconComponent = iconMap[icon] ?? DEFAULT_ICON;
  const color = filled ? "var(--secondary)" : "white";

  return <IconComponent color={color} size={size} />;
}
