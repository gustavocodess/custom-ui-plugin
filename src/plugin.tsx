import { registerCommercePlugin } from '@builder.io/commerce-plugin-tools';
import pkg from "../package.json";
import { registerContentTab, registerEditorOnLoad, registerMainTab, registerToolbarButton } from "./plugin-helpers";


registerCommercePlugin({
  name: 'Custom UI Plugin',
  id: pkg.name,
  settings: [
    {
      name: "apiKey",
      type: "string",
      sensitive: true,
      required: false,
      helperText: "Your API Custom key",
    },
    {
      name: "secretToken",
      type: "string",
      sensitive: true,
      required: false,
      helperText: "Your secret token",
    },
    {
      name: "enableSomething",
      type: "boolean",
      sensitive: true,
      defaultValue: true,
      helperText: "enableSomething",
    },
  ],
  ctaText: 'Start Plugin',
  },
  async (settings) => {
    // get a configuration value from plugin settings.
    const enableSomething = settings.get("enableSomething");
    registerEditorOnLoad(async ({ safeReaction }) => {
      safeReaction(
        async () => {
          // register tab after content is loaded in editor
          registerContentTab()
          // register new toolbar button
          registerToolbarButton()
          // register new main tab
          registerMainTab()

          return null;
        },
        async () => {
          // callback for reaction above
          return false;
        },
        {
          fireImmediately: true,
        }
      );
    });
    

    // Builder.register('editor.toolbarButton', {
    //   component: () => <Button variant='contained'>New Item</Button>,
    // })

    return {}
  }
);
