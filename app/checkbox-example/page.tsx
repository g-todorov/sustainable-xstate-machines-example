"use client";

import { Checkbox } from "../../components/Checkbox";

export default function CheckboxExample() {
  return (
    <div>
      <Checkbox
        onChange={(checked) => {
          console.log(`checkbox -> ${checked}`);
        }}
      />
    </div>
  );
}
