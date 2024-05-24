"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ModalConfirmation({ onConfirm, onCancel }) {
  const [openModal, setOpenModal] = useState(true);

  const handleConfirm = () => {
    onConfirm(); // Panggil fungsi onConfirm yang diberikan oleh prop
    setOpenModal(false); // Tutup modal setelah mengonfirmasi
  };

  const handleCancel = () => {
    onCancel(); // Panggil fungsi onCancel yang diberikan oleh prop
    setOpenModal(false); // Tutup modal jika dibatalkan
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={handleCancel} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirm}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={handleCancel}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
