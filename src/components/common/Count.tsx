"use client"
import { useState } from "react";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";

interface CountType {
  number: number;
  formatStyle?: "default" | "indian";
  ariaHidden?: boolean;
//   text?: string;
}

const Count = ({ number, formatStyle = "default", ariaHidden = false }: CountType) => {
  const [focus, setFocus] = useState<boolean>(false);
  const visibleChangeHandler = (isVisible: boolean) => {
    if (isVisible) {
      if (!focus) {
        setFocus(true);
      }
    }
  };

  const formatNumber = (value: number) => {
    if (formatStyle === "indian") {
      return Math.floor(value).toLocaleString("en-IN");
    }

    return Math.floor(value).toString();
  };

  return (
    <>
      <CountUp start={focus ? 0 : undefined} end={number} duration={2} formattingFn={formatNumber}>
        {({ countUpRef }) => (
          <span className={`d-inline-flex`} aria-hidden={ariaHidden}>
            <span ref={countUpRef} />
            <InView
              as="span"
              aria-hidden="true"
              onChange={(inView: any) => visibleChangeHandler(inView)}>
              {/* {text && <span>{text}</span>}  */}
            </InView>
          </span>
        )}
      </CountUp>
    </>
  );
};

export default Count;
