'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';

import useRegisterModel from "@/app/hooks/useRegisterModel";
import { error } from "console";
import Model from "./model";
import Heading from "../Heading";
import Input from "../inputs/Input";

const RegisterModel = () => {

  const registerModel = useRegisterModel();
  const [ isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{
      errors,
    }
  } = useForm<FieldValues> ({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register',data)
      .then(() => {
        registerModel.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      < Heading 
        title="Welcome to Airbnb"
        subtitle="Create an account"
      />
      <Input />
    </div>
  )

  return(
    <Model
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default RegisterModel;