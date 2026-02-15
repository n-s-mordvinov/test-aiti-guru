import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "./types";
import { Cell, CellTitle, HeaderCell, HeaderCellTitle } from "../ui/Cell";

const columnHelper = createColumnHelper<Product>();

export const columns = [
  columnHelper.accessor('title', {
    header: ({ table }) => (
      <HeaderCellTitle
        title="Наименование"
        isChecked={!!(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"))}
        onChangeChecked={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: (info) => (
      <CellTitle
        title={info.getValue()}
        description={info.row.original.category}
        image={info.row.original.thumbnail}
        isChecked={info.row.getIsSelected()}
        onChangeChecked={(value) => info.row.toggleSelected(!!value)}
      />
    ),
  }),
  columnHelper.accessor('brand', {
    header: () => <HeaderCell>Вендор</HeaderCell>,
    cell: (info) => <Cell>{info.getValue() || '—'}</Cell>,
  }),
  columnHelper.accessor('sku', {
    header: () => <HeaderCell>Артикул</HeaderCell>,
    cell: (info) => <Cell>{info.getValue() || '—'}</Cell>,
    // enableSorting: false,
  }),
  columnHelper.accessor('rating', {
    header: () => <HeaderCell>Рейтинг</HeaderCell>,
    cell: (info) => <Cell>{`${info.getValue() || '—'}/5`}</Cell>,
  }),
  columnHelper.accessor('price', {
    header: () => <HeaderCell>Цена</HeaderCell>,
    cell: (info) => <Cell>{info.getValue().toFixed(2) || '—'}</Cell>,
  }),
];