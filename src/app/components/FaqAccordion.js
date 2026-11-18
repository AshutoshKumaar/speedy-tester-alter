"use client";

import React, { useId, useState } from "react";

export default function FaqAccordion({ items = [], keepAnswersInDom = false }) {
  const [openIndex, setOpenIndex] = useState(0);
  const accordionId = useId().replace(/:/g, "");

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${accordionId}-trigger-${index}`;
        const answerId = `${accordionId}-answer-${index}`;
        return (
          <div
            key={index}
            className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
          >
            <button
              id={triggerId}
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50/80 transition-colors"
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <strong className="text-base sm:text-lg font-bold text-slate-800 font-mooli">
                {item.question}
              </strong>
              <span className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 bg-theme-main text-white" : "text-slate-500"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {(keepAnswersInDom || isOpen) && (
              <div
                id={answerId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed font-mooli border-t border-slate-100/60 bg-slate-50/30"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
