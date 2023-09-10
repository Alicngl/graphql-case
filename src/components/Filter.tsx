// Filter.js
import React from "react";

function Filter({
  filterText,
  groupCurrency,
  onFilterTextChange,
  onGroupCurrencyChange,
  onGroupByCurrencyClick, // Yeni eklenen buton işlevi
}: any) {
  return (
    <div className="flex justify-center">
      <input
        className="border mr-4 p-2 rounded-md"
        type="text"
        placeholder="Search By Name"
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <input
        className="border ml-4 p-2 rounded-md"
        type="text"
        placeholder="Filter By Currency"
        value={groupCurrency}
        onChange={(e) => onGroupCurrencyChange(e.target.value)}
      />
      <button
        onClick={onGroupByCurrencyClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4"
      >
        Group by Currency
      </button>
    </div>
  );
}

export default Filter;
