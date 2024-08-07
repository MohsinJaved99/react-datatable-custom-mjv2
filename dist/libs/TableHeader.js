"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@iconify/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TableHeader = function TableHeader(_ref) {
  var columns = _ref.columns,
    checkbox = _ref.checkbox,
    checkedAll = _ref.checkedAll,
    handleCheckAll = _ref.handleCheckAll,
    handleSortChange = _ref.handleSortChange,
    orderBy = _ref.orderBy,
    sortBy = _ref.sortBy,
    expandable = _ref.expandable,
    visibleColumns = _ref.visibleColumns;
  var headerClassName = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer bg-gray-100";
  return /*#__PURE__*/_react["default"].createElement("tr", null, expandable && /*#__PURE__*/_react["default"].createElement("th", {
    width: "30px",
    className: headerClassName
  }), checkbox && /*#__PURE__*/_react["default"].createElement("th", {
    className: headerClassName
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: 'checkbox',
    checked: checkedAll,
    onChange: handleCheckAll,
    title: "".concat(checkedAll ? 'Unselect All' : 'Select All'),
    name: 'checkbox'
  })), columns.map(function (col, index) {
    return visibleColumns[index] && /*#__PURE__*/_react["default"].createElement("th", {
      key: col.selector,
      style: _objectSpread(_objectSpread({}, col.style), col.headerStyle),
      className: headerClassName,
      onClick: function onClick() {
        if (col.sortable) handleSortChange(col.order_by);
      },
      title: col.header
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "flex"
    }, col.sortable ? /*#__PURE__*/_react["default"].createElement("span", {
      title: "Sortable",
      className: 'mr-2 text-gray-300'
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      fontSize: "16px",
      icon: 'mdi:sort'
    })) : '', col.header, orderBy === col.order_by && (sortBy === 'ASC' ? /*#__PURE__*/_react["default"].createElement("span", {
      title: "Sorted by ascending"
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      className: "mt-[-2px]",
      fontSize: "20px",
      icon: 'material-symbols:arrow-drop-up'
    })) : /*#__PURE__*/_react["default"].createElement("span", {
      title: "Sorted by descending"
    }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
      className: "mt-[-2px]",
      fontSize: "20px",
      icon: 'material-symbols:arrow-drop-down'
    })))));
  }));
};
TableHeader.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  checkbox: _propTypes["default"].bool,
  checkedAll: _propTypes["default"].bool,
  handleCheckAll: _propTypes["default"].func,
  handleSortChange: _propTypes["default"].func,
  orderBy: _propTypes["default"].string.isRequired,
  sortBy: _propTypes["default"].string.isRequired,
  expandable: _propTypes["default"].bool,
  visibleColumns: _propTypes["default"].array
};
var _default = exports["default"] = TableHeader;