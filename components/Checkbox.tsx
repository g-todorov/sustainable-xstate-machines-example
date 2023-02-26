import { useMachine } from "@xstate/react";
import { toggleMachineCreate } from "../machines/toggle";

interface Props {
  onChange(checked: boolean): void;
  initial?: "on" | "off";
}

export function Checkbox({ onChange, initial = "on" }: Props) {
  const [state, send] = useMachine(
    () => toggleMachineCreate({ initial }).machine
  );

  return (
    <>
      <label htmlFor="toggle">Toggle</label>
      <input
        id="toggle"
        type="checkbox"
        checked={state.matches("on")}
        onChange={(event) => {
          send({ type: "TOGGLE" });
          onChange(event.target.checked);
        }}
      />
    </>
  );
}
