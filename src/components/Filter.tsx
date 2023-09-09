import React from "react";

function Filter({
  filterText,
  groupCurrency,
  onFilterTextChange,
  onGroupCurrencyChange,
}: any) {
  return (
    <div className="">
      <input
        className="border mr-2 p-2 rounded-md"
        type="text"
        placeholder="Search By Name"
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <input
        className="border mr-2 p-2 rounded-md"
        type="text"
        placeholder="Filter By Currency"
        value={groupCurrency}
        onChange={(e) => onGroupCurrencyChange(e.target.value)}
      />
    </div>
  );
}

export default Filter;
