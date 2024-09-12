import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const signUp = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFromType = z.infer<typeof signUp>;

export function SignUp() {
  const { register, handleSubmit, formState } = useForm<SignInFromType>({
    resolver: zodResolver(signUp),
  });
  const navigate = useNavigate();

  const { errors } = formState;

  async function handleSignUp(data: SignInFromType) {
    try {
      await axios.post(`${import.meta.env.VITE_API_HOST}/users`, data);

      alert("User created with success, now you can sign in.");
      navigate(`/sign-in?email=${data.email}`);
    } catch (error) {
      alert("Error where trying to sign up, try again later.");
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="text-white text-3xl">SignUp</h1>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleSignUp)}>
        <Input
          label="Name"
          {...register("name")}
          error={!!errors.name?.message}
        />
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
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}
