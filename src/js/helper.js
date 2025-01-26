export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject( {error:`Request took too long! Timeout after ${s} second`});
      }, s * 1000);
    });
  };