import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import TableHeader from "./libs/TableHeader";
import TableRow from "./libs/TableRow";
import "./assets/index.css";
import Popup from "./libs/Popup";
import { saveAs } from "file-saver";
import { debounce } from "lodash";

const DataTable = ({
  title,
  checkbox = false,
  checkboxValueSelector = "id",
  selectedCheckboxes,
  columns,
  data = [],
  totalData = 0,
  noDataComponent,
  progressPending = false,
  progressComponent,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  highlightRowOnHover = false,
  exportable = false,
  columnsVisibility = false,
  expandable = false,
  expandableCondition,
  expandableComponent,
  overflowXScrollOnTop = false,
  search,
  pageSize = 10,
  pageNumber = 1,
  totalPages = 0,
  orderBy = "updated_at",
  sortBy = "DESC",
  setSearch,
  searchPlaceholder = "Search...",
  setPageSize,
  setPageNumber,
  setOrderBy,
  setSortBy,
}) => {
  const componentRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");

  const [checkboxes, setCheckboxes] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const [inputValue, setInputValue] = useState(search);

  // Column visibility state
  const table_title = title.toString().toLowerCase().replaceAll(" ", "_");
  const key = `${table_title}_column_visibility`;
  const localData = localStorage.getItem(key)
    ? localStorage
        .getItem(key)
        .split(",")
        .map((el) => el === "true")
    : null;
  const [isHideColumnsVisible, setIsHideColumnsVisible] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columnsVisibility
      ? localData
        ? localData
        : columns.map(() => true)
      : columns.map(() => true)
  );

  // Debounced version of the setSearch function
  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 500), // Adjust the debounce delay as needed
    [setSearch]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (columnsVisibility) {
      if (localData) {
        if (localData.length !== visibleColumns.length) {
          const visibleColumnsData = columns.map(() => true);
          localStorage.setItem(key, visibleColumnsData);
          setVisibleColumns(visibleColumnsData);
        }
      } else {
        localStorage.setItem(key, visibleColumns);
      }
    } else {
      if (localData) {
        localStorage.removeItem(key);
      }
    }
  }, []);

  useEffect(() => {
    // Update the input value when the search prop changes
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    // Call debounced function when inputValue changes
    debouncedSetSearch(inputValue);
    return () => {
      debouncedSetSearch.cancel(); // Cleanup on unmount
    };
  }, [inputValue, debouncedSetSearch]);

  useEffect(() => {
    if (checkbox) {
      const cb = data.map((item, index) => ({
        index: index,
        value: checkboxValueSelector
          .split(".")
          .reduce((acc, key) => acc[key], item),
        checked: false,
      }));
      setCheckboxes(cb);
    }
    setCheckedAll(false);
  }, [data]);

  useEffect(() => {
    if (checkbox) {
      selectedCheckboxes(checkboxes.filter((checkbox) => checkbox.checked));
    }
  }, [checkboxes]);

  const handleSortChange = (order_by) => {
    setOrderBy(order_by);
    setSortBy(sortBy === "ASC" ? "DESC" : "ASC");
  };

  const handleCheckBox = (index, checked) => {
    setCheckboxes((prevState) =>
      prevState.map((item, i) => (i === index ? { ...item, checked } : item))
    );
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckboxes((prevState) =>
      prevState.map((item) => ({ ...item, checked }))
    );
    setCheckedAll(checked);
  };

  const handleShowPopup = (data) => {
    setShowPopup(data.show);
    setPopupTitle(data.title);
    setPopupContent(data.content);
  };

  const PaginationOption = () => {
    return (
      <div className={"w-[fit-content]"}>
        <p>
          Rows per page:
          <select
            className={"ml-1"}
            defaultValue={defaultPageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map((pagination, index) => (
              <option key={index} value={pagination}>
                {pagination}
              </option>
            ))}
          </select>
        </p>
      </div>
    );
  };

  const PaginationInformation = () => {
    const offset = (pageNumber - 1) * pageSize + 1;
    const limit = Math.min(pageNumber * pageSize, totalData);

    return (
      <div className={"w-[fit-content]"}>
        <p>
          <span className={"font-semibold"}>{offset}</span> -{" "}
          <span className={"font-semibold"}>{limit}</span> of{" "}
          <span className={"font-semibold"}>{totalData}</span>
        </p>
      </div>
    );
  };

  const PaginationButtons = () => {
    const className =
      "flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 enabled:hover:bg-gray-200 disabled:opacity-[0.5]";
    const nextPage = pageNumber + 1;
    const previousPage = pageNumber - 1;
    const firstPage = 1;
    const lastPage = totalPages;

    return (
      <div className={"w-[fit-content] flex mt-[-4px] gap-3"}>
        <button
          disabled={totalPages <= 1 || pageNumber === 1}
          title={"Go to first page"}
          className={className}
          onClick={() => setPageNumber(firstPage)}
        >
          <Icon icon={"material-symbols:first-page-rounded"} />
        </button>
        <button
          disabled={previousPage < 1}
          title={"Go to previous page"}
          className={className}
          onClick={() => setPageNumber(previousPage)}
        >
          <Icon icon={"material-symbols:keyboard-arrow-left"} />
        </button>
        <button
          disabled={!(nextPage <= totalPages)}
          title={"Go to next page"}
          className={className}
          onClick={() => setPageNumber(nextPage)}
        >
          <Icon icon={"material-symbols:keyboard-arrow-right"} />
        </button>
        <button
          disabled={totalPages <= 1 || pageNumber === totalPages}
          title={"Go to last page"}
          className={className}
          onClick={() => setPageNumber(lastPage)}
        >
          <Icon icon={"material-symbols:last-page-rounded"} />
        </button>
      </div>
    );
  };

  const CheckboxSelectedCount = () => {
    return (
      checkbox &&
      checkboxes.some((checkbox) => checkbox.checked) && (
        <div
          className={
            "fixed flex bg-[rgba(0,0,0,0.2)] rounded bottom-[80px] text-center font-semibold right-10 w-[fit-content] p-2 cursor-pointer transition-all duration-700 hover:hidden"
          }
        >
          {checkboxes.filter((checkbox) => checkbox.checked).length} rows
          selected
        </div>
      )
    );
  };

  const handleHideColumnsVisibility = () => {
    setIsHideColumnsVisible(!isHideColumnsVisible);
  };

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsHideColumnsVisible(false);
    }
  };

  const handleColumnVisibility = (index, checked) => {
    setVisibleColumns((prevState) =>
      prevState.map((visible, i) => (i === index ? checked : visible))
    );

    updateLocalColumnVisibility(index, checked);
  };

  const updateLocalColumnVisibility = (index, checked) => {
    const updatedLocalData = localData.map((el, i) => {
      if (i === index) {
        return checked;
      }

      return el;
    });
    localStorage.setItem(key, updatedLocalData);
  };

  const handleExport = () => {
    if (columns.length > 0 && data.length > 0) {
      const header = columns.map((column) => column.header).join(",") + "\n";

      const rows = data
        .map((item) => {
          const rowData = columns.map((col) => {
            const value =
              typeof col.selector === "string"
                ? col.selector.split(".").reduce((acc, key) => acc[key], item)
                : col.selector(item);

            if (typeof value === "object" && value?.props?.children) {
              const children = Array.isArray(value.props.children)
                ? value.props.children
                : [value.props.children];
              return children
                .map((child) => (typeof child === "object" ? "" : child))
                .join(" ")
                .replace(/\s{2,}/g, " ")
                .replace(/,/g, ";");
            }

            return value.toString().replace(/,/g, ";");
          });

          return rowData.join(",");
        })
        .join("\n");

      const csv_data = header + rows;
      const blob = new Blob([csv_data], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `${table_title}.csv`);
    }
  };

  return (
    <div className={"datatable"}>
      <div className={"w-full"}>
        <Popup
          showPopup={showPopup}
          popupTitle={popupTitle}
          popupContent={popupContent}
          setShowPopup={setShowPopup}
        />
        <div className={"grid md:grid-cols-2 mt-3"}>
          <div className={"title"} title={title} hidden={!title}>
            <h3 className={"text-2xl font-semibold mt-2"}>{title}</h3>
          </div>
          <div
            className={
              "w-full flex justify-end grid grid-cols-1 gap-1 md:grid-cols-2"
            }
          >
            <div className={"flex justify-end gap-2"}>
              {exportable && (
                <button
                  title={"Export csv"}
                  disabled={progressPending}
                  onClick={handleExport}
                  className={
                    "flex border-2 border-solid rounded p-2 pl-3 w-fit cursor-pointer border-gray-200 transition-all delay-100 hover:border-gray-500 disabled:opacity-50"
                  }
                >
                  Export{" "}
                  <Icon
                    className={"mt-[2px] ml-2"}
                    fontSize={"20px"}
                    icon={"prime:file-export"}
                  />
                </button>
              )}

              {columnsVisibility && (
                <div className={"relative"} ref={componentRef}>
                  <button
                    disabled={progressPending}
                    onClick={handleHideColumnsVisibility}
                    title={"Set column visibility"}
                    className={
                      "flex border-2 border-solid rounded p-2 pl-3 w-fit cursor-pointer border-gray-200 transition-all delay-100 hover:border-gray-500 disabled:opacity-50"
                    }
                  >
                    Columns{" "}
                    <Icon
                      className={"mt-1 ml-2"}
                      fontSize={"20px"}
                      icon={"material-symbols:keyboard-arrow-down"}
                    />
                  </button>
                  <div
                    className={`w-[200px] md:w-[400px] bg-gray-100 p-2 absolute top-12 left-0 z-50 rounded grid md:grid-cols-2 ${
                      isHideColumnsVisible ? "block" : "hidden"
                    }`}
                  >
                    {columns.map((column, index) => (
                      <div
                        key={index}
                        className={"text-xs font-medium uppercase mt-1 mb-1"}
                      >
                        <input
                          key={index}
                          onChange={(e) =>
                            handleColumnVisibility(index, e.target.checked)
                          }
                          checked={visibleColumns[index]}
                          id={column.header}
                          type={"checkbox"}
                        />
                        <label
                          className={"cursor-pointer ml-1"}
                          htmlFor={column.header}
                        >
                          {column.header}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={"relative w-full"}>
              <Icon
                icon={"material-symbols:search"}
                className={"absolute top-2 left-2 text-[25px] text-gray-400"}
              />
              <input
                type={"text"}
                value={inputValue}
                disabled={progressPending}
                onChange={(e) => setInputValue(e.target.value)}
                title={searchPlaceholder}
                className={
                  "border-2 border-solid rounded pl-10 pt-2 pb-2 pr-2 w-full border-gray-200 transition-all delay-100 hover:border-gray-500"
                }
                placeholder={searchPlaceholder}
              />
            </div>
          </div>
        </div>

        {progressPending ? (
          <div className="pt-10 pb-10">
            {progressComponent || (
              <h4 className="w-full text-lg text-center">Loading Data</h4>
            )}
          </div>
        ) : data.length === 0 ? (
          <div className="pt-10 pb-10">
            {noDataComponent || (
              <h4 className="w-full text-lg text-center">No Data Found</h4>
            )}
          </div>
        ) : (
          <>
            <div className={"relative overflow-hidden"}>
              <div
                className={`w-full overflow-x-auto scroll-sm ${
                  overflowXScrollOnTop ? "datatable-scroll-top" : ""
                }`}
              >
                <table
                  className={`w-full mt-4 ${
                    overflowXScrollOnTop ? "table-scroll-top" : ""
                  }`}
                >
                  <thead>
                    <TableHeader
                      columns={columns}
                      checkbox={checkbox}
                      checkedAll={checkedAll}
                      handleCheckAll={handleCheckAll}
                      handleSortChange={handleSortChange}
                      orderBy={orderBy}
                      sortBy={sortBy}
                      expandable={expandable}
                      visibleColumns={visibleColumns}
                    />
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <TableRow
                        key={index}
                        index={index}
                        checkbox={checkbox}
                        checkboxes={checkboxes}
                        handleCheckBox={handleCheckBox}
                        expandable={expandable}
                        highlightRowOnHover={highlightRowOnHover}
                        expandableCondition={expandableCondition}
                        expandableComponent={expandableComponent}
                        columns={columns}
                        item={item}
                        handleShowPopup={handleShowPopup}
                        visibleColumns={visibleColumns}
                      />
                    ))}
                  </tbody>
                  <tfoot>
                    <TableHeader
                      columns={columns}
                      checkbox={checkbox}
                      checkedAll={checkedAll}
                      handleCheckAll={handleCheckAll}
                      handleSortChange={handleSortChange}
                      orderBy={orderBy}
                      sortBy={sortBy}
                      expandable={expandable}
                      visibleColumns={visibleColumns}
                    />
                  </tfoot>
                </table>
              </div>
            </div>
            <div className={"w-full flex gap-3 justify-end mt-5"}>
              <PaginationOption />
              <PaginationInformation />
              <PaginationButtons />
            </div>
            <CheckboxSelectedCount />
          </>
        )}
      </div>
    </div>
  );
};

DataTable.propTypes = {
  title: PropTypes.string,
  checkbox: PropTypes.bool,
  checkboxValueSelector: PropTypes.string,
  selectedCheckboxes: PropTypes.func,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  totalData: PropTypes.number.isRequired,
  noDataComponent: PropTypes.element,
  progressPending: PropTypes.bool,
  progressComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  defaultPageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  highlightRowOnHover: PropTypes.bool,
  exportable: PropTypes.bool,
  columnsVisibility: PropTypes.bool,
  expandable: PropTypes.bool,
  expandableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  expandableCondition: PropTypes.func,
  search: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  orderBy: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default memo(DataTable);
