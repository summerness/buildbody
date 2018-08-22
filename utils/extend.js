module.exports = function (r) {
  return ([].slice.call(arguments, 1) || []).forEach(function (c) {
    if (c) for (var i in c) r[i] = c[i];
  }), r;
};