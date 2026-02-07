import { create } from "zustand";

type DeleteData = {
  nip: number;
  name: string;
};

type BeingDeletedType = {
  beingDeleted: DeleteData | null;
  setBeingDeleted: (data: DeleteData | null) => void;
};

export const useBeingDeleted = create<BeingDeletedType>((set) => ({
  beingDeleted: null,
  setBeingDeleted: (data: DeleteData | null) => set({ beingDeleted: data }),
}));
