(() => {

  const world = {};

  function initWorld(conf) {
    world.gravity = conf.gravity === undefined ? 9.8 : conf.gravity;
    world.acc = conf.acc === undefined ? 160 : conf.acc;
  }

  function addPlayer(id, conf) {

    const player = sprite(id, {
      pos: conf.pos,
      velY: 0,
      jumpForce: conf.jumpForce === undefined ? 640 : conf.jumpForce,
      platform: undefined,
    });

    player.sup(() => {
      if (!player.platform) {
        player.velY -= world.gravity * world.acc * dt();
        const res = player.move(vec2(0, player.velY));
        if (res) {
          player.velY = 0;
          if (res.edge === "bottom") {
            player.platform = res.obj;
          }
        }
      } else {
        if (!player.intersects(player.platform)) {
          player.platform = undefined;
        }
      }
    });

    player.grounded = () => {
      return player.platform !== undefined;
    };

    player.jump = () => {
      if (player.platform) {
        player.platform = undefined;
        player.velY = player.jumpForce;
      }
    };

    return player;

  }

  const lib = {};

  lib.initWorld = initWorld;
  lib.addPlayer = addPlayer;

  for (const k in lib) {
    Object.defineProperty(window, k, {
      value: lib[k],
      writable: false,
    });
  }

})();

