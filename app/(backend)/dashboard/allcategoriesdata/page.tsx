import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import React from "react";
import { columns } from "./columns";
import { fetchCategories } from "@/action/fetch";
// import { getProperties } from "@/actions/propertyactions";

export default async function page() {
  const fetchedCategories = (await fetchCategories()) || [];
  return (
    <div className="lg:p-8 md:p-8 ">
      <TableHeader
        title="Categories"
        linkTitle="Create Category"
        href="/dashboard/categoryform"
        data={fetchedCategories}
        model="property"
      />
      <div className="py-8">
        <DataTable data={fetchedCategories} columns={columns} />
      </div>
    </div>
  );
}
