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
    <div className="grid sm:grid-cols-1 md:grid-cols-3 justify-center">
      <div>
        <input
          className="border p-2 rounded-md mb-2 md:mb-0"
          type="text"
          placeholder="Search By Name"
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </div>
      <div>
        <input
          className="border  p-2 rounded-md mb-2 md:mb-0"
          type="text"
          placeholder="Filter By Currency"
          value={groupCurrency}
          onChange={(e) => onGroupCurrencyChange(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={onGroupByCurrencyClick}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md w-full md:w-fit">
          Group by Currency
        </button>
      </div>
    </div>
  );
}

export default Filter;
