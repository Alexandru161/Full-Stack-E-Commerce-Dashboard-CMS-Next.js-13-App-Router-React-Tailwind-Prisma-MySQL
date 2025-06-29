import prismadb from "@/lib/prismadb";
import {BillboardForm} from "./components/billboard-form";

interface BillboardPageProps {
  params:  Promise<{
    billboardId: string;
    storeId: string;
  }>;
}

export default async function BillboardPage({ params }: BillboardPageProps) {
  const {billboardId, storeId} = await params;

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard}/>

      </div>
    </div>
  );
};
