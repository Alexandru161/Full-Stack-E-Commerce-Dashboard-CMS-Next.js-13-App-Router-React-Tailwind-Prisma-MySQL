import {format} from "date-fns";
import { BillboardClient } from "./components/client";
import prismadb from "@/lib/prismadb";


interface BillboardsPageProps {
  params: Promise<{ storeId: string }>
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const {storeId} = await params;

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId:storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  });


  const formatedBillboards = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    imageUrl: billboard.imageUrl,
    createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedBillboards} />
      </div>
    </div>
  );
}
