"use client";

// import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Category } from "@prisma/client";

const trimTitle = (title: string, maxLength: number = 45) => {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength) + "...";
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryIcon",
    header: "Category Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="categoryIcon" />,
  },
  {
    accessorKey: "categoryTitle",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.getValue("categoryTitle") as string;
      return <span title={title}>{trimTitle(title)}</span>;
    },
  },
  // {
  //   accessorKey: "propertyType",
  //   header: ({ column }) => (
  //     <SortableColumn column={column} title="Property Type" />
  //   ),
  //   cell: ({ row }) => {
  //     const title = row.getValue("CategoryType") as string;
  //     return <span title={title}>{trimTitle(title)}</span>;
  //   },
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date published",
  //   cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <ActionColumn
          row={row}
          model="property"
          editEndpoint={`/dashboard/product/update/${data.id}`}
          id={data.id}
        />
      );
    },
  },
];
