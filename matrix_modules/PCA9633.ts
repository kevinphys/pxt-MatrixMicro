namespace PCA9633{

    const PCA9633_ADDRESS = 0x62

    const PCA9633_MODE1 = 0x00
    const PCA9633_MODE2 = 0x01

    const PCA9633_LED0 = 0x02
    const PCA9633_LED1 = 0x03
    const PCA9633_LED2 = 0x04
    const PCA9633_LED3 = 0x05

    const PCA9633_LEDOUT = 0x08


    let initialized = false

    function i2cwrite(addr: number, reg: number, value: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }   

    function initPCA9633(): void {

        //Turn On All LED Output
        i2cwrite(PCA9633_ADDRESS, PCA9633_MODE1, 0x80);

        //Set Output in Push-pull Mode
        i2cwrite(PCA9633_ADDRESS, PCA9633_MODE2, 0x04);

        //Set Output in Individual Mode 
        i2cwrite(PCA9633_ADDRESS, PCA9633_LEDOUT, 0xAA);

        initialized = true;
    }

	/**
	 *Set PWM to PCA9633
	 * @param channel [0-3] choose PWM channel; eg: 0, 1
     * @param duty [0-255] pulse of servo; eg: 1, 2, 4
	*/
    export function setPWM(channel: number, duty: number): void {

        if (!initialized) {
            initPCA9633();
        }

        switch (channel) {
            case 0:
                i2cwrite(PCA9633_ADDRESS, PCA9633_LED0, duty);
                break;
            case 1:
                i2cwrite(PCA9633_ADDRESS, PCA9633_LED1, duty);
                break;
            case 2:
                i2cwrite(PCA9633_ADDRESS, PCA9633_LED2, duty);
                break;
            case 3:
                i2cwrite(PCA9633_ADDRESS, PCA9633_LED3, duty);
                break;
        }
    }
}