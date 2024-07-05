const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  queryDatabase: (query) => ipcRenderer.invoke('query-database', query)
});