import { useActor } from "@xstate/react";
import { ToggleMachineActor } from "../machines/toggle";

interface Props {
  actor: ToggleMachineActor;
  data: { completed: boolean; id: number; title: string; userId: number }[];
}

export function Notification({ actor, data }: Props) {
  const [state, send] = useActor(actor);

  return (
    <div>
      {state.matches("on") && (
        <div>
          {`Very important notification`}
          {data.map((item) => {
            return (
              <div>
                <span>title: </span>
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={() => {
          send({ type: "TOGGLE" });
        }}
      >
        {state.matches("on") ? "close" : "open"}
      </button>
    </div>
  );
}

export function Notification1({ actor, data }: Props) {
  const [state, send] = useActor(actor);

  return (
    <div>
      {state.matches("on") && <div>Very important notification</div>}
      <button
        onClick={() => {
          send({ type: "TOGGLE" });
        }}
      >
        {state.matches("on") ? "close" : "open"}
      </button>
    </div>
  );
}
