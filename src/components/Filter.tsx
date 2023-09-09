import React from "react";

function Filter({
  filterText,
  groupCurrency,
  onFilterTextChange,
  onGroupCurrencyChange,
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
    </div>
  );
}

export default Filter;
