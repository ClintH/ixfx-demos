// src/debug/GetErrorMessage.ts
var getErrorMessage = (ex) => {
  if (typeof ex === `string`) return ex;
  if (ex instanceof Error) {
    return ex.message;
  }
  return ex;
};

export {
  getErrorMessage
};
//# sourceMappingURL=chunk-4IJNRUE7.js.map