const colors = [
  "#cc0099", // purple
  "#00f", // blue
  "#090", // green
  "#ff0", // yellow
  "#f90", // orange
  "#f00" // red
];

let textColor = colors[0];
document.body.style.backgroundColor = textColor;

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  render: {
    pixelArt: true,
    transparent: true
  },
  width: 640,
  height: 960
};

class GameScene extends Phaser.Scene {
  init() {
    //  Inject our CSS
    var element = document.createElement("style");

    document.head.appendChild(element);

    var sheet = element.sheet;

    var styles =
      '@font-face { font-family: "Gilbert"; src: url("https://assets.codepen.io/4364/GilbertColorBoldPreview5.woff") format("woff"); }\n';

    sheet.insertRule(styles, 0);
  }

  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );

    this.load.image("before", "https://assets.codepen.io/4364/p-before.jpg");
    this.load.image("after", "https://assets.codepen.io/4364/p-after.jpg");
    this.load.image("mask2", "https://assets.codepen.io/4364/glass.png");
  }

  create() {
    let after = this.add.image(config.width / 2, config.height / 2, "after");
    let before = this.add.image(config.width / 2, config.height / 2, "before");

    WebFont.load({
      custom: {
        families: ["Gilbert"]
      },
      active: () => {
        let text = this.add.text(config.width / 2, config.height / 2, "Pride", {
          fontSize: "160px",
          fontFamily: "Gilbert",
          color: textColor
        });
        text.displayWidth = before.displayWidth;

        text.setOrigin(0, 0.5);

        text.x = before.getTopLeft().x;
        text.y = before.getTopLeft().y + text.displayHeight / 2;

        text.setShadow(3, 3, "rgba(0,0,0,0.5)", 5);

        //         tween to bottom
        let bottomX = before.getBottomCenter().y - text.displayHeight / 2;

        var tween = this.tweens.add({
          targets: text,
          y: bottomX,
          duration: 3000,
          yoyo: true,
          repeatDelay: 4000,
          repeat: -1
        });

        this.tweens.add({
          targets: before,
          scaleX: 0,
          alpha: 0.25,
          duration: 3000,
          yoyo: true,
          repeatDelay: 4000,
          repeat: -1
        });

        const particles2 = this.make.particles({
          key: "mask2",
          add: false
        });

        const shape = new Phaser.Geom.Rectangle(
          0,
          0,
          config.width,
          config.height
        );

        particles2.createEmitter({
          emitZone: { type: "random", source: shape },
          lifespan: 4000,
          speed: 140,
          angle: { min: 160, max: 200 },
          rotate: { start: 0, end: 200 },
          scale: { start: 1.5, end: 0.8 } //,
          // follow: text
        });

        text.mask = new Phaser.Display.Masks.BitmapMask(this, particles2);
      }
    });
  }
}

config.scene = [GameScene];

const game = new Phaser.Game(config);