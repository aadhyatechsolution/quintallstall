import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "app/hooks/useAuth";

const AddressForm = ({ setFormdata }) => {
  const { setStep } = useAuth();

  const initialValues = {
    address: "",
    city: "",
    state: "",
    postalCode: "",
    shopNumber: "",
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required!"),
    city: Yup.string().required("City is required!"),
    state: Yup.string().required("State is required!"),
    postalCode: Yup.string()
      .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
      .required("Zip code is required!"),
    shopNumber: Yup.string()
      .matches(/^[0-9]{5}$/, "Shop number must be 5 digits")
      .required("Shop number is required!"),
  });

  // const camelToSnake = (str) => {
  //   return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  // };

  // const convertObjectKeysToSnakeCase = (obj) => {
  //   const newObj = {};
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       const newKey = camelToSnake(key);
  //       newObj[newKey] = obj[key];
  //     }
  //   }
  //   return newObj;
  // };

  const handleSubmit = async (values) => {
    setStep(4)
    setFormdata((formdata)=>{
      return { ...formdata, ...values };
    })
    
    // const snakeCaseData = convertObjectKeysToSnakeCase(mergedData);
    try {
      // await register(snakeCaseData);
      // navigate("/");
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
            name="address"
            label="Address"
            variant="outlined"
            onBlur={handleBlur}
            value={values.address}
            onChange={handleChange}
            helperText={touched.address && errors.address}
            error={Boolean(errors.address && touched.address)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="city"
            label="City"
            variant="outlined"
            onBlur={handleBlur}
            value={values.city}
            onChange={handleChange}
            helperText={touched.city && errors.city}
            error={Boolean(errors.city && touched.city)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="state"
            label="State"
            variant="outlined"
            onBlur={handleBlur}
            value={values.state}
            onChange={handleChange}
            helperText={touched.state && errors.state}
            error={Boolean(errors.state && touched.state)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="postalCode"
            label="Zip Code"
            variant="outlined"
            onBlur={handleBlur}
            value={values.postalCode}
            onChange={handleChange}
            helperText={touched.postalCode && errors.postalCode}
            error={Boolean(errors.postalCode && touched.postalCode)}
            sx={{ mb: 3 }}
          />

          {/* Add shopNumber field */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="shopNumber"
            label="Shop Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.shopNumber}
            onChange={handleChange}
            helperText={touched.shopNumber && errors.shopNumber}
            error={Boolean(errors.shopNumber && touched.shopNumber)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2} justifyContent="space-between">
            {/* Back Button */}
            <Grid item xs={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => setStep(2)}
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
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
