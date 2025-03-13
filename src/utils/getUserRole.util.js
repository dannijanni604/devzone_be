export const checkUserAuthorization = (user) => {
  if (!user) {
    const error = new Error("Unauthorized: No user found in request");
    error.statusCode = 401;
    throw error;
  }
};
