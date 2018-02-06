const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');

const GsBlocks = require('../../../myvm/blocks/gs_blocks');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';

/**
 * Host for the Robobloq-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3Gs1Blocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

    }

    _initSoundParam () {
        return [
            {
                text: formatMessage({
                    id: 'gs1.toneMenu.c2',
                    default: 'C2',
                    description: ''
                }),
                value: 999
            },
            {
                text: formatMessage({
                    id: 'gs1.toneMenu.d2',
                    default: 'D2',
                    description: ''
                }),
                value: 85
            },
        ];
    }

    _initSecondParam () {
        return [
            {
                text: formatMessage({
                    id: 'gs1.turationMenu.half',
                    default: 'Half',
                    description: ''
                }),
                value: 500
            },
            {
                text: formatMessage({
                    id: 'gs1.turationMenu.quarter',
                    default: 'Quarter',
                    description: ''
                }),
                value: 1000
            },
        ];
    }

    _initDirectionParam () {
        return [
            {
                text: formatMessage({
                    id: 'gs1.directionMenu.forword',
                    default: 'forword',
                    description: ''
                }),
                value: 1
            },
            {
                text: formatMessage({
                    id: 'gs1.directionMenu.backword',
                    default: 'backword',
                    description: ''
                }),
                value: 2
            },
            {
                text: formatMessage({
                    id: 'gs1.directionMenu.turnLeft',
                    default: 'turn left',
                    description: ''
                }),
                value: 3
            },
            {
                text: formatMessage({
                    id: 'gs1.directionMenu.turnRight',
                    default: 'turn right',
                    description: ''
                }),
                value: 4
            },
        ];
    }

    _initMotorParam() {
        return [
            {
                text: formatMessage({
                    id: 'gs1.motorMenu.m1',
                    default: 'M1',
                    description: '',
                }),
                value: 1,
            },
            {
                text: formatMessage({
                    id: 'gs1.motorMenu.m2',
                    default: 'M2',
                    description: '',
                }),
                value: 2,
            }
        ];
    }

    _initWheelParam() {
        return [
            {
                text: formatMessage({
                    id: 'gs1.wheelMenu.m1',
                    default: 'M1',
                    description: '',
                }),
                value: 1,
            },
            {
                text: formatMessage({
                    id: 'gs1.wheelMenu.m2',
                    default: 'M2',
                    description: '',
                }),
                value: 2,
            },
            {
                text: formatMessage({
                    id: 'gs1.wheelMenu.two',
                    default: 'Two',
                    description: '',
                }),
                value: 0,
            }
        ];
    }

    _initPortParam() {
        return [
            {
                text: formatMessage({
                    id: 'gs1.portMenu.v1',
                    default: '1',
                    description: '',
                }),
                value: 1,
            },
            {
                text: formatMessage({
                    id: 'gs1.portMenu.v8',
                    default: '8',
                    description: '',
                }),
                value: 8,
            },
            {
                text: formatMessage({
                    id: 'gs1.portMenu.v4',
                    default: '4',
                    description: '',
                }),
                value: 4,
            }
        ];
    }

    _initLightParam() {
        return [
            {
                text: formatMessage({
                    id: 'gs1.lightMenu.double',
                    default: 'double',
                    description: '',
                }),
                value: 2,
            },
            {
                text: formatMessage({
                    id: 'gs1.lightMenu.left',
                    default: 'left',
                    description: '',
                }),
                value: 0,
            },
            {
                text: formatMessage({
                    id: 'gs1.lightMenu.right',
                    default: 'right',
                    description: '',
                }),
                value: 1,
            }
        ];
    }

    _initRgbParam() {
        return [
            {
                text: formatMessage({
                    id: 'gs1.rgbMenu.red',
                    default: 'red',
                    description: '',
                }),
                value: '#ff0000',
            },
            {
                text: formatMessage({
                    id: 'gs1.rgbMenu.yellow',
                    default: 'yellow',
                    description: '',
                }),
                value: '#fffd14',
            },
            {
                text: formatMessage({
                    id: 'gs1.rgbMenu.green',
                    default: 'green',
                    description: '',
                }),
                value: '#00d37b',
            },
            {
                text: formatMessage({
                    id: 'gs1.rgbMenu.turnOff',
                    default: 'turn off',
                    description: '',
                }),
                value: '#000000',
            }
        ];
    }



    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'gs1',
            name: 'Robobloq',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'motion_move',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.motion_move',
                        default: 'motor rotation left: [LEFT] right: [RIGHT]',
                        description: ''
                    }),
                    arguments: {
                        LEFT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        RIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'motion_move_2',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.motion_move_2',
                        default: 'run [DIRECTION] at speed [SPEED]',
                        description: ''
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.NUMBER,
                            menu: 'directionParam',
                            defaultValue: 1,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }

                    }
                },
                {
                    opcode: 'motion_move_3',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.motion_move_3',
                        default: 'set motor [MOTOR] [DIRECTION] at speed [SPEED]',
                        description: ''
                    }),
                    arguments: {
                        MOTOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorParam',
                            defaultValue: 1,
                        },
                        DIRECTION: {
                            type: ArgumentType.NUMBER,
                            menu: 'directionParam',
                            defaultValue: 1,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        }
                    }
                },
                {
                    opcode: 'motion_steering_engine',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.motion_steering_engine',
                        default: 'port [PORT] steering engine [MOTOR] corner1 [CORNER1] corner2 [CORNER2]',
                        description: ''
                    }),
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'portParam',
                            defaultValue: 1,
                        },
                        MOTOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'wheelParam',
                            defaultValue: 1,
                        },
                        CORNER1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        CORNER2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        }

                    }

                },
                {
                    opcode: 'light_change',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.light_change',
                        default: 'set [LIGHT] light in LED panel to color [RGB]',
                        description: ''
                    }),
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.NUMBER,
                            menu: 'lightParam',
                            defaultValue: 2,
                        },
                        RGB: {
                            type: ArgumentType.STRING,
                            menu: 'rgbParam',
                            defaultValue: '#ff0000',
                        }
                    }
                },
                {
                    opcode: 'light_change_2',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.light_change_2',
                        default: 'set [LIGHT] light in LED panel red [RED] green [GREEN] blue [BLUE]',
                        description: '',
                    }),
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.NUMBER,
                            menu: 'lightParam',
                            defaultValue: 2,
                        },
                        RED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 205,
                        },
                        GREEN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 92,
                        },
                        BLUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 92,
                        }
                    }
                },
                {
                    opcode: 'light_change_3',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.light_change_3',
                        default: 'set [LIGHT] light in LED panel to color [COLOR]',
                        description: '',
                    }),
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.NUMBER,
                            menu: 'lightParam',
                            defaultValue: 2,
                        },
                        COLOR: {
                            type: ArgumentType.COLOR,
                        }
                    }
                },
                {
                    opcode: 'playNoteForBeats',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'gs1.playNoteForBeats',
                        default: 'playAA note on [SOUND] beat [SECOND] ms',
                        description: ''
                    }),
                    arguments: {
                        SOUND: {
                            type: ArgumentType.NUMBER,
                            menu: 'soundParam',
                            defaultValue: 999
                        },
                        SECOND: {
                            type: ArgumentType.NUMBER,
                            menu: 'secondParam',
                            defaultValue: 500
                        }
                    }
                }
            ],
            menus: {
                soundParam: this._initSoundParam(),
                secondParam: this._initSecondParam(),
                directionParam: this._initDirectionParam(),
                motorParam: this._initMotorParam(),
                portParam: this._initPortParam(),
                wheelParam: this._initWheelParam(),
                lightParam: this._initLightParam(),
                rgbParam: this._initRgbParam(),
            }
        };
    }

    playNoteForBeats (args, util) {
       console.log('playNoteForBeats----args:')
       console.log(args);
       console.log(util);
       GsBlocks.blockCallBack('gs_sound_play', args, util, false);
    }

    motion_move (args, util){
        GsBlocks.blockCallBack('gs_motion_move', args, util,false);
            return new Promise(resolve => {
                setTimeout(() => {
                resolve();
            }, 100);
        });
    }

    motion_move_2(args, util) {
        GsBlocks.blockCallBack('gs_motion_move_2', args, util,false);
            return new Promise(resolve => {
                setTimeout(() => {
                resolve();
            }, 100);
        });
    }

    motion_move_3(args, util) {
        GsBlocks.blockCallBack('gs_motion_move_3', args, util,false);
            return new Promise(resolve => {
                setTimeout(() => {
                resolve();
            }, 100);
        });
    }

    motion_steering_engine(args, util) {
        GsBlocks.blockCallBack('gs_motion_steering_engine', args, util,false);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
    }

    light_change(args, util) {
        GsBlocks.blockCallBack('gs_light_change', args, util,false);
            return new Promise(resolve => {
                setTimeout(() => {
                resolve();
            }, 300);
        });
    }

    light_change_2(args, util) {
        GsBlocks.blockCallBack('gs_light_change_2', args, util,false);
            return new Promise(resolve => {
                setTimeout(() => {
                resolve();
            }, 300);
        });
    }

    light_change_3(args, util) {
       console.log(args);
       console.log(util);
    }

}

module.exports = Scratch3Gs1Blocks
