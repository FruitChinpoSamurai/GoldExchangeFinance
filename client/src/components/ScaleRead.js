class LineBreakTransformer {
  constructor() {
    this.container = '';
  }

  transform(chunk, controller) {
    this.container += chunk;
    const lines = this.container.split('\r\n');
    this.container = lines.pop();
    lines.forEach(line => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.container);
  }
}

const scaleRead = async (setScaleReading) => {
    // let usbVendorId = 0x1A86;
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 2400, dataBits: 7, stopBits: 1, parity: `even`, flowControl: `none` });
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer())).getReader();
  // let textContent = '';
  while (true) {
    const { value, done } = await reader.read();
    if (value) {
      // textContent += value + '\n';
      // console.log(value);
      const regexCheck = /\d+.\d+/;
      const cleaned_value = Math.round(value.match(regexCheck)[0] * 100) / 100;
      setScaleReading(cleaned_value);
    }
    if (done) {
      reader.releaseLock();
      break;
    }
  }
  

  const textEncoder = new TextEncoderStream();
  const writer = textEncoder.writable.getWriter();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  reader.cancel();
  await readableStreamClosed.catch(() => { /* Ignore the error */ });
  writer.close();
  await writableStreamClosed;
  await port.close();
}

const readService = { scaleRead };
export default readService;