import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupPage({
  children
}: {
  children: React.ReactNode;
}) {
  // const { userId } = await auth();
  const userId = "user_2xZtRpwNuyiLrEwOZbMqCE3NX04";
  console.log("userId", userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });
  console.log("store", store);

  if (store) {
    redirect(`/${store.id}`)
  }

  return (
    <>
      <div>This will be a Navbar</div>
      {children}
    </>
  );
};

