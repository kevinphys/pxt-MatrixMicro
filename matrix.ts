enum D_port{
    D1 = 0,
    D2 = 1
  }
enum M_port{
    M1 = 0,
    M2 = 1
}
enum RC_port{
    RC1 = 0,
    RC2 = 1
}
enum A_port{
    A1 = 0,
    A2 = 1
}
enum LED{
    RGB1 = 0,
    RGB2 = 1
}
enum Animal{
    Timon = 0,
    Pumbaa = 1
}



//% weight=0 color=#0066CC icon="\uf2db" block="Matrix"
namespace Matrix{

    function Init():void{

        pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P11, PinPullMode.PullUp)

        pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)   

        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, 0)
        
        dcmotor.setPWM(0, 0)
        dcmotor.setPWM(1, 0)
        dcmotor.setPWM(2, 0)
        dcmotor.setPWM(3, 0)

        defl.setPixelColor(0, 0x000000)
        defl.setPixelColor(1, 0x000000)
        defl.show()
    }

    let defl = WS2812B.create(DigitalPin.P8, 2, RGB_MODE.RGB)
    let dcmotor = PCA9633.init()
    Init()

    /**
     *Read data from D1 or D2
     *@param pin [0-1] choose D1 or D2; eg: 0, 1
    */
    //% block=ReadPin block="Read logic from |%pin|"
    //% weight=98 %blockID="Matrix_Dread"
    export function dread(pin: D_port): boolean{
        let Dpin = 0

        if (pin) {
            Dpin = pins.digitalReadPin(DigitalPin.P12)
        }
        else {
            Dpin = pins.digitalReadPin(DigitalPin.P14)
        }

        if (Dpin) {
            return false
        }
        else {
            return true
        }
    }

    /**
     *DC Motor
     *@param ch [0-1] choose M1 or M2; eg: 0, 1
     *@param sp [-100-100] set motor speed; eg: 0, -90
    */
    //%block="DC Motor |%ch| Speed |%sp|"
    //%weight=93 %blockID="Maxrix_Motor"
    //% sp.min=-100 sp.max=100
    export function motor(ch: M_port, sp: number): void{
        
        let pwm = pins.map(Math.abs(sp), 0, 100, 0, 255)

        if (sp == 0){
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
        else {
            pins.digitalWritePin(DigitalPin.P16, 1)
        }

        if (ch) {
            if (sp > 0) {
                dcmotor.setPWM(3, 0)
                dcmotor.setPWM(2, pwm)
            }
            else {
                dcmotor.setPWM(2, 0)
                dcmotor.setPWM(3, pwm)
            } 
        }
        else {
            if (sp > 0) {
                dcmotor.setPWM(1, 0)
                dcmotor.setPWM(0, pwm)
            }
            else {
                dcmotor.setPWM(0, 0)
                dcmotor.setPWM(1, pwm)
            }

        }
    }


    /**
     *Set RC Servo Angle
     *@param port [0-1] choose RC1 or RC2; eg: 0, 1
    */
    //%block="RC Servo |%port| Angle |%angle|"
    //%weight=95 %blockID="Matrix_Servo"
    //% angle.min=0 angle.max=180
    export function servo(port: RC_port, angle: number): void{

        if (port) {
            pins.servoWritePin(AnalogPin.P2, angle)
        }
        else {
            pins.servoWritePin(AnalogPin.P13, angle)
        }

    }

    /**
     *Release All Servo Motor
    */
    //%block="RC Servo Release"
    //%weight=94 %blockID="Matrix Servo Release"
    export function servo_release(): void{

        control.waitMicros(150000)

        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)

        control.waitMicros(500000)

    }

    /**
     *Read distance from Ultrasonic Sensor
     *@param port [0-1] choose D1 or D2; eg: 0, 1
    */
    //%block="Ultrasonic Sensor |%port|"
    //%weight=97 %blockID="Matrix_Ultrasonic"
    export function Ultrasonic(port: D_port): number{

        if (port) {
            return (SR04.distance(DigitalPin.P12, DigitalPin.P15))
        }
        else {
            return (SR04.distance(DigitalPin.P14, DigitalPin.P1))
        }

    }

    /**
     *Read Analog Port
     *@param ch [0-1] choose A1 or A2; eg: 0, 1
    */
    //%block="Read data from |%ch|"
    //%weight=96 %blockID="Matrix_ADC"
    export function ADC(ch: A_port): number{

        let data = 0

        if (ch) {
            data = ADS1015.readPin(3)
        }
        else {
            data = ADS1015.readPin(1)
        }
        
        return (Math.round(pins.map(data, -1667, 1667, -1023, 1023)))

    }

    /**
     *Set Matrix LED RGB
     *@param led [0-1] set the displayed LED; eg: 0,1
     *@param r [0-255] set LED Red brightness; eg: 0,225
     *@param g [0-255] set LED Green brightness; eg: 0,225
     *@param b [0-255] set LED Blue brightness; eg: 0,225
    */
    //%block="Matrix LED%led R%r G%g B%b"
    //%weight=99 %blockID="Matrix_RGB"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    export function LED(led: LED, r: number, g: number, b: number): void{
        
        let rgb = r * 256 * 256 + g * 256 + b
        
        defl.setPixelColor(led, rgb)
        defl.show()

        control.waitMicros(500)
    }
}


//% weight=2 color=#FFBA84 icon="\uf8de" block="Hakuna"
namespace Hakuna{
    function Init():void{
	//Do nothing
	}
    Init()

	/**
	*It's problem free
	*/
	//%block="What a wonderful phrase"
	//%weight=99 %blockID="Problem_free"
	//% sp.min=-100 sp.max=100
    export function phrase(): void{
	}


}
