"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var colors = ["#cc0099", // purple
"#00f", // blue
"#090", // green
"#ff0", // yellow
"#f90", // orange
"#f00" // red
];
var textColor = colors[0];
document.body.style.backgroundColor = textColor;
var config = {
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

var GameScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  var _super = _createSuper(GameScene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    return _super.apply(this, arguments);
  }

  _createClass(GameScene, [{
    key: "init",
    value: function init() {
      //  Inject our CSS
      var element = document.createElement("style");
      document.head.appendChild(element);
      var sheet = element.sheet;
      var styles = '@font-face { font-family: "Gilbert"; src: url("https://assets.codepen.io/4364/GilbertColorBoldPreview5.woff") format("woff"); }\n';
      sheet.insertRule(styles, 0);
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.script("webfont", "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js");
      this.load.image("before", "https://assets.codepen.io/4364/p-before.jpg");
      this.load.image("after", "https://assets.codepen.io/4364/p-after.jpg");
      this.load.image("mask2", "https://assets.codepen.io/4364/glass.png");
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      var after = this.add.image(config.width / 2, config.height / 2, "after");
      var before = this.add.image(config.width / 2, config.height / 2, "before");
      WebFont.load({
        custom: {
          families: ["Gilbert"]
        },
        active: function active() {
          var text = _this.add.text(config.width / 2, config.height / 2, "Pride", {
            fontSize: "160px",
            fontFamily: "Gilbert",
            color: textColor
          });

          text.displayWidth = before.displayWidth;
          text.setOrigin(0, 0.5);
          text.x = before.getTopLeft().x;
          text.y = before.getTopLeft().y + text.displayHeight / 2;
          text.setShadow(3, 3, "rgba(0,0,0,0.5)", 5); //         tween to bottom

          var bottomX = before.getBottomCenter().y - text.displayHeight / 2;

          var tween = _this.tweens.add({
            targets: text,
            y: bottomX,
            duration: 3000,
            yoyo: true,
            repeatDelay: 4000,
            repeat: -1
          });

          _this.tweens.add({
            targets: before,
            scaleX: 0,
            alpha: 0.25,
            duration: 3000,
            yoyo: true,
            repeatDelay: 4000,
            repeat: -1
          });

          var particles2 = _this.make.particles({
            key: "mask2",
            add: false
          });

          var shape = new Phaser.Geom.Rectangle(0, 0, config.width, config.height);
          particles2.createEmitter({
            emitZone: {
              type: "random",
              source: shape
            },
            lifespan: 4000,
            speed: 140,
            angle: {
              min: 160,
              max: 200
            },
            rotate: {
              start: 0,
              end: 200
            },
            scale: {
              start: 1.5,
              end: 0.8
            } //,
            // follow: text

          });
          text.mask = new Phaser.Display.Masks.BitmapMask(_this, particles2);
        }
      });
    }
  }]);

  return GameScene;
}(Phaser.Scene);

config.scene = [GameScene];
var game = new Phaser.Game(config);
