'use client';
import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface CalendarPopupProps {
  value: Date;
  filterType: "month" | "year";
  onChange: (date: Date, filterType?: "month" | "year") => void;
}

const CalendarPopup = ({ value, filterType, onChange }: CalendarPopupProps) => {
  const [show, setShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());

  const handleToggle = () => setShow(prev => !prev);

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    onChange(new Date(selectedYear, monthIndex, 1), "month");
    setShow(false);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedYear(newYear);
    if (filterType === "year") {
      onChange(new Date(newYear, 0, 1), "year");
    } else {
      onChange(new Date(newYear, selectedMonth, 1), "month");
    }
  };

  const handleAllYear = () => {
    onChange(new Date(selectedYear, 0, 1), "year");
    setShow(false);
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) years.push(currentYear + i);

  return (
    <div className="relative inline-block cursor-pointer">
      <button
        className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors text-[#621616] focus:outline-none focus:ring-2 focus:ring-[#621616] focus:ring-opacity-50"
        onClick={handleToggle}
        aria-label="Open month/year picker"
        type="button"
      >
        <FaRegCalendarAlt size={22} />
      </button>
      {show && (
        <div className="absolute z-50 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-60 top-full right-70 transform translate-x-full">
          <div className="flex items-center justify-between mb-3 cursor-pointer">
            <label className="text-sm font-medium text-gray-700 cursor-pointer">Select Period</label>
            <button
              onClick={() => setShow(false)}
              className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
              aria-label="Close"
            >
              x
            </button>
          </div>

          <div className="mb-3 cursor-pointer">
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full border cursor-pointer border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#621616] focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2 cursor-pointer">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`py-2 px-1 cursor-pointer text-xs rounded font-medium transition-colors text-center
                  ${filterType === "month" && value.getMonth() === index && value.getFullYear() === selectedYear
                    ? 'bg-[#621616] text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-200'
                  }`}
                aria-label={`Select ${month}`}
              >
                {month.substring(0, 3)} 
              </button>
            ))}
          </div>

          <button
            className={`w-full mt-4 py-2 rounded font-medium text-xs transition-colors 
              ${filterType === "year" ? 'bg-[#621616] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-200'}
            `}
            onClick={handleAllYear}
          >
            All Year
          </button>
          <div className="mt-3 text-xs cursor-pointer text-gray-500 text-center">
            Selected: {filterType === "year" ? "All Year" : months[value.getMonth()]} {selectedYear}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPopup;