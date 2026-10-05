/*
 * Used to tilt the whole page in 3D (max ~0.3°) following the mouse, re-rendering
 * the page every animation frame. The tilt was barely visible, cost CPU on every
 * frame, and the page-wide 3D layer made Chrome draw hairline tile seams (e.g. a
 * thin gray line across the terminal). Kept as a plain wrapper so page structure
 * and the .parallax-root class stay the same.
 */
export default function ParallaxProvider({ children }: { children: React.ReactNode }) {
  return <div className="parallax-root">{children}</div>;
}
