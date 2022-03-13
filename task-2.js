function isObject(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

function isNotEmptyString(path) {
  return typeof path === "string" && path;
}

function lookup(obj, path) {
  if (!isObject(obj) || !isNotEmptyString(path)) {
    throw Error("Object and/or path are not valid");
  }

  return path.split(".").reduce((prev, curr) => {
    if (!isObject(prev)) throw Error("Invalid path");
    return prev[curr];
  }, obj);
}
