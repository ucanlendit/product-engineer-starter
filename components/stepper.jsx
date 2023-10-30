import React, { useEffect } from "react";
import { useStepper } from "headless-stepper";
import MedicalRecord from "./medical-record";

import Guidelines from "./guidelines";
import Result from "./result";

const BasicTailwind = () => {
  const steps = React.useMemo(
    () => [
      {
        label: "Medical Record",
      },
      { label: "Extra Info" },
      { label: "Result" },
    ],
    []
  );

  const { state, stepperProps, stepsProps, progressProps, nextStep } =
    useStepper({
      steps,
    });

  useEffect(() => {
    console.log("state.currentStep", state.currentStep);
    return () => {
      console.log("state.currentStep return", state.currentStep);

      if (state.currentStep === 2) {
        localStorage.setItem("caseID", null);
      }
    };
  }, [state.currentStep]);

  const barSize = React.useMemo(
    () => Math.ceil((state.currentStep / (steps?.length - 1)) * 100),
    [state, steps]
  );

  return (
    <>
      <nav
        className="my-4 w-full grid grid-cols-3 relative -ml-[40px]"
        {...stepperProps}>
        <ol className="col-span-full flex flex-row z-1">
          {stepsProps?.map((step, index) => (
            <li className="text-center flex-[1_0_auto]" key={index}>
              <a
                className="group flex flex-col items-center cursor-pointer focus:outline-0"
                {...step}>
                <span
                  className={`flex items-center justify-center bg-white text-black w-8 h-8 border border-full rounded-full group-focus:ring-2 group-focus:ring-offset-2 transition-colors ease-in-out ${
                    state?.currentStep === index || state?.currentStep >= index
                      ? "bg-gray-200 text-white ring-2 ring-slate-300	 ring-offset-2"
                      : ""
                  }`}>
                  {/* {index + 1} */}
                </span>
                <span
                  className={`${
                    state?.currentStep === index
                      ? "font-bold text-xs mt-2"
                      : "text-xs mt-2"
                  }`}>
                  {steps[index].label}
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div
          style={{ gridColumn: "2 / 8", left: "-25%" }}
          className="flex items-center flex-row top-4 right-16 relative border-0.5 bg-gray-300 z-[-1] pointer-events-none row-span-full w-full h-0.5"
          {...progressProps}>
          <span className="h-full w=full flex" />
          <div
            style={{
              width: `${barSize}%`,
              gridColumn: 1 / -1,
              gridRow: 1 / -1,
            }}
            className="flex flex-row h-full overflow-hidden border-solid border-0 bg-gray-500"
          />
        </div>
      </nav>
      {state.currentStep === 0 && (
        <>
          <MedicalRecord onDone={() => nextStep()} />
        </>
      )}
      {state.currentStep === 1 && (
        <>
          <Guidelines onDone={() => nextStep()} />
        </>
      )}

      {state.currentStep === 2 && <Result />}
    </>
  );
};

export default BasicTailwind;
