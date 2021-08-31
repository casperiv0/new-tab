export enum Greeting {
  MORNING = "Good morning.",
  AFTERNOON = "Good afternoon.",
  EVENING = "Good evening.",
}

export function getGreeting() {
  const hours = new Date().getHours();

  if (hours >= 12 && hours < 18) {
    return Greeting.AFTERNOON;
  }

  if (hours < 12) {
    return Greeting.MORNING;
  }

  return Greeting.EVENING;
}
