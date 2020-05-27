export const getErrorType = (error) => {
  if (error.response) {
    if (error.response.data) {
      return error.response.data;
    }
    return error.response;
  }
  return error;
};

export default getErrorType;
