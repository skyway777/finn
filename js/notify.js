import playSound from 'play-sound'



export const NotifyType = {
  'NOTIFY_WARNING': {
    sound: 'blabla.mp3',
    color: ''
  },
  'NOTIFY_COMPLETE': {
    sound: 'champ.mp3',
    color: '\x1b[41m' //RED. We need to see this message! 
  }
}

export default class {
  send(type, message) {
    if (!NotifyType.hasOwnProperty(type)) {
      return
    }

    let player = playSound();
    player.play(`./sound/${NotifyType[type].sound}`)

    console.log(NotifyType[type].color, message)
  }
}