const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1
/**
 * @params {string} lrc
 * @params {function} handler
 */
export default class Lyric {
  constructor(lrc, handler = () => {}) {
    this.lrc = lrc
    this.lines = [] // 解析后的数组，每一项包含对应的歌词呵和时间
    this.handler = handler // 毁回调函数
    this.state = STATE_PAUSE // 播放状态
    this.curLineIndex = 0 // 当前歌词所造行数
    this.startStamp = 0 // 歌曲开始的时间戳

    this._initLines()
  }

  _initLines() {
    // 解析代码
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let result = timeExp.exec(line)
      if (!result) return
      const txt = line.replace(timeExp, '').trim()
      if (txt) {
        if (result[3].length === 3) {
          result[3] = result[3] / 10
        }
        this.lines.push({
          time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10, // 转化到具体毫秒的时间
          txt,
        })
      }
    }
    // 根据时间排序
    this.lines.sort((a, b) => {
      return a.time - b.time
    })
  }

  // offset 为时间进度， isSeek 标志表示用户是否手动调整进度
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return
    }
    this.state = STATE_PLAYING
    // 找到当前所在行
    this.curLineIndex = this._findCurLineIndex(offset)
    // 现在处于第 this.curLineIndex -1 行
    // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
    this._callHandler(this.curLineIndex - 1)
    // 根据时间进度判断歌曲开始时间戳
    this.startStamp = +new Date() - offset

    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer)
      // 继续播放
      this._playReset(isSeek)
    }
  }

  _findCurLineIndex(time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  _callHandler(i) {
    if (i < 0) {
      return
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i,
    })
  }

  // isSeek 标志表示用户是否手动调整进度
  _playReset(isSeek = false) {
    let line = this.lines[this.curLineIndex]
    let delay
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp)
    } else {
      // 拿到上一行歌词开始时间，算间隔
      let preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0
      delay = line.time - preTime
    }

    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++)
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this._playReset()
      }
    }, delay)
  }

  togglePlay(offset) {
    if (this.state === STATE_PLAYING) {
      this.stop()
    } else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }

  stop() {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }

  // 切换到某个时间点播放
  seek(offset) {
    this.play(offset, true)
  }
}
