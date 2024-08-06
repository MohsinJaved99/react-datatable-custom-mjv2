import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "@iconify/react";

const TableRow = ({
                      index,
                      checkbox,
                      checkboxes,
                      handleCheckBox,
                      expandable,
                      highlightRowOnHover,
                      expandableCondition,
                      expandableComponent,
                      columns,
                      item,
                      handleShowPopup,
                      visibleColumns
                  }) => {
    const rowClassName = `px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b-[1px] border-solid`;

    const [expandedRows, setExpandedRows] = React.useState({});

    const toggleRowExpand = React.useCallback((index) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }, []);

    const handleColumnClick = React.useCallback((column, data) => {
        if (column.showPopupOnClick) {
            if (typeof data === 'string') {
                handleShowPopup({show: true, title: column.header, content: data});
            } else if (typeof data === 'object') {
                if (data?.props?.children) {
                    handleShowPopup({show: true, title: column.header, content: data.props.children});
                }
            }
        }
    }, [handleShowPopup]);


    return (
        <>
            <tr key={index} className={`relative ${highlightRowOnHover ? 'hover:bg-gray-100' : ''}`}>
                {expandable && (expandableCondition === undefined || expandableCondition(item) ? <td className={rowClassName}>
                    <span
                        title={"Click to expand"}
                        className={"cursor-pointer"}
                        onClick={() => toggleRowExpand(index)}
                    >
                        <Icon
                            fontSize={"25px"}
                            icon={expandedRows[index] ? 'material-symbols:keyboard-arrow-down' : 'material-symbols:keyboard-arrow-right'}
                        />
                    </span>
                </td> : <td className={'border-b-[1px] border-solid'}/>)}
                {checkbox && (
                    <td className={rowClassName}>
                        <input
                            type={'checkbox'}
                            checked={checkboxes[index]?.checked || false}
                            onChange={(e) => handleCheckBox(index, e.target.checked)}
                            name={'datatable-checkbox'}
                            title={'Select'}
                        />
                    </td>
                )}
                {columns.map((col, index) => {
                    const value = typeof col.selector === 'string'
                        ? col.selector.split('.').reduce((acc, key) => acc[key], item)
                        : col.selector(item);

                    return (
                        visibleColumns[index] && (<td
                            key={col.selector.toString()}
                            onClick={() => handleColumnClick(col, value)}
                            style={{
                                ...col.style,
                                ...col.rowStyle,
                            }}
                            className={rowClassName + ` ${col.showPopupOnClick ? 'cursor-pointer' : ''}`}
                            title={`${col.showPopupOnClick ? 'Click to view more' : ''}`}
                        >
                            {value ? value : '-'}
                        </td>)
                    );
                })}
            </tr>
            {expandable && (
                <tr className={`expandable-row ${expandedRows[index] ? 'expanded' : 'collapsed'}`}>
                    <td colSpan={columns.length + 1} className={"p-4"}>
                        {expandedRows[index] && expandableComponent ? expandableComponent(item) : null}
                    </td>
                </tr>
            )}
        </>
    );
};

TableRow.propTypes = {
    index: PropTypes.number.isRequired,
    checkbox: PropTypes.bool,
    checkboxes: PropTypes.array.isRequired,
    handleCheckBox: PropTypes.func.isRequired,
    expandable: PropTypes.bool,
    highlightRowOnHover: PropTypes.bool,
    expandableCondition: PropTypes.func,
    expandableComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element
    ]),
    columns: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired,
    handleShowPopup: PropTypes.func.isRequired,
    visibleColumns: PropTypes.array
};

export default TableRow;
