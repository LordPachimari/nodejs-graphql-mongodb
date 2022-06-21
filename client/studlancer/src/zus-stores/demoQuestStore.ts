import create from "zustand";

interface demoQuestState {
  title: string;
  firstRender: boolean;
  setTitle: (title: string) => void;
  setFirstRenderFalse: () => void;
}

export const demoQuestStore = create<demoQuestState>((set) => ({
  title: "",
  firstRender: true,
  setTitle: (title: string) => set((state) => ({ title: title })),
  setFirstRenderFalse: () => set((state) => ({ firstRender: false })),
}));
