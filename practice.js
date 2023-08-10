function start() {
  let x = "야호";
  const closure = function () {
    return console.log(x);
  };
  return closure;
}

const xPrint = start();

xPrint();
