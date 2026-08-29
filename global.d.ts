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

declare module "three" {
  export class Clock {
    elapsedTime: number;
  }
  export class BufferGeometry {
    setAttribute(name: string, attribute: any): void;
  }
  export class Float32Array extends globalThis.Float32Array {}
  export class Object3D {
    rotation: { x: number; y: number; z: number };
    scale: { set(x: number, y: number, z: number): void };
  }
  export class Mesh extends Object3D {}
  export class Points extends Object3D {}
}

declare module "@react-three/fiber" {
  import { ReactNode } from "react";
  export function Canvas(props: {
    children?: ReactNode;
    camera?: any;
    gl?: any;
    style?: any;
  }): JSX.Element;
  export function useFrame(callback: (state: any) => void): void;
}

declare module "@react-three/drei" {
  import { ReactNode } from "react";
  export function Float(props: {
    children?: ReactNode;
    speed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
  }): JSX.Element;
  export function MeshDistortMaterial(props: any): JSX.Element;
}
