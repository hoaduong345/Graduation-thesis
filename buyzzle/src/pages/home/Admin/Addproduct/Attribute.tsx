import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import AttributeForm from "./AttributeForm";
import { FormValues } from "../EditProduct/EditProductMap";

interface AttributeProps {
  fields: FieldArrayWithId<FormValues, "attributes", "id">[];
  append: UseFieldArrayAppend<FormValues, "attributes">;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, any>;
}
export default function Attribute(props: AttributeProps) {
  const { fields, errors, control, append, remove } = props;

  const handlePlusClick = () => {
    append({ color: "", soluong: 1, size: "" });
  };

  const handleMinusClick = (index: number) => {
    remove(index);
  };

  return (
    <div className="mt-7">
      <span className="text-[#000] text-2xl font-normal max-xl:text-xl max-lg:text-base">
        Thuộc Tính Sản Phẩm
      </span>

      <div
        className="py-6 px-6 mt-2 rounded-md
        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      >
        <AttributeForm
          fields={fields}
          control={control}
          errors={errors}
          handlePlusClick={handlePlusClick}
          handleMinusClick={handleMinusClick}
        />
      </div>
    </div>
  );
}
