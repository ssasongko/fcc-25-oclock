/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import CalculatorHead from "@/fragments/calculator/CalculatorHead";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import About from "@/components/About";


const Calculator = () => {
  const [sessionDuration, setSessionDuration] = useState<number>(25);
  const [breakDuration, setBreakDuration] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(sessionDuration * 60);
  const [play, setPlay] = useState<boolean>(false);

  enum SessionTypes {
    Session = "Session",
    Break = "Break"
  }
  const [session, setSession] = useState<SessionTypes>(SessionTypes.Session);

  const minute: number = Math.floor(timeLeft / 60);
  const second: number = timeLeft % 60;

  const onHandlerBreakDuration = (breakDuration: number): void =>  {
    if(breakDuration < 1) {
      setBreakDuration(1);
      return;
    }
    else if(breakDuration > 60) {
      setBreakDuration(60);
      return;
    }
    else {
      setBreakDuration(breakDuration);
    }
  }

  const onHandlerSessionDuration = (sessionDuration: number): void =>  {
    if(sessionDuration < 1) {
      setSessionDuration(1);
    }
    else if(sessionDuration > 60) {
      setSessionDuration(60);
      return;
    }
    else{
      setSessionDuration(sessionDuration);
      setTimeLeft(sessionDuration * 60);
    }
    
  }


  const onResetHandler = (): void => {
    audioPlayer.current?.pause();
    audioPlayer.current!.currentTime = 0;

    setPlay(false);
    setBreakDuration(5);
    setSessionDuration(25);
    setTimeLeft(25 * 60);
    setSession(SessionTypes.Session);
  }

  const audioPlayer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(play) {
      if (timeLeft !== 0) {
        const timer = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        
        return () => {
          clearInterval(timer)
        }
      }
      else if(timeLeft === 0 && session === SessionTypes.Session) {
        audioPlayer.current?.play();
        setTimeout(() => {
          setTimeLeft(breakDuration * 60);
          setSession(SessionTypes.Break);
        }, 1000);
      }
      else if(timeLeft === 0 && session === SessionTypes.Break) {
        audioPlayer.current?.play();
        setTimeout(() => {
          setSession(SessionTypes.Session);
          setSessionDuration(25);
          setTimeLeft(25 * 60);
          setPlay(false);
        }, 1000);
      }
    }
    
  }, [breakDuration, play, timeLeft, session, sessionDuration, SessionTypes.Session, SessionTypes.Break])
  

  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center bg-slate-400">
      <div className="flex flex-col gap-5 bg-white rounded-lg shadow-md p-5 text-black">
        <CalculatorHead /> 
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col gap-2 justify-center">
            <p id="break-label">Break Length</p>
            <div className="flex items-center gap-3 justify-center">
              <button id="break-increment" onClick={() => onHandlerBreakDuration(breakDuration + 1)}><AiOutlineArrowUp /></button>
              <p id="break-length">{ breakDuration }</p>
              <button id="break-decrement" onClick={() => onHandlerBreakDuration(breakDuration - 1)}><AiOutlineArrowDown /></button>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <p id="session-label">Session Length</p>
            <div className="flex items-center gap-3 justify-center">
              <button id="session-increment" onClick={() => onHandlerSessionDuration(sessionDuration + 1)}><AiOutlineArrowUp /></button>
              <p id="session-length">{ sessionDuration }</p>
              <button id="session-decrement" onClick={() => onHandlerSessionDuration(sessionDuration - 1)} ><AiOutlineArrowDown /></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p id="timer-label">{ session }</p>
          <p id="time-left">{minute?.toString().length === 1
            ? `0${minute}`
            : minute || timeLeft}
            :{second?.toString().length === 1 ? `0${second}` : second || 0}</p>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <button id="start_stop" onClick={() => setPlay(!play)}>
            {!play ? <FaPlay /> : <FaPause />}
          </button>
          <button id="reset" onClick={onResetHandler}>
            <GrPowerReset />
          </button>
        </div>
      </div>
      
      <About />


      <audio id="beep" ref={audioPlayer} controls className="hidden">
        <source src="../assets/sound/beep.mp3" type="audio/mp3"/>
      </audio>
    </div>
  )
}

export default Calculator