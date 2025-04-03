import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import LoadingButton from "@mui/lab/LoadingButton";
import MatxDivider from "app/components/MatxDivider";
import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  phone: "",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .optional(),
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function JwtLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    try {
      await login(values.phone_number, values.email, values.password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid size={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
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
                    {/* Phone Number Field */}
                    <TextField
                      fullWidth
                      size="small"
                      type="tel"
                      name="phone_number"
                      label="Phone Number"
                      variant="outlined"
                      placeholder="Enter your phone number"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
                      sx={{ mb: 3 }}
                    />
                    <MatxDivider sx={{ px: 4, mb: 4 }} text="Or" />

                    {/* Email Field */}
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

                    {/* Password Field */}
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
                      sx={{ mb: 1.5 }}
                    />

                    {/* Remember Me and Forgot Password */}
                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />
                        <Paragraph>Remember Me</Paragraph>
                      </Box>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}>
                        Forgot password?
                      </NavLink>
                    </Box>

                    {/* Submit Button */}
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={isSubmitting}
                      variant="contained"
                      sx={{ my: 2 }}>
                      Login
                    </LoadingButton>

                    {/* Register Link */}
                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{
                          marginInlineStart: 5,
                          color: theme.palette.primary.main
                        }}>
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </StyledRoot>
  );
}
