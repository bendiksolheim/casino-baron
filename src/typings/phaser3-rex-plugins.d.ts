declare class UIPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
}

declare module "phaser3-rex-plugins/templates/ui/ui-plugin" {
  export = UIPlugin;
}
