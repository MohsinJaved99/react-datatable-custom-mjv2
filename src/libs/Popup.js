import React, {memo} from "react";
import {Icon} from "@iconify/react";

const Popup = ({showPopup, popupContent, popupTitle, setShowPopup}) => {

    return (<>
            <div id="modal" className={`mj_tablePopup ${showPopup?'fixed':'hidden'} inset-0 bg-gray-900 bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50`}>
                 <span title={"Close"} onClick={() => {
                     setShowPopup(false);
                 }} className={'absolute right-4 top-4 cursor-pointer hover:text-[#d61106]'}><Icon fontSize={"30px"} icon={'mdi:close-thick'} /></span>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto w-full dialog-visible">
                    <h2 className="text-lg uppercase font-bold mb-4">{popupTitle}</h2>
                    <p className="mb-4 max-h-[500px] overflow-auto">{popupContent}</p>
                </div>
            </div>
        </>
    )
}

export default memo(Popup);