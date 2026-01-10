const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const resolveSpotlightRect = (target) => {
  if (!target) return null;
  const rect = target.getBoundingClientRect();
  const pad = 6;
  return {
    left: Math.max(rect.left - pad, 8),
    top: Math.max(rect.top - pad, 8),
    width: rect.width + pad * 2,
    height: rect.height + pad * 2
  };
};

export const resolveTooltipPosition = (rect) => {
  const width = 264;
  const margin = 12;
  if (!rect) {
    return { left: (window.innerWidth - width) / 2, top: window.innerHeight * 0.4 };
  }
  const left = clamp(rect.left, margin, window.innerWidth - width - margin);
  const top = rect.top + rect.height + margin;
  return { left, top: Math.min(top, window.innerHeight - margin - 140) };
};
