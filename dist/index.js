"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@iconify/react");
var _TableHeader = _interopRequireDefault(require("./libs/TableHeader"));
var _TableRow = _interopRequireDefault(require("./libs/TableRow"));
require("./assets/index.css");
var _Popup = _interopRequireDefault(require("./libs/Popup"));
var _fileSaver = require("file-saver");
var _lodash = require("lodash");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DataTable = function DataTable(_ref) {
  var title = _ref.title,
    _ref$checkbox = _ref.checkbox,
    checkbox = _ref$checkbox === void 0 ? false : _ref$checkbox,
    _ref$checkboxValueSel = _ref.checkboxValueSelector,
    checkboxValueSelector = _ref$checkboxValueSel === void 0 ? "id" : _ref$checkboxValueSel,
    selectedCheckboxes = _ref.selectedCheckboxes,
    columns = _ref.columns,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$totalData = _ref.totalData,
    totalData = _ref$totalData === void 0 ? 0 : _ref$totalData,
    noDataComponent = _ref.noDataComponent,
    _ref$progressPending = _ref.progressPending,
    progressPending = _ref$progressPending === void 0 ? false : _ref$progressPending,
    progressComponent = _ref.progressComponent,
    _ref$defaultPageSize = _ref.defaultPageSize,
    defaultPageSize = _ref$defaultPageSize === void 0 ? 10 : _ref$defaultPageSize,
    _ref$pageSizeOptions = _ref.pageSizeOptions,
    pageSizeOptions = _ref$pageSizeOptions === void 0 ? [10, 20, 50, 100] : _ref$pageSizeOptions,
    _ref$highlightRowOnHo = _ref.highlightRowOnHover,
    highlightRowOnHover = _ref$highlightRowOnHo === void 0 ? false : _ref$highlightRowOnHo,
    _ref$exportable = _ref.exportable,
    exportable = _ref$exportable === void 0 ? false : _ref$exportable,
    _ref$columnsVisibilit = _ref.columnsVisibility,
    columnsVisibility = _ref$columnsVisibilit === void 0 ? false : _ref$columnsVisibilit,
    _ref$expandable = _ref.expandable,
    expandable = _ref$expandable === void 0 ? false : _ref$expandable,
    expandableCondition = _ref.expandableCondition,
    expandableComponent = _ref.expandableComponent,
    _ref$overflowXScrollO = _ref.overflowXScrollOnTop,
    overflowXScrollOnTop = _ref$overflowXScrollO === void 0 ? false : _ref$overflowXScrollO,
    search = _ref.search,
    _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 10 : _ref$pageSize,
    _ref$pageNumber = _ref.pageNumber,
    pageNumber = _ref$pageNumber === void 0 ? 1 : _ref$pageNumber,
    _ref$totalPages = _ref.totalPages,
    totalPages = _ref$totalPages === void 0 ? 0 : _ref$totalPages,
    _ref$orderBy = _ref.orderBy,
    orderBy = _ref$orderBy === void 0 ? "updated_at" : _ref$orderBy,
    _ref$sortBy = _ref.sortBy,
    sortBy = _ref$sortBy === void 0 ? "DESC" : _ref$sortBy,
    setSearch = _ref.setSearch,
    _ref$searchPlaceholde = _ref.searchPlaceholder,
    searchPlaceholder = _ref$searchPlaceholde === void 0 ? "Search..." : _ref$searchPlaceholde,
    setPageSize = _ref.setPageSize,
    setPageNumber = _ref.setPageNumber,
    setOrderBy = _ref.setOrderBy,
    setSortBy = _ref.setSortBy;
  var componentRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showPopup = _useState2[0],
    setShowPopup = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    popupTitle = _useState4[0],
    setPopupTitle = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    popupContent = _useState6[0],
    setPopupContent = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    checkboxes = _useState8[0],
    setCheckboxes = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    checkedAll = _useState10[0],
    setCheckedAll = _useState10[1];
  var _useState11 = (0, _react.useState)(search),
    _useState12 = _slicedToArray(_useState11, 2),
    inputValue = _useState12[0],
    setInputValue = _useState12[1];

  // Column visibility state
  var table_title = title.toString().toLowerCase().replaceAll(" ", "_");
  var key = "".concat(table_title, "_column_visibility");
  var localData = localStorage.getItem(key) ? localStorage.getItem(key).split(",").map(function (el) {
    return el === "true";
  }) : null;
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isHideColumnsVisible = _useState14[0],
    setIsHideColumnsVisible = _useState14[1];
  var _useState15 = (0, _react.useState)(columnsVisibility && columns.length > 0 ? localData && localData.length === columns.length ? localData : columns.map(function () {
      return true;
    }) : columns.map(function () {
      return true;
    })),
    _useState16 = _slicedToArray(_useState15, 2),
    visibleColumns = _useState16[0],
    setVisibleColumns = _useState16[1];

  // Debounced version of the setSearch function
  var debouncedSetSearch = (0, _react.useCallback)((0, _lodash.debounce)(function (value) {
    return setSearch(value);
  }, 500),
  // Adjust the debounce delay as needed
  [setSearch]);
  (0, _react.useEffect)(function () {
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (columnsVisibility) {
      if (localData) {
        if (localData.length !== visibleColumns.length) {
          localStorage.setItem(key, columns.map(function () {
            return true;
          }));
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
  (0, _react.useEffect)(function () {
    // Update the input value when the search prop changes
    setInputValue(search);
  }, [search]);
  (0, _react.useEffect)(function () {
    // Call debounced function when inputValue changes
    debouncedSetSearch(inputValue);
    return function () {
      debouncedSetSearch.cancel(); // Cleanup on unmount
    };
  }, [inputValue, debouncedSetSearch]);
  (0, _react.useEffect)(function () {
    if (checkbox) {
      var cb = data.map(function (item, index) {
        return {
          index: index,
          value: checkboxValueSelector.split(".").reduce(function (acc, key) {
            return acc[key];
          }, item),
          checked: false
        };
      });
      setCheckboxes(cb);
    }
    setCheckedAll(false);
  }, [data]);
  (0, _react.useEffect)(function () {
    if (checkbox) {
      selectedCheckboxes(checkboxes.filter(function (checkbox) {
        return checkbox.checked;
      }));
    }
  }, [checkboxes]);
  var handleSortChange = function handleSortChange(order_by) {
    setOrderBy(order_by);
    setSortBy(sortBy === "ASC" ? "DESC" : "ASC");
  };
  var handleCheckBox = function handleCheckBox(index, checked) {
    setCheckboxes(function (prevState) {
      return prevState.map(function (item, i) {
        return i === index ? _objectSpread(_objectSpread({}, item), {}, {
          checked: checked
        }) : item;
      });
    });
  };
  var handleCheckAll = function handleCheckAll(e) {
    var checked = e.target.checked;
    setCheckboxes(function (prevState) {
      return prevState.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          checked: checked
        });
      });
    });
    setCheckedAll(checked);
  };
  var handleShowPopup = function handleShowPopup(data) {
    setShowPopup(data.show);
    setPopupTitle(data.title);
    setPopupContent(data.content);
  };
  var PaginationOption = function PaginationOption() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-[fit-content]"
    }, /*#__PURE__*/_react["default"].createElement("p", null, "Rows per page:", /*#__PURE__*/_react["default"].createElement("select", {
      className: "ml-1",
      defaultValue: defaultPageSize,
      onChange: function onChange(e) {
        return setPageSize(Number(e.target.value));
      }
    }, pageSizeOptions.map(function (pagination, index) {
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: index,
        value: pagination
      }, pagination);
    }))));
  };
  var PaginationInformation = function PaginationInformation() {
    var offset = (pageNumber - 1) * pageSize + 1;
    var limit = Math.min(pageNumber * pageSize, totalData);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-[fit-content]"
    }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-semibold"
    }, offset), " -", " ", /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-semibold"
    }, limit), " of", " ", /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-semibold"
    }, totalData)));
  };
  var PaginationButtons = function PaginationButtons() {
    var className = "flex items-center justify-center rounded-full bg-gray-100 w-8 h-8 enabled:hover:bg-gray-200 disabled:opacity-[0.5]";
    var nextPage = pageNumber + 1;
    var previousPage = pageNumber - 1;
    var firstPage = 1;
    var lastPage = totalPages;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-[fit-content] flex mt-[-4px] gap-3"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      disabled: totalPages <= 1 || pageNumber === 1,
      title: "Go to first page",
      className: className,
      onClick: function onClick() {
        return setPageNumber(firstPage);
      }
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      icon: "material-symbols:first-page-rounded"
    })), /*#__PURE__*/_react["default"].createElement("button", {
      disabled: previousPage < 1,
      title: "Go to previous page",
      className: className,
      onClick: function onClick() {
        return setPageNumber(previousPage);
      }
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      icon: "material-symbols:keyboard-arrow-left"
    })), /*#__PURE__*/_react["default"].createElement("button", {
      disabled: !(nextPage <= totalPages),
      title: "Go to next page",
      className: className,
      onClick: function onClick() {
        return setPageNumber(nextPage);
      }
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      icon: "material-symbols:keyboard-arrow-right"
    })), /*#__PURE__*/_react["default"].createElement("button", {
      disabled: totalPages <= 1 || pageNumber === totalPages,
      title: "Go to last page",
      className: className,
      onClick: function onClick() {
        return setPageNumber(lastPage);
      }
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      icon: "material-symbols:last-page-rounded"
    })));
  };
  var CheckboxSelectedCount = function CheckboxSelectedCount() {
    return checkbox && checkboxes.some(function (checkbox) {
      return checkbox.checked;
    }) && /*#__PURE__*/_react["default"].createElement("div", {
      className: "fixed flex bg-[rgba(0,0,0,0.2)] rounded bottom-[80px] text-center font-semibold right-10 w-[fit-content] p-2 cursor-pointer transition-all duration-700 hover:hidden"
    }, checkboxes.filter(function (checkbox) {
      return checkbox.checked;
    }).length, " rows selected");
  };
  var handleHideColumnsVisibility = function handleHideColumnsVisibility() {
    setIsHideColumnsVisible(!isHideColumnsVisible);
  };
  var handleClickOutside = function handleClickOutside(event) {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsHideColumnsVisible(false);
    }
  };
  var handleColumnVisibility = function handleColumnVisibility(index, checked) {
    setVisibleColumns(function (prevState) {
      return prevState.map(function (visible, i) {
        return i === index ? checked : visible;
      });
    });
    updateLocalColumnVisibility(index, checked);
  };
  var updateLocalColumnVisibility = function updateLocalColumnVisibility(index, checked) {
    var updatedLocalData = localData.map(function (el, i) {
      if (i === index) {
        return checked;
      }
      return el;
    });
    localStorage.setItem(key, updatedLocalData);
  };
  var handleExport = function handleExport() {
    if (columns.length > 0 && data.length > 0) {
      var header = columns.filter(function (column) {
        return column["export"] === undefined || column["export"] === true;
      }).map(function (column) {
        return column.header;
      }).join(",") + "\n";
      var rows = data.map(function (item) {
        var rowData = columns.filter(function (column) {
          return column["export"] === undefined || column["export"] === true;
        }).map(function (col) {
          if (col["export"] === undefined || col["export"] === true) {
            var _value$props;
            var value = typeof col.selector === "string" ? col.selector.split(".").reduce(function (acc, key) {
              return acc[key];
            }, item) : col.selector(item);
            if (_typeof(value) === "object" && value !== null && value !== void 0 && (_value$props = value.props) !== null && _value$props !== void 0 && _value$props.children) {
              var children = Array.isArray(value.props.children) ? value.props.children : [value.props.children];
              return children.map(function (child) {
                return _typeof(child) === "object" ? "" : child;
              }).join(" ").replace(/\s{2,}/g, " ").replace(/,/g, ";");
            }
            return value.toString().replace(/,/g, ";");
          }
        });
        return rowData.join(",");
      }).join("\n");
      var csv_data = header + rows;
      var blob = new Blob([csv_data], {
        type: "text/csv;charset=utf-8"
      });
      (0, _fileSaver.saveAs)(blob, "".concat(table_title, ".csv"));
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "datatable"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/_react["default"].createElement(_Popup["default"], {
    showPopup: showPopup,
    popupTitle: popupTitle,
    popupContent: popupContent,
    setShowPopup: setShowPopup
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid md:grid-cols-2 mt-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "title",
    title: title,
    hidden: !title
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-2xl font-semibold mt-2"
  }, title)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full flex justify-end grid grid-cols-1 gap-1 md:grid-cols-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-end gap-2"
  }, exportable && /*#__PURE__*/_react["default"].createElement("button", {
    title: "Export csv",
    disabled: progressPending,
    onClick: handleExport,
    className: "flex border-2 border-solid rounded p-2 pl-3 w-fit cursor-pointer border-gray-200 transition-all delay-100 hover:border-gray-500 disabled:opacity-50"
  }, "Export", " ", /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
    className: "mt-[2px] ml-2",
    fontSize: "20px",
    icon: "prime:file-export"
  })), columnsVisibility && /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative",
    ref: componentRef
  }, /*#__PURE__*/_react["default"].createElement("button", {
    disabled: progressPending,
    onClick: handleHideColumnsVisibility,
    title: "Set column visibility",
    className: "flex border-2 border-solid rounded p-2 pl-3 w-fit cursor-pointer border-gray-200 transition-all delay-100 hover:border-gray-500 disabled:opacity-50"
  }, "Columns", " ", /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
    className: "mt-1 ml-2",
    fontSize: "20px",
    icon: "material-symbols:keyboard-arrow-down"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-[200px] md:w-[400px] bg-gray-100 p-2 absolute top-12 left-0 z-50 rounded grid md:grid-cols-2 ".concat(isHideColumnsVisible ? "block" : "hidden")
  }, columns.map(function (column, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "text-xs font-medium uppercase mt-1 mb-1"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      key: index,
      onChange: function onChange(e) {
        return handleColumnVisibility(index, e.target.checked);
      },
      checked: visibleColumns[index],
      id: column.header,
      type: "checkbox"
    }), /*#__PURE__*/_react["default"].createElement("label", {
      className: "cursor-pointer ml-1",
      htmlFor: column.header
    }, column.header));
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
    icon: "material-symbols:search",
    className: "absolute top-2 left-2 text-[25px] text-gray-400"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: inputValue,
    disabled: progressPending,
    onChange: function onChange(e) {
      return setInputValue(e.target.value);
    },
    title: searchPlaceholder,
    className: "border-2 border-solid rounded pl-10 pt-2 pb-2 pr-2 w-full border-gray-200 transition-all delay-100 hover:border-gray-500",
    placeholder: searchPlaceholder
  })))), progressPending ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "pt-10 pb-10"
  }, progressComponent || /*#__PURE__*/_react["default"].createElement("h4", {
    className: "w-full text-lg text-center"
  }, "Loading Data")) : data.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "pt-10 pb-10"
  }, noDataComponent || /*#__PURE__*/_react["default"].createElement("h4", {
    className: "w-full text-lg text-center"
  }, "No Data Found")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full overflow-x-auto scroll-sm ".concat(overflowXScrollOnTop ? "datatable-scroll-top" : "")
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "w-full mt-4 ".concat(overflowXScrollOnTop ? "table-scroll-top" : "")
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement(_TableHeader["default"], {
    columns: columns,
    checkbox: checkbox,
    checkedAll: checkedAll,
    handleCheckAll: handleCheckAll,
    handleSortChange: handleSortChange,
    orderBy: orderBy,
    sortBy: sortBy,
    expandable: expandable,
    visibleColumns: visibleColumns
  })), /*#__PURE__*/_react["default"].createElement("tbody", null, data.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_TableRow["default"], {
      key: index,
      index: index,
      checkbox: checkbox,
      checkboxes: checkboxes,
      handleCheckBox: handleCheckBox,
      expandable: expandable,
      highlightRowOnHover: highlightRowOnHover,
      expandableCondition: expandableCondition,
      expandableComponent: expandableComponent,
      columns: columns,
      item: item,
      handleShowPopup: handleShowPopup,
      visibleColumns: visibleColumns
    });
  })), /*#__PURE__*/_react["default"].createElement("tfoot", null, /*#__PURE__*/_react["default"].createElement(_TableHeader["default"], {
    columns: columns,
    checkbox: checkbox,
    checkedAll: checkedAll,
    handleCheckAll: handleCheckAll,
    handleSortChange: handleSortChange,
    orderBy: orderBy,
    sortBy: sortBy,
    expandable: expandable,
    visibleColumns: visibleColumns
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full flex gap-3 justify-end mt-5"
  }, /*#__PURE__*/_react["default"].createElement(PaginationOption, null), /*#__PURE__*/_react["default"].createElement(PaginationInformation, null), /*#__PURE__*/_react["default"].createElement(PaginationButtons, null)), /*#__PURE__*/_react["default"].createElement(CheckboxSelectedCount, null))));
};
DataTable.propTypes = {
  title: _propTypes["default"].string,
  checkbox: _propTypes["default"].bool,
  checkboxValueSelector: _propTypes["default"].string,
  selectedCheckboxes: _propTypes["default"].func,
  columns: _propTypes["default"].array.isRequired,
  data: _propTypes["default"].array.isRequired,
  totalData: _propTypes["default"].number.isRequired,
  noDataComponent: _propTypes["default"].element,
  progressPending: _propTypes["default"].bool,
  progressComponent: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  defaultPageSize: _propTypes["default"].number,
  pageSizeOptions: _propTypes["default"].array,
  highlightRowOnHover: _propTypes["default"].bool,
  exportable: _propTypes["default"].bool,
  columnsVisibility: _propTypes["default"].bool,
  expandable: _propTypes["default"].bool,
  expandableComponent: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),
  expandableCondition: _propTypes["default"].func,
  search: _propTypes["default"].string,
  searchPlaceholder: _propTypes["default"].string,
  pageSize: _propTypes["default"].number.isRequired,
  pageNumber: _propTypes["default"].number.isRequired,
  orderBy: _propTypes["default"].string.isRequired,
  sortBy: _propTypes["default"].string.isRequired,
  setSearch: _propTypes["default"].func.isRequired,
  setPageSize: _propTypes["default"].func.isRequired,
  setPageNumber: _propTypes["default"].func.isRequired,
  setOrderBy: _propTypes["default"].func.isRequired,
  setSortBy: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = /*#__PURE__*/(0, _react.memo)(DataTable);