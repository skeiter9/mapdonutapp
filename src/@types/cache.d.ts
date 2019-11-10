type callback = (err: any, value?: string) => void;

export interface cacheStore {
  getItem: (key: string, cb: callback) => void;
  setItem: (key: string, value: any, cb: callback) => void;
  removeItem: (key: string, cb: callback) => void;
  peekItem: (key: string, cb: callback) => void;
  getAll: () => void;
  clearAll: () => void;
}
