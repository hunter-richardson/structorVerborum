declare module 'pleasejs' {
  export interface ColorOptions {
    hue?: number
    saturation?: number
    value?: number
    base_color?: string
    greyscale?: boolean
    grayscale?: boolean
    golden?: boolean
    full_random?: boolean
    colors_returned?: number
    format: 'hex' | 'rgb' | 'rgb-string' | 'hsv' | 'hsv-string'
  }

  export interface SchemeOptions {
    scheme_type?: 'monochromatic' | 'analogous' | 'complementary' | 'split' | 'triadic' | 'tetradic'
    format: 'hex' | 'rgb' | 'rgb-string' | 'hsv' | 'hsv-string'
  }

  export interface RBGColor {
    r: number
    g: number
    b: number
  }

  export interface HSVColor {
    h: number
    s: number
    v: number
  }

  export type MakeColorResult = string | RBGColor | HSVColor

  export const make_color: (options?: ColorOptions) => MakeColorResult
  export const make_scheme: (base_color?: HSVColor, options: SchemeOptions) => MakeColorResult
  export const NAME_to_HEX: (name: string) => string
  export const NAME_to_RGB: (name: string) => RBGColor
  export const HEX_to_RGB: (hex: string) => RGBColor
  export const HEX_to_HSV: (hex: string) => HSVColor
  export const HSV_to_HEX: (hsv: HSVColor) => string
  export const HSV_to_RGB: (hsv: HSVColor) => RBGColor
  export const RGB_to_HEX: (rgb: RBGColor) => string
  export const RGB_to_HSV: (rgb: RBGColor) => HSVColor
}
