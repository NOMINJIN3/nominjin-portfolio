declare module "react" {
  export function useEffect(...args: any[]): any;
  export function useRef<T>(initialValue: T): { current: T };
  export function useRef<T>(initialValue: T | null): { current: T | null };
  export function useState<S>(initial: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void];
  export const Fragment: any;
  export type ReactNode = any;
  export type CSSProperties = any;
  const React: any;
  export default React;
}

declare module "react/jsx-runtime" {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "next/image" {
  import * as React from "react";
  type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    width?: number | string;
    height?: number | string;
    src: string;
    alt?: string;
  };
  const Image: React.FC<ImageProps>;
  export default Image;
}
