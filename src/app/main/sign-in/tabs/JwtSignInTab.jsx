import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { useDispatch } from "react-redux";
import { ShowErrorToast } from "app/shared-components/ShowErrorToast";
/**
 * Form Validation Schema
 */
const schema = z.object({
  contact: z.string().nonempty("يجب ادخال الاسم"),
  password: z
    .string()
    .min(4, "يجب ان تكون كلمة المرور 4 محارف او اكثر")
    .nonempty("الرجاء ادخال كلمة المرور"),
});
const defaultValues = {
  contact: "",
  password: "",
  remember: true,
};

function jwtSignInTab() {
  const { jwtService } = useAuth();
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, setValue, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  useEffect(() => {
    setValue("contact", "admin@admin.com", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "0000", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue]);

  function onSubmit(formData) {
    const { contact, password } = formData;
    jwtService
      .signIn({
        contact,
        password,
      })
      .catch((error) => {
        ShowErrorToast(error)
      });
  }

  return (
    <div className="w-full">
      <form
        name="loginForm"
        noValidate
        className="mt-32 flex w-full flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="contact"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="البريد الكتروني"
              autoFocus
              type="contact"
              error={!!errors.contact}
              helperText={errors?.contact?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="كلمة المرور"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Button
          variant="contained"
          color="secondary"
          className=" mt-16 w-full"
          aria-label="Sign in"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          تسجيل الدخول
        </Button>
      </form>
    </div>
  );
}

export default jwtSignInTab;
