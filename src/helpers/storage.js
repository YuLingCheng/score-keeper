/** Read from the local storage */
const readStorage = (keyName) => {
  if (typeof Storage !== "undefined") {
    return localStorage.getItem(`score-keeper::${keyName}`);
  } else {
    console.warn("Unable to read from localStorage. localStorage not defined");
    return null;
  }
};

export function readScoreFromStorage(keyName) {
  const storage = readStorage(keyName);
  try {
    const score = JSON.parse(storage);
    return score;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

/** Write to the local storage */
const writeStorage = (keyName, value) => {
  if (typeof Storage !== "undefined") {
    try {
      localStorage.setItem(`score-keeper::${keyName}`, value);
    } catch (err) {
      console.warn("Unable to write into localStorage. localStorage is full");
    }
  } else
    console.warn("Unable to write into localStorage. localStorage not defined");
};

export function saveScoreToStorage(keyName, score) {
  writeStorage(keyName, JSON.stringify(score));
}
