"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () =>{
  const router = useRouter();
  const params = useParams();
  return (
    <>
    <div className="flex items-center justify-between">
      <Heading
      title={`Billboards 1`}
      description="Manage your billboards"
      />
      <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Billboard
      </Button>
    </div>
    <Separator/>
    </>
  )
};