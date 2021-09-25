export interface Todo {
    id?: number;
    label: string;
    description: string;
    category: string;
    done: boolean;
    panelState?: boolean;
  };
