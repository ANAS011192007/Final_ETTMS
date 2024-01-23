"use client";
import { useAuth } from "@/app/AuthContext";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "@/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { AuthError } from "next-auth";
import { useFormState } from "react-dom";
import { useTranslation } from "@/app/i18n/client";
export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  // const { pending } = useFormStatus();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // if (errorMessage === undefined) {
  //   router.push("Tracking_registration");
  // }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
      // callbackUrl: "/",
      redirectTo: "Device_registration",
    };
    const pathname = usePathname();
    const lng = pathname.split("/")[1];
    const { t } = useTranslation(lng, "navbar");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-center mt-12 text-slate-500">
            ETTMS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-3">
            <div className="grid w-full items-center gap-4">
              <div className="relative flex flex-col space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-slate-500 absolute left-3 bg-white px-0.5"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder=""
                  required
                  className="border-2"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="relative flex flex-col space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-slate-500 absolute left-3 bg-white px-0.5"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder=""
                  required
                  minLength={6}
                  className="border-2"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 ">
                  <Switch id="remember-me" />
                  <Label htmlFor="remember-me" className="text-slate-500">
                    Remember me
                  </Label>
                </div>
                <div className="">
                  <Button
                    className="hover:bg-transparent border-none text-slate-500"
                    variant="outline"
                  >
                    Forgot Password?
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-slate-600  font-semibold text-white w-full mt-4"
              // aria-disabled={pending}
            >
              LOG IN
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            className="hover:bg-transparent hover:text-slate-400 border-none text-xs text-slate-400"
            variant="outline"
          >
            Don't have an account? Contact admin.
          </Button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
