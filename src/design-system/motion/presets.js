export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  smooth: { type: 'spring', stiffness: 300, damping: 25 },
  gentle: { type: 'spring', stiffness: 200, damping: 20 },
  bouncy: { type: 'spring', stiffness: 500, damping: 15 },
};

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  },
};
