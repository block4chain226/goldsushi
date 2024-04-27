export function cut(value: string): string {
  const sub = ['item', 'category'];
  const index = value.split('').findIndex((ch) => ch === ch.toUpperCase());
  if (index === -1) {
    sub.filter((item) => {
      if (value.toLowerCase().includes(item.toLowerCase())) {
        return item.toString();
      }
    });
  }
  return value.substring(index).toString().toUpperCase();
}
