export const cutString = (title: string) =>
  title.length >= 25 ? title.substring(0, 25) + '...' : title;
