import React from "react";
const COLOR_SCHEMES = {
  purple: {
    core: "via-purple-400",
    glow: [
      "via-purple-400",
      "via-purple-500",
      "via-purple-400",
      "via-purple-300",
    ],
  },
  blue: {
    core: "via-blue-400",
    glow: ["via-blue-400", "via-blue-500", "via-blue-400", "via-blue-300"],
  },
  green: {
    core: "via-green-400",
    glow: ["via-green-400", "via-green-500", "via-green-400", "via-green-300"],
  },
  red: {
    core: "via-red-400",
    glow: ["via-red-400", "via-red-500", "via-red-400", "via-red-300"],
  },
};
const GlowLine = ({ orientation, position, className = "", color }) => {
  const isVertical = orientation === "vertical";
  const containerClasses = isVertical
    ? "absolute w-px h-full"
    : "absolute w-full h-px";
  const positionStyle = isVertical
    ? {
        left: position,
      }
    : {
        top: position,
      };
  const gradientDirection = isVertical
    ? "bg-gradient-to-b"
    : "bg-gradient-to-r";
  const selectedScheme = COLOR_SCHEMES[color];
  const glowLayers = [
    {
      size: isVertical ? "w-1 -ml-0.5" : "h-1 -mt-0.5",
      blur: "blur-sm",
      opacity: "opacity-100",
      color: selectedScheme.glow[0],
    },
    {
      size: isVertical ? "w-2 -ml-1" : "h-2 -mt-1",
      blur: "blur-md",
      opacity: "opacity-80",
      color: selectedScheme.glow[1],
    },
    {
      size: isVertical ? "w-4 -ml-2" : "h-4 -mt-2",
      blur: "blur-lg",
      opacity: "opacity-60",
      color: selectedScheme.glow[2],
    },
  ];
  return (
    <div className={`${containerClasses} ${className}`} style={positionStyle}>
      <div
        className={`absolute inset-0 ${gradientDirection} from-transparent ${selectedScheme.core} to-transparent`}
      />
      <div
        className={`absolute inset-0 ${
          isVertical ? "w-0.5 -ml-px" : "h-0.5 -mt-px"
        } ${gradientDirection} from-transparent via-white to-transparent opacity-60`}
      />
      {glowLayers.map((layer, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${layer.size} ${gradientDirection} from-transparent ${layer.color} to-transparent ${layer.blur} ${layer.opacity}`}
        />
      ))}
    </div>
  );
};
export default GlowLine;
