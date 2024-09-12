// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateFields(values: any = {}) {
  const errors = Object.keys(values).filter((key) => {
    const value = values[key];
    const numberOrString = typeof value;

    if (!value) {
      return true;
    }

    if (numberOrString === "string" && !value.length) return true;
    if (numberOrString === "number" && value === 0) return true;

    return false;
  });

  return errors;
}
