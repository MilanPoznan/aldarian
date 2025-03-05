import { useState } from "react";

export function useModalNavigation(nftsLength: number) {
  const [openModal, setOpenModal] = useState(-1);

  const handleNext = () => {
    if (openModal < nftsLength - 1) setOpenModal((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (openModal > 0) setOpenModal((prev) => prev - 1);
  };

  const handleOnClose = () => {
    document.body.classList.remove("no-scroll");
    setOpenModal(-1);
  };

  const handleOpenModal = (index: number) => {
    document.body.classList.add("no-scroll");
    setOpenModal(index);
  };

  return {
    openModal,
    handleNext,
    handlePrev,
    handleOnClose,
    handleOpenModal,
  };
}
