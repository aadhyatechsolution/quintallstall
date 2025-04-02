import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import LoadingButton from "@mui/lab/LoadingButton";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";
import OtpVerificationForm from "./OtpVerificationForm";
import AddressForm from "./AddressForm";

// STYLED COMPONENTS
const RegisterRoot = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": { maxWidth: 750, margin: 16, borderRadius: 12 }
});

// Initial login credentials
const initialValues = {
  firstName: "",
  lastName: "",
  businessName: "",
  phoneNumber: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  remember: true,
};

// Form field validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
  businessName: Yup.string().required("Business name is required!"),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required!"),
  email: Yup.string().email("Invalid email address").required("Email is required!"),
  password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required!"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required!"),
});

export default function JwtRegister() {
  const theme = useTheme();
  const { register, generateOtp, step, setStep } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);


  const handleFormSubmit = (values) => {
    setFormData(values);
    generateOtp(values.phoneNumber)
  };
    // Render the user info form or OTP form based on current step
    const renderForm = () => {
      if (step === 1) {
        return (
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={formData}
            validationSchema={validationSchema}>
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
  
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ mb: 2 }}>
                  Submit
                </LoadingButton>
              </form>
            )}
          </Formik>
        );
      } else if (step === 2) {
        return (
          <OtpVerificationForm phoneNumber={formData.phoneNumber} />
        );
      } else if (step === 3) {
        return <AddressForm setFormData={setFormData}/>;
      }else if(step === 4){
        return <BankDetailsForm formdata={formData}/>;
      }
    };
  
    return (
      <RegisterRoot>
        <Card className="card">
          <Grid container>
            <Grid size={12}>
              <Box p={4} height="100%">
                {renderForm()}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </RegisterRoot>
    );
}
