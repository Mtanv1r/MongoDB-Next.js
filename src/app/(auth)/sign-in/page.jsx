"use client";

import { signIn, signUp } from "@/lib/auth-client";
// import {Check} from "@gravity-ui/icons";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, InputGroup, Label, TextField} from "@heroui/react";
import { google } from "better-auth";
// import {sInputGroup, Label, TextField} from "@heroui/react";
import {useState} from "react";


import React from 'react';

const Page = () => {

    // event handler 
      const [isVisible, setIsVisible] = useState(false);

      // const googleClick = async ()=>{
      //   const resdata=await signIn.social({
      //     provider:'google'
      //   })

      //   console.log(resdata)
      // }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //javascript system
    // jhankar bai part 
      const data = Object.fromEntries(formData.entries());
      console.log(   "form er data",data)
      
//   destructuring part 
// goes to mongodb
   const {data:resData , error} = await signIn.email({
        // name:data.name,
        email:data.email,
        password:data.password,
        // remember me part true 
        rememberMe:true,
        // after use route goes to homepage
        callbackURL: "/", 
    })

    console.log("after submit",resData,error)


  };





    return (
        <div className="container mx-auto p-50 flex flex-col items-center justify-evenly gap-10">
            <h1>sign-in page</h1>
               <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
          <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
          //hard coded
          // value={isVisible ? "87$2h.3diua" : "••••••••"}
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Tor password ta de niya nimu" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          {/* <Check /> */}
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    <h1>OR</h1>
    
      <Button variant="secondary" onClick={googleClick}>Google</Button>
        </div>
    );
};

export default Page;