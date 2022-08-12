const INVALID_PARAMS = {
  error: "INVALID_PARAMS",
  message: "Invalid parameters were received",
  detail: "Some of the parameters were invalid or incorrect.",
};
const INSUFFICIENT_PARAMS = {
  error: "INSUFFICIENT_PARAMS",
  message: "Insufficient parameters were received.",
  detail: "Some required parameter/s were not sent.",
};
const IMAGE_NOT_FOUND = {
  error: "IMAGE_NOT_FOUND",
  message: "No images were found",
  detail: "There are no images found in the request, please provide at least one image.",
};
const INVALID_TYPE = {
  error: "INVALID_TYPE",
  message: "Type sent in the request is invalid",
  detail: "Type sent in the request is invalid. Please provide a valid mimetype.",
};
const INVALID_PAYLOAD = {
  error: "INVALID_PAYLOAD",
  message: "Payload sent is invalid.",
  detail: "Payload sent is invalid. An unsupported type of file must have been sent.",
};
const WENT_WRONG = {
  error: "WENT_WRONG",
  message: "Something went wrong, Please try again later.",
  detail: "We have sent a report to our developers. We apologize for the inconvenience",
};

module.exports = {
  INVALID_PARAMS,
  INSUFFICIENT_PARAMS,
  IMAGE_NOT_FOUND,
  INVALID_TYPE,
  INVALID_PAYLOAD,
  WENT_WRONG,
};
