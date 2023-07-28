export const _capitalizedStr = (str: string) => {
    const capitalizedStr = str.replace(/\b\w/g, c => c.toUpperCase());
    return capitalizedStr;
};

export function getRandomBoolean() {
  return Math.random() < 0.5;
}