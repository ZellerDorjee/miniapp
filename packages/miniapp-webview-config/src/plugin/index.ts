import { dirname, parse } from 'path';
import { DEV_URL_PREFIX } from './utils/constants';

import {
  generatePageJS,
  generatePageXML
} from './generators/page';
import { generateAppJS } from './generators/app';
import { AppConfigType } from 'src/types';

const PluginName = 'WebViewPlugin';
class WebViewPlugin {
  options: any;
  target: string;
  appConfig: AppConfigType;

  constructor(options) {
    this.options = options;
    this.target = options.target;
    this.appConfig = options.appConfig;
  }

  apply(compiler) {
    const target = this.target;
    const {
      api: {
        context: {
          command,
          userConfig: rootUserConfig,
          rootDir
        },
        getValue
      },
    } = this.options;

    const routes = this.appConfig.routes.map(route => {
      const { source, name, } = route;

      if (name) {
        return {
          ...route,
          webEntryName: name
        };
      }
      if (source) {
        const dir = dirname(source);
        return {
          ...route,
          webEntryName: parse(dir).name.toLocaleLowerCase()
        };
      }
    }).filter(r => !!r);
    // todo subPackages
    let isFirstRender = true;
    compiler.hooks.emit.tapAsync(PluginName, (compilation, callback) => {
      if (isFirstRender) {
        generateAppJS(compilation, {
          target,
          command
        });
        routes.forEach(({ entryName, webEntryName, url: originalUrl }) => {
          const url = originalUrl ? originalUrl : getWebviewUrl(webEntryName);
          generatePageXML(compilation, entryName, {
            target,
            command,
          });

          generatePageJS(compilation, entryName, {
            target,
            command,
            url
          });
        });
        isFirstRender = false;
      }
      callback();
    });

    function getWebviewUrl(name) {
      if (command === 'build') {
        let urlPrefix = process.env.webview_prefix_path;
        if (!urlPrefix) {
          urlPrefix = rootUserConfig.webview.defaultPrefixPath;
        }
        if (!urlPrefix) {
          throw new Error('Neither environment variable "webview_prefix_path" nor defaultPrefixPath in build.json exists');
        }
        return `${urlPrefix}/${name}.html`;
      } else if (command === 'start') {
        const urlPrefix = getValue(DEV_URL_PREFIX);
        return `${urlPrefix}/${name}.html`;
      }
    }    
  }
}

export default WebViewPlugin;