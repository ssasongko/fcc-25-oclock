import CalculatorHead from "../../fragments/calculator/CalculatorHead";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Calculator = () => {
  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center bg-slate-400">
      <div className="flex flex-col gap-5 bg-white rounded-lg shadow-md p-5 text-black">
        <CalculatorHead /> 
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col gap-2 justify-center">
            <p id="break-label">Break Length</p>
            <div className="flex items-center gap-3 justify-center">
              <span id="break-increment"><AiOutlineArrowUp /></span>
              <p id="break-length">5</p>
              <span id="break-decrement"><AiOutlineArrowDown /></span>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <p id="session-label">Session Length</p>
            <div className="flex items-center gap-3 justify-center">
              <span id="session-increment"><AiOutlineArrowUp /></span>
              <p id="session-length">25</p>
              <span id="session-decrement"><AiOutlineArrowDown /></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p id="timer-label">Session</p>
          <p id="time-left">25:00</p>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <button id="start_stop">
            <FaPlay />
            { false && (
              <FaPause />
            )}
          </button>
          <button id="reset">
            <GrPowerReset />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator