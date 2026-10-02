
"use client";

import React from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { signIn, signUp } from "@/lib/auth-client";

const Page = () => {

  // Google login
  const googleClick = async () => {
    const resdata = await signIn.social({
      provider: "google",
    });

    console.log("after google signing..", resdata);
  };

  // Github login
  const githubClick = async () => {
    const resdata = await signIn.social({
      provider: "github",
    });

    console.log("after github signing..", resdata);
  };

  // Email signup
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("data from form:", data);

    const { data: resData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log(resData, error);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-evenly gap-10 p-10">

      <h1>Sign Up Page</h1>

      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >

        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
          minLength={8}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            Submit
          </Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>

      </Form>

      <h1>Or</h1>

      <Button
        variant="secondary"
        onClick={googleClick}
      >
        Google
      </Button>

      <Button
        variant="secondary"
        onClick={githubClick}
      >
        Github
      </Button>

    </div>
  );
};

export default Page;