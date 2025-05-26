import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      Active Store: {store?.name}
    </div>
  );
};

export default DashboardPage;