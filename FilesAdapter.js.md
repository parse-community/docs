##### FilesAdapter.js

---

Interface for allowing the underlying file storage to be changed

Adapter classes must implement the following functions:
* createFile(config, filename, data)
* deleteFile(config, filename)
* getFileData(config, filename)
* getFileLocation(config, filename)

See [[GridStoreAdapter.js|GridStoreAdapter.js]] for the default implementation

---
