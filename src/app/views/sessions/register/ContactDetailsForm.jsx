import { Formik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import useAuth from "app/hooks/useAuth";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    businessName: Yup.string(),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required!"),
    email: Yup.string().email("Invalid email address").required("Email is required!"),
    password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required!"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required!"),
    role: Yup.string().required("Role is required!"), 
  });

export default function ContactDetailsForm({ formData, setFormData, setStep }) {
  const { generateOtp } = useAuth();

  const handleFormSubmit = async (values) => {
    setFormData(values);
    const data = await generateOtp(values.phoneNumber);
    if(data.status){
        setStep('otp');
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={formData}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Role</InputLabel>
                <Select
                name="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Role"
                error={Boolean(errors.role && touched.role)}
                >
                <MenuItem value="wholeseller">Wholeseller</MenuItem>
                <MenuItem value="retailer">Retailer</MenuItem>
                <MenuItem value="delivery">Delivery</MenuItem>
                </Select>
                {touched.role && errors.role && (
                <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.role}
                </div>
                )}
            </FormControl>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="firstName"
            label="First Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.firstName}
            onChange={handleChange}
            helperText={touched.firstName && errors.firstName}
            error={Boolean(errors.firstName && touched.firstName)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="lastName"
            label="Last Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.lastName}
            onChange={handleChange}
            helperText={touched.lastName && errors.lastName}
            error={Boolean(errors.lastName && touched.lastName)}
            sx={{ mb: 3 }}
          />
        {(values.role === "wholeseller" || values.role === "retailer") && (
            <TextField
              fullWidth
              size="small"
              type="text"
              name="businessName"
              label="Business Name"
              variant="outlined"
              onBlur={handleBlur}
              value={values.businessName}
              onChange={handleChange}
              helperText={touched.businessName && errors.businessName}
              error={Boolean(errors.businessName && touched.businessName)}
              sx={{ mb: 3 }}
            />
          )}

          <TextField
            fullWidth
            size="small"
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.phoneNumber}
            onChange={handleChange}
            helperText={touched.phoneNumber && errors.phoneNumber}
            error={Boolean(errors.phoneNumber && touched.phoneNumber)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            helperText={touched.email && errors.email}
            error={Boolean(errors.email && touched.email)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            helperText={touched.password && errors.password}
            error={Boolean(errors.password && touched.password)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            name="passwordConfirmation"
            type="password"
            label="Confirm Password"
            variant="outlined"
            onBlur={handleBlur}
            value={values.passwordConfirmation}
            onChange={handleChange}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
            error={Boolean(errors.passwordConfirmation && touched.passwordConfirmation)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
                sx={{ mb: 2 }}
              >
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
