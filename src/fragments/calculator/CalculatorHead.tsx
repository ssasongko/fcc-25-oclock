import { FcAlarmClock } from "react-icons/fc";

const CalculatorHead = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <FcAlarmClock className="text-4xl" />
      <h1 className="text-2xl font-bold text-center">
        Pomodoro
      </h1>
    </div>
  )
}

export default CalculatorHead