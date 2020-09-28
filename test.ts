function Analog_Test () {
    basic.showLeds(`
        . # # # .
        # . . . #
        # # # # #
        # . . . #
        # . . . #
        `)
    basic.showString("A1:")
    basic.showNumber(Math.ceil(Matrix.ADC(A_port.A1) / 100))
    basic.showString("A2:")
    basic.showNumber(Math.ceil(Matrix.ADC(A_port.A2) / 100))
    Matrix.servo(RC_port.RC1, 180)
    Matrix.servo(RC_port.RC2, 0)
    basic.pause(100)
    basic.showString("A1:")
    basic.showNumber(Math.ceil(Matrix.ADC(A_port.A1) / 100))
    basic.showString("A2:")
    basic.showNumber(Math.ceil(Matrix.ADC(A_port.A2) / 100))
}
function Motor_Test () {
    basic.showLeds(`
        # . . . #
        # # . # #
        # . # . #
        # . . . #
        # . . . #
        `)
    Matrix.motor(M_port.M1, 100)
    Matrix.motor(M_port.M2, 100)
    basic.pause(500)
    Matrix.motor(M_port.M1, -100)
    Matrix.motor(M_port.M2, -100)
    basic.pause(500)
    Matrix.motor(M_port.M1, 0)
    Matrix.motor(M_port.M2, 0)
    basic.pause(100)
}
function Ultrasonic_Test () {
    basic.showLeds(`
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        . # # # .
        `)
    basic.pause(500)
    basic.showLeds(`
        . . # # #
        . # # . .
        # . # # #
        . # . . #
        . . # # #
        `)
    while (Matrix.Ultrasonic(D_port.D1) > 5) {

    }
}
function RGBLED_Test () {
    basic.showLeds(`
        # # # . .
        # . . # .
        # # # . .
        # . # . .
        # . . # .
        `)
    for (let index = 0; index <= 255; index++) {
        Matrix.LED(
        LED.RGB1,
        index,
        255 - index,
        0
        )
        Matrix.LED(
        LED.RGB2,
        index,
        255 - index,
        0
        )
        basic.pause(5)
    }
    for (let index = 0; index <= 255; index++) {
        Matrix.LED(
        LED.RGB1,
        255 - index,
        0,
        index
        )
        Matrix.LED(
        LED.RGB2,
        255 - index,
        0,
        index
        )
        basic.pause(5)
    }
    for (let index = 0; index <= 255; index++) {
        Matrix.LED(
        LED.RGB1,
        0,
        index,
        255 - index
        )
        Matrix.LED(
        LED.RGB2,
        0,
        index,
        255 - index
        )
        basic.pause(5)
    }
}
function Servo_Test () {
    basic.showLeds(`
        . # # # .
        # . . . .
        . # # # .
        . . . . #
        . # # # .
        `)
    Matrix.servo(RC_port.RC1, 90)
    Matrix.servo(RC_port.RC2, 90)
    basic.pause(500)
}
function Next () {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    while (!(Matrix.dread(D_port.D2))) {

    }
    basic.pause(500)
}
basic.showLeds(`
    # . . . #
    # # . # #
    # . # . #
    # . . . #
    # . . . #
    `)
Next()
Motor_Test()
Next()
Servo_Test()
Next()
Analog_Test()
Next()
Ultrasonic_Test()
Next()
RGBLED_Test()
Next()
basic.forever(function () {
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    Matrix.LED(
    LED.RGB1,
    0,
    0,
    0
    )
    Matrix.LED(
    LED.RGB2,
    0,
    0,
    0
    )
    basic.pause(1000)
    while (true) {
        basic.showString("RESET")
    }
})
