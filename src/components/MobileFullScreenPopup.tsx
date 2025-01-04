import { useStore } from "@nanostores/react";
import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";
import { $isMobileScreen } from "@/stores/window";
import Icon from "./Icon";
import Popup from "./Popup";

type MobileFullScreenPopupProps = PropsWithChildren & {
  visible?: boolean;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  width?: number;
  onClickClose?: any;
  mobileTitle?: string;
};

const MobileFullScreenPopup = ({
  visible,
  showCloseButton = true,
  showBackButton,
  width = 800,
  onClickClose,
  children,
  mobileTitle = "",
}: MobileFullScreenPopupProps) => {
  const isMobileScreen = useStore($isMobileScreen);
  return (
    <>
      {isMobileScreen ? (
        // {/* Mobile */}
        <div
          className={`${
            visible ? "translate-x-0" : "translate-x-full"
          } fixed bottom-0 top-0 z-20 flex w-full flex-col bg-bgDark transition md:hidden`}
        >
          <div className="relative h-full w-full bg-bgDark">
            <div className="flex h-[50px] items-center justify-between bg-bgLight px-3 py-[10px]">
              {showBackButton ? (
                <div onClick={onClickClose}>
                  <Icon
                    icon="chevron-left"
                    width={14}
                    height={14}
                    color="#ffffff"
                  />
                </div>
              ) : (
                <div className="h-[14px] w-[14px]" />
              )}
              <div className="text-b1 text-white">{mobileTitle}</div>
              <div onClick={onClickClose}>
                <Icon icon="close" width={14} height={14} color="#ffffff" />
              </div>
            </div>
            <div className="scrollbar-hidden h-[calc(100%-50px)] overflow-y-scroll">
              {children}
            </div>
          </div>
        </div>
      ) : (
        // {/* Desktop */}
        <Popup
          width={width}
          visible={visible}
          onClickClose={onClickClose}
          showCloseButton={showCloseButton}
        >
          {children}
        </Popup>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(MobileFullScreenPopup), {
  ssr: false,
});
