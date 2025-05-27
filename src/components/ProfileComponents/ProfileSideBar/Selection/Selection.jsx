import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import "./Selection.scss";

const Selection = () => {
  const [showSelectionDetails, setShowSelectionDetails] = useState(false);

  return (
    <div className="selection-container">
      <div className="tab-content selection">
        <FaLocationDot className="selectionLocation-icon" />
        <p>
          فرایند گزینش از تاریخ
          <span className="bold">1404/03/25</span> و رأس ساعت{" "}
          <span className="bold">8:00</span> در نشانی تهران، نجات اللهی، خیابان
          مفتح، خیابان کریم خان زند برگزار می‌گردد.
        </p>
        <button
          className="selection-details-button"
          onClick={() => setShowSelectionDetails(!showSelectionDetails)}
        >
          توضیحات
        </button>
        <AnimatePresence>
          {showSelectionDetails && (
            <motion.p
              className="selection-details"
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              لطفاً در زمان و مکان مشخص‌شده حاضر شوید . عدم حضور ممکن است منجر به رد نهایی شود.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Selection;
