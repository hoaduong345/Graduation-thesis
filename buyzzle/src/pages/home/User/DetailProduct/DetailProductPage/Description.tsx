import { useState } from "react";
import { Products } from "../../FilterPage/FiltersPage";

export default function Description() {
  const [first] = useState<Products | undefined>(undefined);

  return (
    <div
      className="px-[113px] py-[78px] text-sm break-all"
      dangerouslySetInnerHTML={{ __html: first?.description as any }}
    ></div>
  );
}
