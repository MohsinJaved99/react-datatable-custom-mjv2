"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@iconify/react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Popup = function Popup(_ref) {
  var showPopup = _ref.showPopup,
    popupContent = _ref.popupContent,
    popupTitle = _ref.popupTitle,
    setShowPopup = _ref.setShowPopup;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    id: "modal",
    className: "".concat(showPopup ? 'fixed' : 'hidden', " inset-0 bg-gray-900 bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50")
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: "Close",
    onClick: function onClick() {
      setShowPopup(false);
    },
    className: 'absolute right-4 top-4 cursor-pointer hover:text-[#d61106]'
  }, /*#__PURE__*/_react["default"].createElement(_react2.Icon, {
    fontSize: "30px",
    icon: 'mdi:close-thick'
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto w-full"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-lg uppercase font-bold mb-4"
  }, popupTitle), /*#__PURE__*/_react["default"].createElement("p", {
    className: "mb-4 max-h-[500px] overflow-auto"
  }, popupContent))));
};
var _default = exports["default"] = /*#__PURE__*/(0, _react.memo)(Popup);