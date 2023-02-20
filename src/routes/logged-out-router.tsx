import { useForm } from "react-hook-form";

export default function LoggedOutRouter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const onInValid = () => {
    console.log(errors);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInValid)}>
        <div>
          <input {...register("email", { required: "This is required", pattern: /^[A-Za-z]+@gmail.com$/ })} placeholder="email" />
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
