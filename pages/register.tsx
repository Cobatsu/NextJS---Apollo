import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import styles from "../styles/register.module.css";
import { useRouter } from "next/router";
import { FieldProps, FormikErrors } from "formik";
import { MyInput } from "../components/form";

const REGISTER_MUTATION = gql`
  mutation Register($user: RegisterInput!) {
    register(user: $user) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const Register = () => {
  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      router.push(`/login`);
    },
  });

  const router = useRouter();

  const submitHandler = async (values) => {
    const data = await register({
      variables: {
        user: {
          ...values,
        },
      },
    });
  };

  return (
    <div className={styles.formWrapper}>
      {" "}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(8, "Must be 8 characters or less")
            .required("This Field Can Not Be Blank !"),
          lastName: Yup.string()
            .max(8, "Must be 8 characters or less")
            .required("This Field Can Not Be Blank !"),
          email: Yup.string()
            .email("Invalid email address")
            .required("This Field Can Not Be Blank !"),
          password: Yup.string()
            .required("No password provided. !")
            .min(8, "Should be 8 chars minimum. !"),
        })}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field
              name="firstName"
              component={MyInput}
              placeholder="First Name"
            />
            <Field
              name="lastName"
              component={MyInput}
              placeholder="Last Name"
            />
            <Field name="email" component={MyInput} placeholder="Email" />
            <Field
              name="password"
              type="password"
              component={MyInput}
              placeholder="Password"
            />

            <button
              className={styles.SubmitButton}
              type="submit"
              disabled={isSubmitting}
            >
              {" "}
              REGISTER{" "}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
