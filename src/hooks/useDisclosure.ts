"use client";

import { useCallback, useState } from "react";

export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return { isOpen, onOpen, onToggle, onClose };
}
