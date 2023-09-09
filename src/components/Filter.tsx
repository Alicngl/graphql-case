import React from "react";

function Filter({
  filterText,
  groupCurrency,
  onFilterTextChange,
  onGroupCurrencyChange,
}: any) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by currency..."
        value={groupCurrency}
        onChange={(e) => onGroupCurrencyChange(e.target.value)}
      />
    </div>
  );
}

export default Filter;
