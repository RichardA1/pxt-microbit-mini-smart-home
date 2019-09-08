
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum SwitchState {
    //% block="ON"
    on,
    //% block="OFF"
    off
}

enum DoorState {
    //% block="ON"
    high,
    //% block="OFF"
    low
}

enum LightRoom {
    //% block="Deck"
    deck,
    //% block="Attic"
    attic,
    //% block="Bedroom"
    bedroom,
    //% block="Dining Room"
    dining,
    //% block="Entrance"
    entrance
}

enum LightColor {
    //% block="Red"
    Red,
    //% block="Green"
    Green,
    //% block="Blue"
    Blue,
    //% block="Purple"
    Purple,
    //% block="White"
    White
}

let Deck_Light_State = "off"
let Attic_Light_State = "off"
let Bed_Room_Light_State = "off"
let Dining_Room_Light_State = "off"
let Entrance_Light_State = "off"
let Party_Mode_State: boolean = false
let Door_Open_State: boolean = false
let PIR_State: boolean = false
let Fan_State: boolean = false
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)

/**
 * SmartHomeOutput blocks
 */
//% weight=100 color=#0fbc11 icon="\uf015" block="Smart Home Output"
namespace smarthomeoutput {
    let LEDs: neopixel.Strip = null
    LEDs = neopixel.create(DigitalPin.P16, 5, NeoPixelMode.RGB)

    /**
     * Use this to turn the light from a room on or off.
     * @param room "What room light to control"
     * @param state "describe parameter here"
     */
    //% block
    //% color=#f4b541
    export function Lights(room: LightRoom, state: SwitchState, color: LightColor): void {
        // Add code here
        let WhatRoom = 0
        let WhatState = ""
        let whatColor = ""
        if (state == SwitchState.on) {
            WhatState = "on"
        } else {
            WhatState = "off"
        }
        switch (room) {
            case LightRoom.deck: WhatRoom = 0;
                Deck_Light_State = WhatState
                break;
            case LightRoom.attic: WhatRoom = 1;
                Attic_Light_State = WhatState
                break;
            case LightRoom.bedroom: WhatRoom = 2;
                Bed_Room_Light_State = WhatState
                break;
            case LightRoom.dining: WhatRoom = 3;
                Dining_Room_Light_State = WhatState
                break;
            case LightRoom.entrance: WhatRoom = 4;
                Entrance_Light_State = WhatState
                break;
        }
        if (WhatState == "on") {
            //LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
            switch (color) {
                case LightColor.Red:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Red))
                    break;
                case LightColor.Green:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Green))
                    break;
                case LightColor.Blue:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Blue))
                    break;
                case LightColor.Purple:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Purple))
                    break;
                case LightColor.White:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
                    break;
            }
        } else {
            LEDs.setPixelColor(WhatRoom, neopixel.rgb(0, 0, 0))
        }
        LEDs.show()
    }

    /**
 * Blink a room light 4 times in Red, Green, Blue, Purple, or White. The light will return to whatever state it was origonaly set to after the blinking.
 * @param room "What room light to control"
 * @param color "Select the color for the blink"
 */
    //% block
    //% color=#f4b541
    export function Blink(room: LightRoom, color: LightColor): void {
        // Add code here
        let WhatRoom = 0
        let RoomLightState = ""

        switch (room) {
            case LightRoom.deck: WhatRoom = 0;
                RoomLightState = Deck_Light_State
                break;
            case LightRoom.attic: WhatRoom = 1;
                RoomLightState = Attic_Light_State
                break;
            case LightRoom.bedroom: WhatRoom = 2;
                RoomLightState = Bed_Room_Light_State
                break;
            case LightRoom.dining: WhatRoom = 3;
                RoomLightState = Dining_Room_Light_State
                break;
            case LightRoom.entrance: WhatRoom = 4;
                RoomLightState = Entrance_Light_State
                break;
        }
        for (let i = 0; i < 4; i++) {
            LEDs.setPixelColor(WhatRoom, neopixel.rgb(0, 0, 0))
            LEDs.show()
            basic.pause(500)
            switch (color) {
                case LightColor.Red:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Red))
                    break;
                case LightColor.Green:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Green))
                    break;
                case LightColor.Blue:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Blue))
                    break;
                case LightColor.Purple:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.Purple))
                    break;
                case LightColor.White:
                    LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
                    break;
            }
            LEDs.show()
            basic.pause(500)
        }
        if (RoomLightState == "off") {
            LEDs.setPixelColor(WhatRoom, neopixel.rgb(0, 0, 0));
        } else {
            LEDs.setPixelColor(WhatRoom, neopixel.colors(NeoPixelColors.White))
        }
        LEDs.show()
    }

    /**
     * Party Mode lets you start the party or end it. 
     * @param SwitchState "On or OFF"
     */
    //% block
    //% color=#f4b541
    export function Party(state: SwitchState): void {
        if (state == SwitchState.on) {
            if (!Party_Mode_State) {
                LEDs.showRainbow(1, 308)
                Party_Mode_State = true
            }
            basic.pause(500)
            LEDs.rotate(1)
            LEDs.show()
        } else {
            Party_Mode_State = false
            LEDs.clear()
            LEDs.show()
        }
    }
    /**
     * Turn all of the lights ON or OFF. 
     * @param switch describe value here, eg: ON
     */
    //% block
    //% color=#f4b541
    export function All_lights(state: SwitchState, color: LightColor): void {
        if (state == SwitchState.on) {
            for (let i = 0; i < 8; i++) {
                //LEDs.setPixelColor(i, neopixel.colors(NeoPixelColors.White));
                switch (color) {
                    case LightColor.Red:
                        LEDs.setPixelColor(i, neopixel.colors(NeoPixelColors.Red))
                        break;
                    case LightColor.Green:
                        LEDs.setPixelColor(i, neopixel.colors(NeoPixelColors.Green))
                        break;
                    case LightColor.Blue:
                        LEDs.setPixelColor(i, neopixel.colors(NeoPixelColors.Blue))
                        break;
                    case LightColor.Purple:
                        LEDs.setPixelColor(i, neopixel.colors(NeoPixelColors.Purple))
                        break;
                    case LightColor.White:
                        LEDs.setPixelColor(i, neopixel.colors(NeoPixelColors.White))
                        break;
                }

            }
            LEDs.show()
            Deck_Light_State = "on"
            Attic_Light_State = "on"
            Bed_Room_Light_State = "on"
            Dining_Room_Light_State = "on"
            Entrance_Light_State = "on"
        } else {
            LEDs.clear()
            LEDs.show()
            Deck_Light_State = "off"
            Attic_Light_State = "off"
            Bed_Room_Light_State = "off"
            Dining_Room_Light_State = "off"
            Entrance_Light_State = "off"
        }
    }

    /**
     * Party Mode lets you start the party or end it. 
     * @param room describe value here, eg: Bedroom
     */
    //% block
    export function Fan(state: SwitchState): void {
        if (state == SwitchState.on) {
            Fan_State = true
            crickit.motor1.run(100)
        } else {
            Fan_State = false
            crickit.motor1.run(0)
        }
    }

}

/**
 * SmartHomeInput blocks
 */
//% weight=100 color=#bc42f4 icon="\uf015" block="Smart Home Input"
namespace smarthomeinput {

    /**
     * If the Door is Open, this will return True.
     */
    //% blockId=door_open block="Door is Open"
    export function DoorOpen(): boolean {
        if (crickit.signal2.analogRead() < 200) {
            return false
        } else {
            return true
        }
    }

    /**
     * If the Door is closed, this will return True.
     */
    //% blockId=door_closed block="Door is Closed"
    export function DoorClosed(): boolean {
        if (crickit.signal2.analogRead() < 200) {
            return true
        } else {
            return false
        }
    }

    /**
     * Is there movement? This will return a Boolean value (true or false). When there is movement, this will be true for about 5 seconds, but it will take 12 seconds to detect new movement.
     */
    //% blockId=pir_sensor block="Something moved"
    export function Motion(): boolean {
        if (crickit.signal1.digitalRead()) {
            PIR_State = true
        } else {
            PIR_State = false
        }
        return PIR_State
    }

    /**
 * Is the party mode active? This will return a Boolean value (true or false) 
 */
    //% blockId=party_sensor block="Party Mode is on"
    export function Party(): boolean {
        return Party_Mode_State
    }

    /**
* Is the Fan turned on? This will return a Boolean value (true or false) 
*/
    //% blockId=fan_sensor block="The Fan is on"
    export function Fan(): boolean {
        return Fan_State
    }

    /**
     * If it is light outside, this will return a value of True
 */
    //% blockId=sunup block="The sun is up"
    export function SunUP(): boolean {
        if (input.lightLevel() > 4) {
            return true
        } else {
            return false
        }
    }

    /**
     * If it is dark outside, this will return a value of True
 */
    //% blockId=sundown block="The sun is down"
    export function SunDown(): boolean {
        if (input.lightLevel() > 4) {
            return false
        } else {
            return true
        }
    }

    /**
     * Is there an earthquake going on now? 
     * @param room describe value here, eg: Bedroom
     */
    //% block
    export function Earthquake(): boolean {
        if (200 < input.acceleration(Dimension.X)) {
            return true
        } else {
            return false
        }
    }

    /**
     * Use this to get the curant state of a room light. Select what room you want to know the state of and it will return "on" or "off".
     * @param room describe value here, eg: Bedroom
     */
    //% block
    //% color=#f4b541
    export function Light_State(room: LightRoom): string {
        switch (room) {
            case LightRoom.deck: return Deck_Light_State;
                break;
            case LightRoom.attic: return Attic_Light_State;
                break;
            case LightRoom.bedroom: return Bed_Room_Light_State;
                break;
            case LightRoom.dining: return Dining_Room_Light_State;
                break;
            case LightRoom.entrance: return Entrance_Light_State;
                break;
            default: return "";
                break;
        }
    }

}
