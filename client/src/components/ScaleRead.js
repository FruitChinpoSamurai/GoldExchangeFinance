const scaleRead = async () => {
    // let usbVendorId = 0x1A86;
// Prompt user to select any serial port.
const port = await navigator.serial.requestPort();

// Wait for the serial port to open.
// await port.open({ baudRate: 9600 });
while (port.readable) {
    const textDecoder = new TextDecoderStream();
const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
const reader = textDecoder.readable.getReader();

// Listen to data coming from the serial device.
while (true) {
  const { value, done } = await reader.read();
  if (done) {
    // Allow the serial port to be closed later.
    reader.releaseLock();
    break;
  }
  // value is a string.
  console.log(value);
}
  
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }
        if (value) {
          console.log(value);
        }
      }
    } catch (error) {
      // TODO: Handle non-fatal read error.
    }
  }
}

const readService = { scaleRead };
export default readService;