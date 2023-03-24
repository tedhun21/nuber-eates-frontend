import { useForm } from "react-hook-form";
import { OptionFields } from "./optionField/fieldArray";

const defaultValues = {
  options: [
    {
      name: "",
      extra: 0,
      choices: [{ name: "", extra: 0 }],
    },
  ],
};

export const TestPage = () => {
  const { control, register, handleSubmit, getValues, errors, reset, setValue } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OptionFields {...{ control, register, defaultValues, getValues, setValue, errors }} />

      <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>

      <input type="submit" />
    </form>
  );
};
