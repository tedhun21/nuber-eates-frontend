import { useFieldArray } from "react-hook-form";

export const NestedChoicesArray = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `options[${nestIndex}].choices`,
  });
  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="ml-10">
            <label>Choice Array:</label>
            <input {...register(`options[${nestIndex}.choices[${index}].name]`)} placeholder="Choice Name" />
            <input {...register(`options[${nestIndex}.choices[${index}].extra]`, { valueAsNumber: true })} placeholder="Choice Extra" type="number" />
            <button onClick={() => remove(index)}>Delete Choice</button>
          </div>
        );
      })}
      <button className="ml-5 mt-2" type="button" onClick={() => append({ name: "", extra: 0 })}>
        Add Choice
      </button>
    </div>
  );
};
