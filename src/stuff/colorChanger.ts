function getColorPoint(): number {
  return Math.floor(Math.random() * 0xff);
}

function interpolate(value: number, dest: number, percent: number): number {
  return value * (1 - percent) + dest * percent;
}

function getElementColor(elem: HTMLElement) {
  const colorStr = elem.style.color;
  const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;

  const [_, r, g, b] = colorStr.match(regex) as string[];

  return [Number(r), Number(g), Number(b)];
}

function colorArrayToString([r, g, b]: [number, number, number]) {
  return `rgb(${r},${g},${b})`;
}

function run() {
  const colorChangeTimeout = 500;
  let interpolateInterval: number | null = null;

  const colorTransition = () => {
    if (interpolateInterval !== null) {
      clearInterval(interpolateInterval);
    }

    const elem = document.getElementById("greeting");

    if (elem === null) return;

    const [origR, origG, origB] = getElementColor(elem);
    const [destR, destG, destB] = [
      getColorPoint(),
      getColorPoint(),
      getColorPoint(),
    ];

    const percentInc = 0.01;
    let percent = 0;

    interpolateInterval = setInterval(() => {
      percent += percentInc;
      if (percent > 100) {
        percent = 100;
      }

      const newColor: [number, number, number] = [
        Math.floor(interpolate(origR, destR, percent)),
        Math.floor(interpolate(origG, destG, percent)),
        Math.floor(interpolate(origB, destB, percent)),
      ];

      elem.style.color = colorArrayToString(newColor);
      // console.log(colorArrayToString(newColor));
    }, colorChangeTimeout * percentInc);
  };

  colorTransition();
  setInterval(colorTransition, colorChangeTimeout);
}

run();
