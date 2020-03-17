const numOfDaysBetween = (dateOne: Date, dateTwo: Date) => {
  const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

export { numOfDaysBetween };
