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
