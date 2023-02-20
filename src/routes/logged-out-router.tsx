import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export default function LoggedOutRouter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: any) => console.log(data);
  const onInValid = () => {
    console.log("can't create account");
  };
  console.log(errors.email?.type);
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInValid)}>
        <div>
          <input {...register("email", { required: "This is required", pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/ })} placeholder="email" />
          {errors.email?.message && <span className="font-bold text-red-600">{errors.email?.message}</span>}
          {errors.email?.type === "pattern" && <span className="font-bold text-red-600">Only Gmail allowed</span>}
        </div>

        <div>
          <input {...register("password", { required: true })} type="password" placeholder="password" />
        </div>
        <button type="submit" className="bg-yellow-300 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
