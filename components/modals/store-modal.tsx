"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = ({} = {}) => {
  const storeModla = useStoreModal();
  return (
    <Modal
      title="Store Settings"
      description="Manage your store settings and preferences."
      isOpen={storeModla.isOpen}
      onClose={storeModla.onClose}
    >
      Feature nigga
    </Modal>
  );
};
