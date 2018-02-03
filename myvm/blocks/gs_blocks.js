/* use:
 * @example:
 * const GsBlocks = require('../../myvm/blocks/gs_blocks');
 * GsBlocks.blockCallBack('gs_light_ultrasonic', args, util,false);
 *
 * mySelf blocks ,event for vm.
 * 1.blocks
 * 2.boxList
 * 3.vm /blocks/**
 * 4.callBack event
 *
 * use:
 * 1. /src/blocks/*
 *
 *
 */

class GsBlocks {
    constructor() {
        this.CallBack = undefined;
        this.actionflag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    setCallBack(back) {
        this.CallBack = back;
    }

    /**
     * 主要监听开始事件：
     * @param opcode
     * @param isWait
     * @return {Promise.<number>}
     */
    blockClick(opcode, isWait) {
        if (this.delayEvent(6, 300)) {
            return new Promise((resolve, reject) => {
                    resolve (-4);
             });
        }
        if (!this.CallBack) {
            return new Promise((resolve, reject) => {
                    resolve (1);
            });
        }
        //not await
        if (!isWait) {
            if (this.CallBack) {
                if (opcode === 'gs_event_whenflagclicked' || opcode === 'gs_event_whenthisspriteclicked') {
                    this.CallBack(opcode, null, isWait);
                }
            }
            return new Promise((resolve, reject) => {
                    resolve (1);
            });
        }
        // await:
        if (this.CallBack) {
            if (opcode === 'gs_event_whenflagclicked' || opcode === 'gs_event_whenthisspriteclicked') {
            } else {
                opcode = 'other';
            }
            return new Promise((resolve, reject) => {
                (this.CallBack(opcode, null, isWait)).then(function (content) {
                    resolve(content);
                });
            });
        }
        return new Promise((resolve, reject) => {
                resolve (1);
        });
    }

    /**
     * 主要处理每一个模块的功能
     * @param type
     * @param args
     * @param util
     * @param isWait
     * @return {*}
     */
    blockCallBack(type, args, util, isWait) {
        try {
            if (this.CallBack) {
                if (isWait) {
                    return new Promise((resolve, reject) => {
                        (this.CallBack(type, args, isWait)).then(function (content) {
                            resolve(content);
                        });
                    });
                }
                else {
                    this.CallBack(type, args, isWait);
                    return 1;
                }
            }
        } catch (error) {
            console.error(error);
            return -110;
        }
        return 0;
    }

    wait(time) {
        return new Promise((a, b) => {
            setTimeout(() => {
                a();
            }, time);
        });
    }

    delayEvent(index, millisec) {
        if (this.actionflag[index] === 1) return true;
        this.actionflag[index] = 1;
        setTimeout(() => {
            this.actionflag[index] = 0;
        }, millisec);
        return false;
    }
}

module.exports = new GsBlocks();
