import { ActorRefFrom, createMachine, spawn } from "xstate";

export type ToggleMachineActor = ActorRefFrom<typeof toggleMachine>;

function toggleMachine({ initial }: { initial: string }) {
  return createMachine({
    id: "toggleMachine",
    predictableActionArguments: true,
    schema: {
      events: {} as { type: "TOGGLE" },
    },
    tsTypes: {} as import("./toggle.typegen").Typegen0,
    initial,
    states: {
      off: {
        on: {
          TOGGLE: {
            target: "on",
          },
        },
      },
      on: {
        on: {
          TOGGLE: {
            target: "off",
          },
        },
      },
    },
  });
}

export function toggleMachineCreate({ initial = "off" }): {
  machine: ReturnType<typeof toggleMachine>;
  spawn: () => ToggleMachineActor;
} {
  const machine = toggleMachine({ initial });

  return {
    machine,
    spawn: () => spawn(machine, { name: "toggleMachine" }),
  };
}
