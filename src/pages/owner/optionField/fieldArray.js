import { useFieldArray } from "react-hook-form";
import { NestedChoicesArray } from "./nestedFieldArray";

export const OptionFields = ({ control, register, getValues, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <div>
      <ul>
        {fields.map((field, index) => {
          return (
            <li key={field.id}>
              <input {...register(`options[${index}].name`)} placeholder="Option Name" type="text" />
              <input {...register(`options[${index}].extra`, { valueAsNumber: true })} placeholder="Option Extra" type="number" min={0} />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedChoicesArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>
      <section>
        <button className="bg-lime-600 px-1 text-white" type="button" onClick={() => append({ name: "", extra: 0 })}>
          Add Dish Option
        </button>
      </section>
    </div>
  );
};
