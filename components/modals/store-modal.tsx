"use client";

import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axio from "axios";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import toast from "react-hot-toast";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const formSchema = z.object({
  name: z.string().min(1, "Store name is required"),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{

      setLoading(true);
      
      const response = await axio.post("/api/stores", values);

      window.location.assign(`/${response.data.id}`);

    } catch (error) {
      toast.error("Something went wrong while creating your store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Store Settings"
      description="Manage your store settings and preferences."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="1337" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
                )}
              />
            
              <div className="pt-3 space-x-2 flex items-center justify-end">
                <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose}>Cancer</Button>
                <Button disabled={loading} type="submit">Continue</Button>

              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
