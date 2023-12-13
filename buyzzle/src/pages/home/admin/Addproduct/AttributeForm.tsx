import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
} from "react-hook-form";
import MinusAttribute from "../../../../assets/TSX/MinusAttribute";
import PlusAttribute from "../../../../assets/TSX/PlusAttribute";
import { FormValues } from "./Addproducts";

interface Form {
  handleMinusClick: (index: number) => void;
  handlePlusClick: () => void;
  fields: FieldArrayWithId<FormValues, "attributes", "id">[];
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
}
export default function AttributeForm(props: Form) {
  const { handleMinusClick, handlePlusClick, fields, control, errors } = props;
  console.log("errors.attributes?.message", !!errors.attributes?.message);
  return (
    <div>
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
                    message: "Vui lòng nhap size!",
                  },
                  maxLength: {
                    value: 2,
                    message: "Size chi toi da 2 ky tu",
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
                    message: "Vui lòng nhap chon mau sac!",
                  },
                  maxLength: {
                    value: 6,
                    message: "Mau sac khong hop le!",
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
                      placeholder="Den, Trang,.."
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
                name={`attributes.${index}.productQuantity`}
                rules={{
                  required: {
                    value: true,
                    message: "Vui lòng nhap so luong!",
                  },
                  maxLength: {
                    value: 6,
                    message: "So luong khong hop le!",
                  },
                }}
                control={control}
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
                                                              ]?.productQuantity
                                                                ? "border-[1px] border-red-900"
                                                                : "border-[1px] border-[#FFAAAF]"
                                                            }
                                                    `}
                      placeholder="00.00"
                      value={field.value}
                      onChange={(e) => {
                        const reg = /[^0-9]/g;
                        const value = e.target.value;
                        field.onChange(value.replace(reg, ""));
                      }}
                    />
                    {errors.attributes &&
                      errors.attributes[index]?.productQuantity && (
                        <p className="text-red-700 mt-2">
                          {errors.attributes[index]?.productQuantity?.message}
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
    </div>
  );
}
