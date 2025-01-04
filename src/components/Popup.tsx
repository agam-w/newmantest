import { Transition, TransitionChild, Button } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, PropsWithChildren } from "react";

type PopupProps = PropsWithChildren & {
  visible?: boolean;
  showCloseButton?: boolean;
  onClickClose?: () => void;
  width?: number;
};

const Popup = ({
  children,
  visible,
  showCloseButton = true,
  onClickClose,
  width = 800,
}: PopupProps) => {
  return (
    <Transition show={true} appear={visible}>
      <div
        className={classNames(
          "fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/60",
          "transition ease-in-out",
          "data-[closed]:opacity-0",
          "data-[leave]:delay-100"
        )}
        onClick={onClickClose}
      >
        <TransitionChild>
          <div
            className={classNames(
              "relative mx-9 rounded-lg",
              "transition ease-in-out",
              "data-[closed]:translate-y-10 data-[closed]:scale-90 data-[closed]:opacity-0",
              "data-[enter]:data-[closed]:scale-90 data-[enter]:delay-100"
            )}
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton ? (
              <div className="absolute right-6 top-6 z-[2]">
                <Button onClick={onClickClose}>X</Button>
              </div>
            ) : null}
            {children}
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default Popup;
