import { start } from "./server";

const greeting = (name: string): string => {
  return `hello ${name}! How are you?`;
};

start();

console.log(greeting("Joe"));
