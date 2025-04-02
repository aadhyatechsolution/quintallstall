import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "app/hooks/useAuth";

const BankDetailsForm = ({ formdata }) => {
  const { register, setStep } = useAuth();

  const initialValues = {
    bankAccountNumber: "",
    routingNumber: "",
  };

  const validationSchema = Yup.object().shape({
    bankAccountNumber: Yup.string()
      .matches(/^\d{9}$/, "Bank account number must be 9 digits")
      .required("Bank account number is required!"),
    routingNumber: Yup.string()
      .matches(/^\d{9}$/, "Routing number must be 9 digits")
      .required("Routing number is required!"),
  });

  const camelToSnake = (str) => {
    return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  };

  const convertObjectKeysToSnakeCase = (obj) => {
    const newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = camelToSnake(key);
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  };

  const handleSubmit = async (values) => {
    const mergedData = { ...formdata, ...values };
    const snakeCaseData = convertObjectKeysToSnakeCase(mergedData);
    try {
      await register(snakeCaseData);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="bankAccountNumber"
            label="Bank Account Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.bankAccountNumber}
            onChange={handleChange}
            helperText={touched.bankAccountNumber && errors.bankAccountNumber}
            error={Boolean(errors.bankAccountNumber && touched.bankAccountNumber)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="routingNumber"
            label="Routing Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.routingNumber}
            onChange={handleChange}
            helperText={touched.routingNumber && errors.routingNumber}
            error={Boolean(errors.routingNumber && touched.routingNumber)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2} justifyContent="space-between">
            {/* Back Button */}
            <Grid item xs={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => setStep(3)}
              >
                Back
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={4}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
                fullWidth
              >
                Register
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default BankDetailsForm;
