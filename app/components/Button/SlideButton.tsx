"use client";

import { AiOutlineLoading, AiOutlineStop } from "react-icons/ai";
import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  MouseEventHandler,
  MouseEvent,
} from "react";
import gsap, { Elastic, Power4 } from "gsap";
import { debounce, omit } from "lodash";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  selected?: boolean;
  width?: number;
  start_icon?: any;
  end_icon?: any;
}

export const SlideButton = (props: ButtonProps) => {
  const {
    onClick,
    text,
    loading,
    disabled,
    color,
    selected,
    width,
    start_icon,
    end_icon,
  } = props;

  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  let { textColor, selectedTextColor, borderColor, selectedColor } =
    useMemo(() => {
      switch (color) {
        case "blue":
          return {
            textColor: "text-blue-500",
            selectedTextColor: "text-white",
            borderColor:
              "border-blue-300 hover:border-blue-500 hover:bg-blue-50",
            selectedColor:
              "border-blue-500 hover:border-blue-700 bg-blue-500 hover:bg-blue-700",
          };
        case "white":
          return {
            textColor: "text-white",
            borderColor: "border-slate-50 hover:border-white ",
          };
        case "yellow":
          return {
            textColor: "text-yellow-600",
            selectedTextColor: "text-white",

            borderColor:
              "border-yellow-400 hover:border-yellow-600 hover:bg-yellow-50",
            selectedColor:
              "border-yellow-600 hover:border-yellow-600 bg-yellow-600 hover:bg-yellow-700",
          };
        case "green":
          return {
            textColor: "text-green-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-green-500 hover:border-green-700 hover:bg-green-50",
            selectedColor:
              "border-green-500 hover:border-green-700 bg-green-500 hover:bg-green-700",
          };
        case "pink":
          return {
            textColor: "text-pink-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-pink-300 hover:border-pink-500 hover:bg-pink-50",
            selectedColor:
              "border-pink-500 hover:border-pink-500 bg-pink-500 hover:bg-pink-700",
          };
        case "red":
          return {
            textColor: "text-red-500",
            selectedTextColor: "text-white",

            borderColor: "border-red-300 hover:border-red-500 hover:bg-red-50",
            selectedColor:
              "border-red-500 hover:border-red-500 bg-red-500 hover:bg-red-700",
          };
        case "orange":
          return {
            textColor: "text-orange-500",
            selectedTextColor: "text-white",

            borderColor:
              "border-orange-300 hover:border-orange-500 hover:bg-orange-50",
            selectedColor:
              "border-orange-500 hover:border-orange-500 bg-orange-500 hover:bg-orange-700",
          };
        default:
          return {
            textColor: "text-blue-500",
            selectedTextColor: "text-white",
            borderColor:
              "border-blue-300 hover:border-blue-500 hover:bg-blue-50",
            selectedColor:
              "border-blue-500 hover:border-blue-500 bg-blue-500 hover:bg-blue-700",
          };
      }
    }, [color]);

  const hoverTimeline = useRef(null);

  // const hoverTimeline = useMemo(() => {
  //   return gsap.timeline({ paused: true });
  // }, []);

  const click = useMemo(
    () =>
      debounce((e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (onClick) onClick(e);
      }, 300),
    [onClick]
  );

  useEffect(() => {
    hoverTimeline.current = gsap
      .timeline({ paused: true })
      .fromTo(
        upperRef.current,
        { y: 0 },
        { y: 30, duration: 0.5, ease: Power4.easeInOut }
      )
      .fromTo(
        lowerRef.current,
        { y: 0 },
        { y: 32, duration: 0.5, ease: Power4.easeInOut },
        "-=0.5"
      ) as any;
    return () => {
      (hoverTimeline.current as any).kill();
    };
  }, []);

  return (
    <div
      className={`flex h-8 ${loading ? "animate-pulse" : ""} ${
        props.className
      }`}
    >
      <button
        {...omit(props, ["className", "loading"])}
        onClick={(e) => {
          if (!loading && !disabled && onClick) click(e);
        }}
        onMouseEnter={() => {
          if (hoverTimeline.current && !loading && !disabled) {
            (hoverTimeline.current as any).play();
          }
        }}
        onMouseLeave={() => {
          if (hoverTimeline.current && !loading && !disabled)
            (hoverTimeline.current as any).reverse();
        }}
        className={`relative flex flex-col flex-start items-center h-8 cursor-pointer rounded-md leading-7 border ${
          loading || disabled
            ? "bg-slate-200"
            : selected
            ? selectedColor
            : borderColor
        }  overflow-hidden `}
      >
        {loading && (
          <div className={` h-8 flex justify-center items-center mx-auto`}>
            <AiOutlineLoading className="animate-spin text-slate-500" />
          </div>
        )}
        <div
          ref={upperRef}
          className={`select-none  ${
            loading ? "opacity-0" : ""
          } top-[-100%] flex items-center justify-center gap-2 leading-8 h-8 absolute cursor-pointer overflow-hidden text-center whitespace-nowrap ${
            loading || disabled
              ? "text-slate-400"
              : selected
              ? selectedTextColor
              : textColor
          }  ${start_icon ? "pl-2" : "pl-4"} ${end_icon ? "pr-2" : "pr-4"}`}
        >
          {start_icon}
          {text}
          {end_icon}
        </div>
        <div
          ref={lowerRef}
          className={`select-none ${
            loading ? "opacity-0" : ""
          } absolute flex items-center justify-center gap-2 leading-8 h-8 cursor-pointer overflow-hidden text-center whitespace-nowrap ${
            loading || disabled
              ? "text-slate-400"
              : selected
              ? selectedTextColor
              : textColor
          }  ${start_icon ? "pl-2" : "pl-4"} ${end_icon ? "pr-2" : "pr-4"} `}
        >
          {start_icon}
          {text}
          {end_icon}
        </div>

        <p
          className={`select-none relative flex items-center justify-center gap-2 h-0 cursor-pointer overflow-hidden text-center whitespace-nowrap text-slate-500 ${
            start_icon ? "pl-2" : "pl-4"
          } ${end_icon ? "pr-2" : "pr-4"}`}
        >
          {start_icon}
          {text}
          {end_icon}
        </p>
      </button>
    </div>
  );
};
