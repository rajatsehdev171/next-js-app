"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    const getToken = localStorage.getItem("token");

    if (getEmail && getToken) {

      router.push("/blog");
    }
  }, []);

  const login = async (event: any) => {
    event.preventDefault();
    const { email, password } = formData;
    if(email && password){
      try {
        const response = await fetch("/api/auth/login", {
         method: "POST",
         headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify({
           email,
           password,
         }),
       });
       const newResponse = await response;
 
       if (!response.ok) {
         throw new Error("Failed to sign in!");
       }
      //  console.log('checking signin details after success',(await newResponse.json()).user)
       const user = (await newResponse.json()).user;
      //  setTimeout(() => {
        localStorage.setItem("email", user.email);
        localStorage.setItem("token", user.token);
      //  },10)
        router.push("/blog");
     } catch (error: any) {
       alert("Invalid credentails!");
     }
    }
  };

  const feedInputText = (e: React.ChangeEvent<HTMLInputElement>,type='') => {
    let formDataNew = {...formData};
    if(type == 'email'){
      formDataNew.email = e.target.value;
    }else{
      formDataNew.password = e.target.value;
    }
    setFormData(formDataNew);
  }

  return (
      <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => feedInputText(e,'email')}/>
        </div>
      </div>

      <div>
      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  onChange={(e) => feedInputText(e,'password')}/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={login}>Sign in</button>
      </div>
    </form>
  </div>
</div>
      </div>
  );
}

export default SignIn;

