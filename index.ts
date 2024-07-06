import { intro, outro, spinner, text } from "@clack/prompts";

const s = spinner();

const timerDurationQuestion = async () =>
  await text({
    message: "Timer Duration?",
    placeholder: "25",
    initialValue: "25",
    validate(value) {
      if (isNaN(Number(value)) || Number(value) <= 0)
        return "⚠️ Please enter a valid number";
    },
  });

const breakDurationQuestion = async () =>
  await text({
    message: "Break Duration?",
    placeholder: "2",
    initialValue: "2",
    validate(value) {
      if (isNaN(Number(value)) || Number(value) <= 0)
        return "⚠️ Please enter a valid number";
    },
  });

const numOfCyclesQuestion = async () =>
  await text({
    message: "Number of cycle?",
    placeholder: "4",
    initialValue: "4",
    validate(value) {
      if (isNaN(Number(value)) || Number(value) <= 0)
        return "⚠️ Please enter a valid number";
    },
  });

async function startTimer(duration: number, type: "Work" | "Break" = "Work") {
  const endTime = new Date(Date.now() + Number(duration * 60) * 1000);

  s.start(`${type}: Timer Started for ${duration} minutes`);
  while (endTime > new Date()) {
    const timeLeft = Math.floor(endTime.getTime() - Date.now());
    const minutes = Math.floor(timeLeft / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
    s.message(`${type} timer: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  s.stop(`${type}: Timer ended`);
}

async function main() {
  intro(`Pomo CLI Timer 🍅. This is going to be pomo wait for it daryy!`);

  const duration = await timerDurationQuestion();

  const breakTime = await breakDurationQuestion();

  const numOfCycles = await numOfCyclesQuestion();

  for (let i = 0; i < Number(numOfCycles); i++) {
    console.log("Timer started");
    await startTimer(Number(duration), "Work");
    console.log("Timer ended");

    console.log("Break started");
    await startTimer(Number(breakTime), "Break");
    console.log("Break ended");
  }

  outro(`Cycle completed 🎉`);
}

void main();
