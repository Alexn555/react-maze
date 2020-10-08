
const ACTIVE = true;

function log(str) {
  if (!ACTIVE || typeof str === undefined) return;
  console.log(str);
}

function warn(str) {
  if (!ACTIVE || typeof str === undefined) return;
  console.warn(str);
}

exports.log = log;
exports.warn = warn;