import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
} from "react-hook-form";
import MinusAttribute from "../../../../assets/TSX/MinusAttribute";
import PlusAttribute from "../../../../assets/TSX/PlusAttribute";
import { FormValues } from "../EditProduct/EditProductMap";

interface Form {
  handleMinusClick: (index: number) => void;
  handlePlusClick: () => void;
  fields: FieldArrayWithId<FormValues, "attributes", "id">[];
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
}
export default function AttributeForm(props: Form) {
  const { handleMinusClick, handlePlusClick, fields, control, errors } = props;
  return (
    <form>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="grid grid-cols-12 col-span-10 gap-3 ">
            <div className="col-span-4">
              <Controller
                control={control}
                name={`attributes.${index}.size`}
                rules={{
                  required: {
                    value: true,
                    message: "Nhập size!",
                  },
                  maxLength: {
                    value: 2,
                    message: "Size tối đa 2 ký tự!",
                  },
                }}
                render={({ field }) => (
                  <>
                    <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                      Size
                      <span className="text-[#FF0000]">*</span>
                    </p>
                    <input
                      //   {...field}
                      className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%] rounded-[6px] px-[15px] py-[12px]
                                                            max-xl:text-sm max-lg:text-[13px] 
                                                            ${
                                                              errors.attributes &&
                                                              errors.attributes[
                                                                index
                                                              ]?.size
                                                                ? "border-[1px] border-red-900"
                                                                : "border-[1px] border-[#FFAAAF]"
                                                            }
                                                            `}
                      placeholder="38, 38, 39,.."
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                    {errors.attributes && errors.attributes[index]?.size && (
                      <p className="text-red-700 mt-2">
                        {errors.attributes[index]?.size?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-span-4">
              <Controller
                name={`attributes.${index}.color`}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Nhập màu sắc!",
                  },
                  maxLength: {
                    value: 6,
                    message: "Màu sắc không hợp lệ!",
                  },
                }}
                render={({ field }) => (
                  <>
                    <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                      Màu Sắc
                      <span className="text-[#FF0000]">*</span>
                    </p>
                    <input
                      className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%] rounded-[6px] px-[15px] py-[12px]
                                                            max-xl:text-sm max-lg:text-[13px]
                                                            ${
                                                              errors.attributes &&
                                                              errors.attributes[
                                                                index
                                                              ]?.color
                                                                ? "border-[1px] border-red-900"
                                                                : "border-[1px] border-[#FFAAAF]"
                                                            }
                                                   `}
                      placeholder="Đen, Trắng,.."
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    {errors.attributes && errors.attributes[index]?.color && (
                      <p className="text-red-700 mt-2">
                        {errors.attributes[index]?.color?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-span-3">
              <Controller
                control={control}
                name={`attributes.${index}.soluong`}
                rules={{
                  required: {
                    value: true,
                    message: "Nhập số lượng!",
                  },
                  maxLength: {
                    value: 6,
                    message: "Số lượng không hợp lệ!",
                  },
                }}
                render={({ field }) => (
                  <>
                    <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                      Số lượng
                      <span className="text-[#FF0000]">*</span>
                    </p>
                    <input
                      className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%] rounded-[6px] px-[15px] py-[12px]
                                                            max-xl:text-sm max-lg:text-[13px]
                                                            ${
                                                              errors.attributes &&
                                                              errors.attributes[
                                                                index
                                                              ]?.soluong
                                                                ? "border-[1px] border-red-900"
                                                                : "border-[1px] border-[#FFAAAF]"
                                                            }
                                                    `}
                      placeholder="00.00"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    {errors.attributes && errors.attributes[index]?.soluong && (
                      <p className="text-red-700 mt-2">
                        {errors.attributes[index]?.soluong?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            {index == 0 && (
              <div
                onClick={handlePlusClick}
                className="col-span-1 mt-16 cursor-pointer"
              >
                <PlusAttribute />
              </div>
            )}
            {index > 0 && (
              <div
                onClick={() => handleMinusClick(index)}
                className="col-span-1 mt-16 cursor-pointer"
              >
                <MinusAttribute />
              </div>
            )}
          </div>
        );
      })}
    </form>
  );
}
