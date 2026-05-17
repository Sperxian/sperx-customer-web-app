import { ThemeColors } from "@/types/domain";
import type { CSSProperties } from "react";


export function themeCssVars(theme: ThemeColors): CSSProperties {
  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--primary": theme.primary,
    "--primary-lightest": theme.primaryLightest,
    "--primary-lighter": theme.primaryLighter,
    "--primary-light": theme.primaryLight,
    "--primary-dark": theme.primaryDark,
    "--primary-darker": theme.primaryDarker,
    "--primary-darkest": theme.primaryDarkest,
    "--primary-foreground": theme.primaryForeground,
    "--secondary": theme.secondary,
    "--secondary-lightest": theme.secondaryLightest,
    "--secondary-lighter": theme.secondaryLighter,
    "--secondary-light": theme.secondaryLight,
    "--secondary-dark": theme.secondaryDark,
    "--secondary-darker": theme.secondaryDarker,
    "--secondary-darkest": theme.secondaryDarkest,
    "--secondary-foreground": theme.secondaryForeground,
  } as CSSProperties;
}
