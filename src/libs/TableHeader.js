import React from "react";
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

const TableHeader = ({ columns, checkbox, checkedAll, handleCheckAll, handleSortChange, orderBy, sortBy, expandable, visibleColumns }) => {
    const headerClassName = `px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer bg-gray-100`;

    return (
        <tr className={'mj_tableHeader'}>
            {expandable && <th width={"30px"} className={headerClassName} />}
            {checkbox && (
                <th className={headerClassName}>
                    <input type={'checkbox'} checked={checkedAll} onChange={handleCheckAll} title={`${checkedAll?'Unselect All':'Select All'}`}  name={'checkbox'} />
                </th>
            )}
            {columns.map((col, index) => (
                visibleColumns[index] && (
                    <th
                        key={col.selector}
                        style={{
                            ...col.style,
                            ...col.headerStyle,
                        }}
                        className={headerClassName}
                        onClick={() => {
                            if (col.sortable) handleSortChange(col.order_by);
                        }}
                        title={col.header}
                    >
                    <span className={"flex"}>
                        {col.sortable ? (
                            <span title={"Sortable"} className={'mr-2 text-gray-300'}>
                                <Icon fontSize={"16px"} icon={'mdi:sort'} />
                            </span>
                        ) : ''}{col.header}
                        {orderBy === col.order_by && (sortBy === 'ASC' ? (
                            <span title={"Sorted by ascending"}>
                                <Icon className={"mt-[-2px]"} fontSize={"20px"} icon={'material-symbols:arrow-drop-up'} />
                            </span>
                        ) : (
                            <span title={"Sorted by descending"}>
                                <Icon className={"mt-[-2px]"} fontSize={"20px"} icon={'material-symbols:arrow-drop-down'} />
                            </span>
                        ))}
                    </span>
                    </th>
                )
            ))}
        </tr>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    checkbox: PropTypes.bool,
    checkedAll: PropTypes.bool,
    handleCheckAll: PropTypes.func,
    handleSortChange: PropTypes.func,
    orderBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    expandable: PropTypes.bool,
    visibleColumns: PropTypes.array
};

export default TableHeader;
