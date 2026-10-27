declare module "next/image" {
  import type { ImgHTMLAttributes } from "react";
  type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    width?: number | string;
    height?: number | string;
    src: string;
    alt?: string;
  };
  const Image: React.FC<ImageProps>;
  export default Image;
}
