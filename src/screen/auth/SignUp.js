import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AuthContext, { AuthRoles } from "../../context/auth/AuthContext";
import {
  Grid,
  IconButton,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Button,
  TextField,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required().min(3).max(20),
  lastName: yup.string().required().min(3).max(20),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Deben contener al menos 8 carracteres")
    .max(30, "Deben ser menos de 30 carracter")
    .matches(
      RegExp("(.*[a-z].*)"),
      "La contraseña debe contener al menos una minuscula"
    )
    .matches(
      RegExp("(.*[A-Z].*)"),
      "La contraseña debe contener al menos una mayuscula"
    )
    .matches(
      RegExp("(.*\\d.*)"),
      "La contraseña debe contener al menos un numero"
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "La contraseña debe contener al menos un carracter especial"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required(),
  type: yup.string().required("Debes seleccinar alguno"),
  business: yup
    .string()
    .min(4, "Debe contener al menos 4 carracteres")
    .max(30, "Deben ser menos de 30 carracteres")
    .default(() => {
      return "none";
    }),
});
const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #00F260 30%, #0575E6 90%)",
    borderRadius: "40px",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 25px",
    boxShadow: "0 3px 5px 2px rgba(0,242,96, .3)",
    "&:hover": {
      boxShadow: "0 3px 5px 2px rgba(5,117,230, .3)",
    },
  },
  inputs: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  noAccount: {
    marginTop: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    display: "inline-block",
  },
  splitLeft: {
    height: "100vh",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#267CFE",
  },
  splitRight: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#fff",
  },
  form: {
    width: "350px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
  dividerLeft: {
    width: "10%",
    height: "2%",
    marginTop: theme.spacing(1),
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  dividerRight: {
    width: "6%",
    height: "1%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    backgroundColor: "#267CFE",
    borderRadius: "5px",
  },
  orLogin: {
    display: "flex",
    flexDirection: "column",
  },
}));

function SignIn() {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  let history = useHistory();
  const classes = useStyles();
  const { signUp } = useContext(AuthContext);
  const watchType = watch("type");
  const onSubmit = async (data) => {
    const res = await signUp(data);
    if (res) {
      history.push("/login");
      reset(
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false,
        }
      );
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <Box pl={2} pr={2} className={classes.splitLeft}>
          <Box ml={6} mr={6}>
            <Typography
              variant="h5"
              component="h4"
              style={{ fontWeight: "bold" }}
            >
              Bienvenido a Nerby Business
            </Typography>
            <Divider className={classes.dividerLeft} />
            <Box mt={5}>
              <Typography variant="body1" component="p" align="justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore
                consectetur, neque doloribus, cupiditate numquam dignissimos
                laborum fugiat deleniti? Eum quasi quidem quibusdam
              </Typography>
            </Box>
            <Box mt={5}>
              <Button
                variant="outlined"
                color="secondary"
                style={{
                  borderRadius: "60px",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                Conoce Mas
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box pl={2} pr={2} className={classes.splitRight}>
          <Typography
            variant="h5"
            component="h4"
            style={{ fontWeight: "bold" }}
          >
            Crear Cuenta
          </Typography>
          <Divider className={classes.dividerRight} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.form}
            >
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Nombre"
                        placeholder="Juan"
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Apellido"
                        placeholder="Garzon"
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item className={classes.inputs}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Correo"
                      placeholder="ejemplo@nerbyBusiness.com"
                      error={errors.email ? true : false}
                      className={classes.inputs}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Contraseña"
                        placeholder="********"
                        className={classes.inputs}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="passwordConfirmation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Confirmar contraseña"
                        placeholder="********"
                        className={classes.inputs}
                        error={errors.passwordConfirmation ? true : false}
                        helperText={errors.passwordConfirmation?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {watchType === AuthRoles.EMPRESARIO ? (
                <Grid item className={classes.inputs}>
                  <Controller
                    name="business"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Nombre de la empresa"
                        placeholder="Tesla"
                        className={classes.inputs}
                        error={errors.business ? true : false}
                        helperText={errors.business?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              ) : (
                ""
              )}

              <Grid item className={classes.inputs}>
                <FormControl
                  className={classes.inputs}
                  error={errors.type ? true : false}
                >
                  <InputLabel id="select">Tipo</InputLabel>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue={AuthRoles.NORMAL}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        labelId="select"
                        id="select"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={AuthRoles.EMPRESARIO}>
                          Microempresa
                        </MenuItem>
                        <MenuItem value={AuthRoles.NORMAL}>Normal</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.type?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item className={classes.inputs}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.inputs}
                >
                  Resgistrarse
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignIn;
