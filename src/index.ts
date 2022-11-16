// Copyright (c) Thorsten Beier
// Copyright (c) JupyterLite Contributors
// Distributed under the terms of the Modified BSD License.

import {
  IServiceWorkerRegistrationWrapper,
  JupyterLiteServer,
  JupyterLiteServerPlugin
} from '@jupyterlite/server';

import { IKernel, IKernelSpecs } from '@jupyterlite/kernel';

import { WebWorkerKernel } from './web_worker_kernel';

import logo32 from '../style/logos/lua-logo-32x32.png';
import logo64 from '../style/logos/lua-logo-64x64.png';

const server_kernel: JupyterLiteServerPlugin<void> = {
  id: '@jupyterlite/xeus-lua-kernel-extension:kernel',
  autoStart: true,
  requires: [IKernelSpecs, IServiceWorkerRegistrationWrapper],
  activate: (
    app: JupyterLiteServer,
    kernelspecs: IKernelSpecs,
    serviceWorkerRegistrationWrapper: IServiceWorkerRegistrationWrapper
  ) => {
    kernelspecs.register({
      spec: {
        name: 'Lua',
        display_name: 'Lua',
        language: 'lua',
        argv: [],
        spec: {
          argv: [],
          env: {},
          display_name: 'Lua',
          language: 'lua',
          interrupt_mode: 'message',
          metadata: {}
        },
        resources: {
          'logo-32x32': logo32,
          'logo-64x64': logo64
        }
      },
      create: async (options: IKernel.IOptions): Promise<IKernel> => {
        return new WebWorkerKernel({
          ...options,
          mountDrive: serviceWorkerRegistrationWrapper.enabled
        });
      }
    });
  }
};

const plugins: JupyterLiteServerPlugin<any>[] = [server_kernel];

export default plugins;
