import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { setCookie } from "nookies";

const signIn = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFromType = z.infer<typeof signIn>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<SignInFromType>({
    resolver: zodResolver(signIn),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const { errors } = formState;

  async function handleLogin(data: SignInFromType) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/users/sessions`,
        data
      );

      const { token } = response.data;

      setCookie(null, "token", token, {
        maxAge: 60 * 60 * 24, // 24h
        path: "/",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error when trying to sign in, try again later.");
    }
  }

  return (
    <div>
      <h1 className="text-white text-3xl">Login</h1>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleLogin)}>
        <Input
          label="Email"
          {...register("email")}
          error={!!errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password?.message}
        />
        <Button type="submit">Login</Button>
      </form>

      <div className="mt-4">
        <span className="text-white text-center">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}
