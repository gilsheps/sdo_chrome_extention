function Mutex() {
  let current = Promise.resolve();
  this.lock = () => {
    let _resolve;
    const p = new Promise((resolve) => {
      _resolve = () => resolve();
    });
    // Caller gets a promise that resolves when the current outstanding
    // lock resolves
    const rv = current.then(() => _resolve);
    // Don't allow the next request until the new promise is done
    current = p;
    // Return the new promise
    return rv;
  };
}

//V3 - TALK TO SERVICE WORKER ON UNAVILABLE APIS

if (!chrome.storage)
  chrome.storage = {
    sync: {
      get: (o, n) => {
        chrome.runtime.sendMessage({ type: "STORAGE_GET", data: o }, (d) =>
          n(d)
        );
      },
      set: (o, n) => {
        chrome.runtime.sendMessage({ type: "STORAGE_SET", data: o }, (d) =>
          n(d)
        );
      },
    },
  };

if (!chrome.windows)
  chrome.windows = {
    create: (o, n) =>
      chrome.runtime.sendMessage({ type: "CREATE_WINDOW", data: o }, (d) =>
        n(d)
      ),
    update: (o, o1, n) =>
      chrome.runtime.sendMessage(
        { type: "UPDATE_WINDOW", data: [o, o1] },
        (d) => n(d)
      ),
  };

//V3 - TALK TO SERVICE WORKER ON UNAVILABLE APIS

class Preferences {
  static async getSelectedHost(value) {
    return new Promise((resolve, reject) =>
      chrome.storage.local.get({ selectionHost: "" }, (value) =>
        resolve(value.selectionHost)
      )
    );
  }
  static async saveSelectedHost(selectionHost) {
    return new Promise(async (resolve, reject) => {
      const host = await Preferences.getSelectedHost().catch(reject);
      if (selectionHost != host)
        chrome.storage.local.set({ selectionHost: selectionHost }, resolve);
      else resolve();
    });
  }
}
