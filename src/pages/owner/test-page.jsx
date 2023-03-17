import { useState } from "react";
import { Control, Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

export const TestPage = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: { options: [{ name: "", extra: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = ({ options }) => {
    console.log(typeof options[0]["extra"]);
    console.log(options[0]["extra"]);
  };
  const [dishOption, setDishOption] = useState(false);
  return (
    <div>
      {dishOption && (
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              extra: "",
            })
          }
        >
          append
        </button>
      )}
      <button
        onClick={() => {
          setDishOption((current) => !current);
        }}
      >
        Dish Option
      </button>
      {dishOption && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id}>
              <section>
                <input {...register(`options.${index}.name`, { required: true })} placeholder="Option Name" />
                <input {...register(`options.${index}.extra`,{valueAsNumber:true})} type="number" placeholder="Option Extra" min={0} />
                <button
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </button>
              </section>
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
