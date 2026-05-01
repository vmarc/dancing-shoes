import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/core';
import { inject } from '@angular/core';

@Injectable()
export class ArduinoService {
  private readonly document = inject(DOCUMENT);


  init(): void {

    if ("serial" in navigator) {
      console.log("serial is supported");
      const serial: Serial = navigator.serial;
      console.log('serial', serial);
      serial.addEventListener("connect", (e) => {
        console.log('SERIAL connect', e);
      });
      navigator.serial.addEventListener("disconnect", (e) => {
        console.log('SERIAL disconnect', e);
      });

      console.log('SERIAL get ports');
      navigator.serial.getPorts().then((ports) => {
        console.log('SERIAL ports', ports);
      });

      try {
        serial.requestPort().then((port) => {
          console.log('SERIAL port', port);
          port.addEventListener("error", (e) => {})
        });


      } catch (error) {
        console.error("Requesting port error: " + error);
        return;
      }

    } else {
      console.error("serial is not supported")
    }

    // button.addEventListener("click", () => {
    //   const usbVendorId = 0xabcd;
    //   navigator.serial
    //     .requestPort({ filters: [{ usbVendorId }] })
    //     .then((port) => {
    //       // Connect to `port` or add it to the list of available ports.
    //     })
    //     .catch((e) => {
    //       // The user didn't select a port.
    //     });
    // });


  }


}
