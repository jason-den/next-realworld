const storage = async (key: string) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value!);
  } catch (error) {
    return undefined;
  }
};

export { storage };
