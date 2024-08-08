# DataTable Component

A versatile and customizable data table component built with React. It supports various features such as pagination, sorting, searching, row selection, column visibility toggling, and CSV export.

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js v20.14.0 or higher
- npm 10.7.0 or higher

Install the `DataTable` component via npm:

```bash
npm install react-datatable-custom-mjv2
```

### Component Props

| Prop            | Type     | Description                                                                                   |
| --------------- | -------- | --------------------------------------------------------------------------------------------- |
| `columns`       | `array`  | An array of column definitions. Each column should have a `header` and a `selector` property. |
| `data`          | `array`  | An array of data objects to be displayed in the table.                                        |
| `totalData`     | `number` | The total number of data entries.                                                             |
| `pageSize`      | `number` | The number of rows per page.                                                                  |
| `pageNumber`    | `number` | The current page number.                                                                      |
| `orderBy`       | `string` | The field by which data is ordered.                                                           |
| `sortBy`        | `string` | The order direction (`ASC` or `DESC`).                                                        |
| `setSearch`     | `func`   | Function to update the search state.                                                          |
| `setPageSize`   | `func`   | Function to update the page size.                                                             |
| `setPageNumber` | `func`   | Function to update the page number.                                                           |
| `setOrderBy`    | `func`   | Function to update the order by field.                                                        |
| `setSortBy`     | `func`   | Function to update the sort direction.                                                        |

### Optional Props

| Prop                    | Type                  | Description                                                    |
| ----------------------- | --------------------- | -------------------------------------------------------------- |
| `title`                 | `string`              | The title of the table.                                        |
| `checkbox`              | `bool`                | Enables row selection checkboxes.                              |
| `checkboxValueSelector` | `string`              | The field used to identify checkbox values. Default is 'id'.   |
| `selectedCheckboxes`    | `func`                | Function to handle selected checkboxes.                        |
| `noDataComponent`       | `element`             | Custom component to display when there's no data.              |
| `progressPending`       | `bool`                | Displays a loading state when true.                            |
| `progressComponent`     | `string` or `element` | Custom component to display during loading.                    |
| `defaultPageSize`       | `number`              | The default number of rows per page. Default is 10.            |
| `pageSizeOptions`       | `array`               | Options for rows per page. Default is [10, 20, 50, 100].       |
| `highlightRowOnHover`   | `bool`                | Highlights rows on hover.                                      |
| `exportable`            | `bool`                | Enables CSV export functionality.                              |
| `columnsVisibility`     | `bool`                | Enables column visibility toggling.                            |
| `expandable`            | `bool`                | Enables row expansion.                                         |
| `expandableCondition`   | `func`                | Condition to determine if a row is expandable.                 |
| `expandableComponent`   | `func` or `element`   | Component to display when a row is expanded.                   |
| `overflowXScrollOnTop`  | `bool`                | Enables horizontal scroll at the top of the table.             |
| `searchPlaceholder`     | `string`              | Placeholder text for the search input. Default is 'Search...'. |

## Usage

<!-- prettier-ignore -->
````js
import {Link, useLoaderData, Navigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import DataTable from "react-datatable-custom-mjv2";
import moment from 'moment-timezone';
import {Icon} from "@iconify/react";

const AwaitingShipment = () => {
    const baseUrl = '[api-base-url]';
    const headers = {
        'Content-Type': 'application/json'
    };
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [pageSize, setPageSize] = useState(50);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('updated_at');
    const [sortBy, setSortBy] = useState('ASC');

    useEffect (() => {
        fetchOrders();
    }, [pageSize, pageNumber, search, orderBy, sortBy]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/orders`, {
                params: {
                    page_size: pageSize,
                    page_number: pageNumber,
                    status: 'awaiting_shipment',
                    search: search,
                    order_by: orderBy,
                    sort_by: sortBy
                },
                headers
            });
            if(response.status === 200 && response.data.success) {
                setData(response.data.data);
                setTotalData(response.data.meta_data.total_records);
                setTotalPages(response.data.meta_data.total_pages);
            }
            setTimeout(() => {
                setLoading(false);
            }, 500)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        {
            header: 'Order UUID',
            selector: 'order_uuid',
            sortable: true,
            order_by: 'order_uuid',
            style: {
                minWidth: '150px'
            }
        },
        {
            header: 'Aging',
            selector: (row) => (`${row.aging} ${row.aging<2?'Day':'Days'}`),
            sortable: true,
            order_by: 'aging',
            style: {
                minWidth: '100px'
            }
        },
        {
            header: 'Product IDs',
            selector: (row) => row.line_items.length > 0 ?
                <span title={row.line_items.map(item => item.product_id).join(', ')}>{row.line_items.map(item => item.product_id).join(', ')}</span>:
                <span>-</span>
            ,
            sortable: true,
            order_by: 'product_id',
            showPopupOnClick: true,
            style: {
                minWidth: '100px',
                maxWidth: '300px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        },
        {
            header: 'Product Titles',
            selector: (row) => row.line_items.length > 0 ?
                <span title={row.line_items.map(item => item.product_title).join(', ')}>{row.line_items.map(item => item.product_title).join(', ')}</span>
                :<span>-</span>,
            sortable: true,
            order_by: 'product_title',
            showPopupOnClick: true,
            style: {
                minWidth: '100px',
                maxWidth: '300px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        },
        {
            header: 'Carrier',
            selector: (row) => (<div className={'flex gap-2'}>
                <img src={row.carrier.carrier_image_url} hidden={!row.carrier.carrier_image_url} alt={row.carrier.carrier_name} title={row.carrier.carrier_name} width={"20px"} height={'20px'} /> {row.carrier.carrier_name}
            </div>),
            sortable: true,
            order_by: 'carrier_name',
            style: {
                minWidth: '200px'
            }
        },
        {
            header: 'Service',
            selector: 'service.service_name',
            sortable: true,
            order_by: 'service_name',
            style: {
                minWidth: '200px'
            }
        },
        {
            header: 'Ship From Name',
            selector: (row) => (<div className={'flex gap-2'}>
                {row.validations.is_ship_from_address_verified?
                    <span title={'Ship from address is verified'}><Icon icon={'material-symbols:verified-outline'} className={'text-[20px] text-[#22BB33]'} /></span>
                    :<span title={'Ship from address is not verified'}><Icon icon={'material-symbols:error-outline'} className={'text-[20px] text-[#cc0000]'} /></span>} {row.ship_from.name}
            </div>),
            sortable: true,
            order_by: 'ship_from_name',
            style: {
                minWidth: '200px'
            }
        },
        {
            header: 'Ship To Name',
            selector: (row) => (<div className={'flex gap-2'}>
                {row.validations.is_ship_to_address_verified?
                    <span title={'Ship to address is verified'}><Icon icon={'material-symbols:verified-outline'} className={'text-[20px] text-[#22BB33]'} /></span>
                    :<span title={'Ship to address is not verified'}><Icon icon={'material-symbols:error-outline'} className={'text-[20px] text-[#cc0000]'} /></span>} {row.ship_to.name}
            </div>),
            sortable: true,
            order_by: 'ship_to_name',
            style: {
                minWidth: '200px'
            }
        },
        {
            header: 'Order Number',
            selector: 'order_number',
            sortable: true,
            order_by: 'order_number',
            style: {
                minWidth: '210px',
            },
            rowStyle: {
                color: '#ff6600'
            }
        },
        {
            header: 'Reference Number',
            selector: 'reference_number',
            sortable: true,
            order_by: 'reference_number',
            style: {
                minWidth: '210px'
            }
        },
        {
            header: 'Dimension (L x W x H)',
            selector: (row) => (<>
                {row.dimensions.length} x {row.dimensions.width} x {row.dimensions.height} {row.dimensions.dimension_unit ? `(${row.dimensions.dimension_unit})`: null}
            </>),
            style: {
                minWidth: '200px'
            },
            export: false
        },
        {
            header: 'Weight',
            selector: (row) => (<>
                {row.weight} {row.weight_unit}
            </>),
            sortable: true,
            order_by: 'weight',
        },
        {
            header: 'Order Created Date',
            selector: (row) => (formatDateTime(row.created_at)),
            sortable: true,
            order_by: 'created_at',
            style: {
                minWidth: '230px'
            }
        },
        {
            header: 'Order Updated Date',
            selector: (row) => (formatDateTime(row.updated_at)),
            sortable: true,
            order_by: 'updated_at',
            style: {
                minWidth: '230px'
            }
        }
    ];

    const formatDateTime = (timestamp) => {
        return moment(timestamp).tz(moment.tz.guess()).format('DD MMMM YYYY hh:mm A');
    }

    const progressComponent = (
        <div className={"table-loading"}>
            <Icon className={'animate-spin m-auto text-[55px] text-[#ff6600]'} icon={'mingcute:loading-line'} />
        </div>
    );

    const LineItem = ({item}) => {
        return (<div className={'p-2 border-2 border-solid rounded leading-5'}>
            <h4 className={'text-md font-semibold mb-2'}>{item.product_id} <span className={'float-right'}>{item.quantity}x</span></h4>
            <p className={"mb-2 text-gray-500"}>{item.product_title}</p>
            <p className={'font-semibold'}>{item.currency_code?item.currency_code:'USD'} {item.price}</p>
        </div>)
    }

    const ExpandableComponent = (row) => {
        return (<div>
            <h4 className={'text-md font-semibold mb-4'}>Line Items</h4>
            <div className={"w-full grid grid-cols-4 gap-4"}>
                {
                    row.line_items.map((item, index) => (
                        <LineItem key={index} item={item} />
                    ))
                }
            </div>
        </div>)
    }

    return (
        <div className={"p-4"}>
          <DataTable
                    title={"Awaiting Shipment"}
                    checkbox={true}
                    checkboxValueSelector={'id'}
                    selectedCheckboxes={(checkboxes) => {
                        console.log('checkboxes',checkboxes);
                    }}
                    columns={columns}
                    data={data}
                    totalData={totalData}
                    progressPending={loading}
                    progressComponent={progressComponent}
                    defaultPageSize={pageSize}
                    pageSizeOptions={[10, 20, 50, 100, 500]}
                    highlightRowOnHover={true}

                    exportable={true}
                    columnsVisibility={true}

                    expandable={true}
                    expandableCondition={(row) => row.line_items.length > 0}
                    expandableComponent={ExpandableComponent}

                    overflowXScrollOnTop={true}

                    search={search}
                    searchPlaceholder={"Search Orders..."}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    totalPages={totalPages}
                    orderBy={orderBy}
                    sortBy={sortBy}

                    setSearch={setSearch}
                    setPageSize={setPageSize}
                    setPageNumber={setPageNumber}
                    setOrderBy={setOrderBy}
                    setSortBy={setSortBy}
                />
        </div>
    )
}

export default AwaitingShipment;



