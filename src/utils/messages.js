export default {
  GLOBAL: {
    MANDATORY_FIELD: "Please enter a value",
  },
  LOGIN: {
    INVALID_USERNAME_PASSWORD: "Email and/or password do not match",
    ERR_USERNAME_MANDATORY: "Email is required",
    ERR_USERNAME_INVALID: "Email is invalid",
    ERR_PASSWORD_MANDATORY: "Password is required",
    ERR_PASSWORD_REGEX:"adMin@12",
    REGEX_OF_PASSWORD_MINIMUM: 'Password should contain atleast 6 characters',
    REGEX_OF_PASSWORD_NUMBER:'Password should contain atleast 1 number',
    REGEX_OF_PASSWORD_UPPERCASE:'at list one UPPERCASE A-Z',
    REGEX_OF_PASSWORD_LOVERCASE:'at list one LOVERCASE a-z',
    REGEX_OF_PASSWORD_SPECIAL:'at list one special character @$!%*#?&',
    SUCCESS:'Login SuccessFully'
  },
  USER: {
    API_FAILURE:
      "Something went wrong, we were unable to process your request, please refresh and try again. If the problem persists please contact our support team at admin-support@gmail.com",
    EDIT: {
      MANDATORY_FIELD: "* is required",
      SELECT_ANY_ONE: "Please select a any one",
      INVALID_FIELD:
        "Value must be 1-45 characters (A-Z, a-z, 0-9, and special characters like _(underscore), - (hyphen), ? (question mark), & (ampersand)",
      LENGTH: "Length must be ", // ${labels.WORKFLOWS.STEP_1.LENGTH_OF_WORKFLOW_NAME}
    },
    
  },
  CONSUMER: {
    UPDATE:'Updated Successfully'
  },
};
