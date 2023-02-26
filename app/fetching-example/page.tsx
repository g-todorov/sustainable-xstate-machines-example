"use client";

import { assign, createMachine, spawn } from "xstate";
import { useMachine } from "@xstate/react";

import { Notification } from "../../components/Notification";
import { ToggleMachineActor, toggleMachineCreate } from "../../machines/toggle";

const fetchingMachine = createMachine(
  {
    id: "fetchMachine",
    predictableActionArguments: true,
    context: { toggleRef: null, data: null },
    schema: {
      services: {} as { fetchData: { data: any } },
      context: {} as { toggleRef: ToggleMachineActor | null; data: any | null },
      events: {} as { type: "FETCHING" },
    },
    tsTypes: {} as import("./page.typegen").Typegen0,
    initial: "fetching",
    on: {
      FETCHING: {
        target: "fetching",
      },
    },
    states: {
      idle: {},
      fetching: {
        invoke: {
          src: "fetchData",
          onDone: {
            actions: ["assignToggleRef", "assignData"],
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      assignToggleRef: assign({
        toggleRef: (context, event) => {
          return toggleMachineCreate({ initial: "on" }).spawn();
        },
      }),
      assignData: assign({
        data: (context, event) => {
          return event.data;
        },
      }),
    },
    services: {
      async fetchData() {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data = await response.json();
        console.log(data);
        return data;
      },
    },
  }
);

const fetchingMachineSimple = createMachine(
  {
    id: "fetchMachine",
    predictableActionArguments: true,
    context: { toggleRef: null },
    schema: {
      services: {} as { fetchData: { data: any } },
      context: {} as { toggleRef: ToggleMachineActor | null },
      events: {} as { type: "FETCHING" },
    },
    tsTypes: {} as import("./page.typegen").Typegen1,
    initial: "fetching",
    on: {
      FETCHING: {
        target: "fetching",
      },
    },
    states: {
      idle: {},
      fetching: {
        invoke: {
          src: "fetchData",
          onDone: {
            actions: ["assignToggleRef"],
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      assignToggleRef: assign({
        toggleRef: (context, event) => {
          return toggleMachineCreate({ initial: "on" }).spawn();
        },
      }),
    },
    services: {
      async fetchData() {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        );
        const data = await response.json();

        return data;
      },
    },
  }
);

export default function FetchingExample() {
  const [
    {
      context: { toggleRef, data },
    },
    send,
  ] = useMachine(fetchingMachine);

  return (
    <div>
      {toggleRef && (
        <div>
          <Notification data={[data[0], data[1], data[2]]} actor={toggleRef} />
        </div>
      )}
    </div>
  );
}
