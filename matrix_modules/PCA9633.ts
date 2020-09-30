namespace PCA9633{

    const PCA9633_ADDRESS = 0x62

    const PCA9633_MODE1 = 0x00
    const PCA9633_MODE2 = 0x01

    const PCA9633_LED0 = 0x02
    const PCA9633_LED1 = 0x03
    const PCA9633_LED2 = 0x04
    const PCA9633_LED3 = 0x05

    const PCA9633_LEDOUT = 0x08


    export class MotorPWM {

        pending: boolean;
        duty0: number; // pwm duty1 of motor
        duty1: number; // pwm duty2 of motor
        duty2: number; // pwm duty3 of motor
        duty3: number; // pwm duty4 of motor    

        
        /**
         *Set PWM to PCA9633
        * @param channel [0-3] choose PWM channel; eg: 0, 1
        * @param duty [0-255] pulse of servo; eg: 1, 2, 4
        */
        setPWM(channel: number, duty: number): void {

            switch (channel) {
                case 0:
                    this.duty0 = duty;
                    break;
                case 1:
                    this.duty1 = duty;
                    break;
                case 2:
                    this.duty2 = duty;
                    break;
                case 3:
                    this.duty3 = duty;
                    break;
            }

            if (this.pending){
                
            }
            
            else {
                this.go();
            }
            
        }

        wait(): void{

            this.pending = true;
        }

        go(): void {

            i2cwrite(PCA9633_ADDRESS, PCA9633_LED0, this.duty0);
            i2cwrite(PCA9633_ADDRESS, PCA9633_LED1, this.duty1);
            i2cwrite(PCA9633_ADDRESS, PCA9633_LED2, this.duty2);
            i2cwrite(PCA9633_ADDRESS, PCA9633_LED3, this.duty3);

            this.pending = false;
        }
    }

    function i2cwrite(addr: number, reg: number, value: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }   

    export function init(): MotorPWM {

        //Turn On All LED Output
        i2cwrite(PCA9633_ADDRESS, PCA9633_MODE1, 0x80);

        //Set Output in Push-pull Mode
        i2cwrite(PCA9633_ADDRESS, PCA9633_MODE2, 0x04);

        //Set Output in Individual Mode 
        i2cwrite(PCA9633_ADDRESS, PCA9633_LEDOUT, 0xAA);

        let motorpwm = new MotorPWM;

        motorpwm.duty0 = 0;
        motorpwm.duty1 = 0;
        motorpwm.duty2 = 0;
        motorpwm.duty3 = 0;
        motorpwm.pending = false;

        return motorpwm;
    }
}