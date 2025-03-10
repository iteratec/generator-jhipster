/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { clientApplicationBlock, clientTestBlock, clientSrcBlock } from '../client/utils.mjs';

export const vueFiles = {
  common: [
    {
      templates: [
        'package.json',
        'tsconfig.json',
        '.postcssrc.js',
        '.eslintrc.js',
        'vitest.config.ts',
        'webpack/config.js',
        'webpack/webpack.common.js',
        'webpack/webpack.dev.js',
        'webpack/webpack.prod.js',
        'webpack/vue.utils.js',
      ],
    },
  ],
  microfrontend: [
    {
      condition: generator => generator.microfrontend,
      templates: ['webpack/webpack.microfrontend.js.jhi.vue'],
    },
    {
      condition: generator => generator.microfrontend,
      ...clientApplicationBlock,
      templates: ['index.ts', 'core/error/error-loading.vue'],
    },
    {
      condition: generator => generator.microfrontend,
      ...clientTestBlock,
      templates: [
        'spec/app/microfrontends/entities-menu.component.ts',
        'spec/app/microfrontends/entities-menu.vue',
        'spec/app/microfrontends/entities-router.ts',
      ],
    },
    {
      condition: generator => generator.applicationTypeMicroservice,
      ...clientTestBlock,
      templates: ['spec/app/entities/entities-menu.spec.ts'],
    },
  ],
  sass: [
    {
      ...clientSrcBlock,
      templates: ['content/scss/_bootstrap-variables.scss', 'content/scss/global.scss', 'content/scss/vendor.scss'],
    },
  ],
  vueApp: [
    {
      ...clientApplicationBlock,
      templates: [
        'app.vue',
        'app.component.ts',
        'shims-vue.d.ts',
        'constants.ts',
        'declarations.d.ts',
        'main.ts',
        'shared/alert/alert.service.ts',
        'shared/config/axios-interceptor.ts',
        'shared/config/config.ts',
        'shared/config/config-bootstrap-vue.ts',
        'shared/config/dayjs.ts',
        'shared/config/store/account-store.ts',
        'shared/security/authority.ts',
        'store.ts',
        'router/index.ts',
        'router/admin.ts',
        'router/pages.ts',
      ],
    },
  ],
  i18n: [
    {
      condition: generator => generator.enableTranslation,
      ...clientApplicationBlock,
      templates: ['locale/translation.service.ts', 'shared/config/store/translation-store.ts', 'shared/config/languages.ts'],
    },
  ],
  sharedVueApp: [
    {
      ...clientApplicationBlock,
      templates: [
        'core/home/home.vue',
        'core/home/home.component.ts',
        'core/error/error.vue',
        'core/error/error.component.ts',
        'core/jhi-footer/jhi-footer.vue',
        'core/jhi-footer/jhi-footer.component.ts',
        'core/jhi-navbar/jhi-navbar.vue',
        'core/jhi-navbar/jhi-navbar.component.ts',
        'core/ribbon/ribbon.vue',
        'core/ribbon/ribbon.component.ts',
        'shared/composables/date-format.ts',
        'shared/composables/index.ts',
        'shared/composables/validation.ts',
        'shared/computables/arrays.ts',
        'shared/computables/index.ts',
        'shared/sort/jhi-sort-indicator.component.ts',
        'shared/sort/jhi-sort-indicator.vue',
        'shared/sort/sorts.ts',
        'shared/data/data-utils.service.ts',
        'shared/jhi-item-count.component.ts',
        'shared/jhi-item-count.vue',
        'shared/model/user.model.ts',
      ],
    },
  ],
  accountModule: [
    {
      ...clientApplicationBlock,
      templates: ['account/account.service.ts'],
    },
    {
      condition: generator => !generator.authenticationTypeOauth2,
      ...clientApplicationBlock,
      templates: [
        'account/login-form/login-form.vue',
        'account/login-form/login-form.component.ts',
        'account/login.service.ts',
        'router/account.ts',
      ],
    },
    {
      condition: generator => generator.generateUserManagement,
      ...clientApplicationBlock,
      templates: [
        'account/change-password/change-password.vue',
        'account/change-password/change-password.component.ts',
        'account/register/register.vue',
        'account/register/register.component.ts',
        'account/register/register.service.ts',
        'account/reset-password/init/reset-password-init.vue',
        'account/reset-password/init/reset-password-init.component.ts',
        'account/reset-password/finish/reset-password-finish.vue',
        'account/reset-password/finish/reset-password-finish.component.ts',
        'account/settings/settings.vue',
        'account/settings/settings.component.ts',
        'account/activate/activate.component.ts',
        'account/activate/activate.service.ts',
        'account/activate/activate.vue',
      ],
    },
    {
      condition: generator => generator.authenticationTypeSession && generator.generateUserManagement,
      ...clientApplicationBlock,
      templates: ['account/sessions/sessions.vue', 'account/sessions/sessions.component.ts'],
    },
    {
      condition: generator => generator.authenticationTypeOauth2,
      ...clientApplicationBlock,
      templates: ['account/login.service.ts'],
    },
  ],
  adminModule: [
    {
      ...clientApplicationBlock,
      templates: ['admin/docs/docs.vue', 'admin/docs/docs.component.ts'],
    },
    {
      ...clientApplicationBlock,
      condition: generator => generator.withAdminUi,
      templates: [
        'admin/configuration/configuration.vue',
        'admin/configuration/configuration.component.ts',
        'admin/configuration/configuration.service.ts',
        'admin/health/health.vue',
        'admin/health/health.component.ts',
        'admin/health/health-modal.vue',
        'admin/health/health-modal.component.ts',
        'admin/health/health.service.ts',
        'admin/logs/logs.vue',
        'admin/logs/logs.component.ts',
        'admin/logs/logs.service.ts',
        'admin/metrics/metrics.vue',
        'admin/metrics/metrics.component.ts',
        'admin/metrics/metrics.service.ts',
        'admin/metrics/metrics-modal.vue',
        'admin/metrics/metrics-modal.component.ts',
      ],
    },
    {
      condition: generator => generator.communicationSpringWebsocket,
      ...clientApplicationBlock,
      templates: ['admin/tracker/tracker.vue', 'admin/tracker/tracker.component.ts', 'admin/tracker/tracker.service.ts'],
    },
    {
      condition: generator => generator.generateUserManagement,
      ...clientApplicationBlock,
      templates: [
        'admin/user-management/user-management.vue',
        'admin/user-management/user-management.component.ts',
        'admin/user-management/user-management-view.vue',
        'admin/user-management/user-management-view.component.ts',
        'admin/user-management/user-management-edit.vue',
        'admin/user-management/user-management-edit.component.ts',
        'admin/user-management/user-management.service.ts',
      ],
    },
    {
      condition: generator => generator.applicationTypeGateway && generator.serviceDiscoveryAny,
      ...clientApplicationBlock,
      templates: ['admin/gateway/gateway.vue', 'admin/gateway/gateway.component.ts', 'admin/gateway/gateway.service.ts'],
    },
    {
      condition: generator => generator.generateBuiltInUserEntity,
      ...clientApplicationBlock,
      templates: ['entities/user/user.service.ts'],
    },
  ],
  clientTestFw: [
    {
      ...clientTestBlock,
      templates: [
        'spec/setup.ts',
        'spec/tsconfig.json',
        'spec/app/account/account.service.spec.ts',
        'spec/app/core/home/home.component.spec.ts',
        'spec/app/core/error/error.component.spec.ts',
        'spec/app/core/jhi-navbar/jhi-navbar.component.spec.ts',
        'spec/app/core/ribbon/ribbon.component.spec.ts',
        'spec/app/shared/alert/alert.service.spec.ts',
        'spec/app/shared/config/axios-interceptor.spec.ts',
        'spec/app/shared/data/data-utils.service.spec.ts',
        'spec/app/shared/sort/sorts.spec.ts',
      ],
    },
    {
      ...clientTestBlock,
      condition: generator => generator.withAdminUi,
      templates: [
        'spec/app/admin/configuration/configuration.component.spec.ts',
        'spec/app/admin/health/health.component.spec.ts',
        'spec/app/admin/health/health-modal.component.spec.ts',
        'spec/app/admin/health/health.service.spec.ts',
        'spec/app/admin/logs/logs.component.spec.ts',
        'spec/app/admin/metrics/metrics.component.spec.ts',
        'spec/app/admin/metrics/metrics-modal.component.spec.ts',
      ],
    },
    {
      condition: generator => generator.authenticationTypeOauth2,
      ...clientTestBlock,
      templates: ['spec/app/account/login.service.spec.ts'],
    },
    {
      condition: generator => !generator.authenticationTypeOauth2,
      ...clientTestBlock,
      templates: ['spec/app/account/login-form/login-form.component.spec.ts'],
    },
    {
      condition: generator => generator.authenticationTypeSession && generator.generateUserManagement,
      ...clientTestBlock,
      templates: ['spec/app/account/sessions/sessions.component.spec.ts', 'spec/app/account/login.service.spec.ts'],
    },
    {
      condition: generator => generator.generateUserManagement,
      ...clientTestBlock,
      templates: [
        'spec/app/account/change-password/change-password.component.spec.ts',
        'spec/app/account/register/register.component.spec.ts',
        'spec/app/account/reset-password/init/reset-password-init.component.spec.ts',
        'spec/app/account/reset-password/finish/reset-password-finish.component.spec.ts',
        'spec/app/account/settings/settings.component.spec.ts',
        'spec/app/account/activate/activate.component.spec.ts',
      ],
    },
    {
      condition: generator => generator.communicationSpringWebsocket,
      ...clientTestBlock,
      templates: ['spec/app/admin/tracker/tracker.component.spec.ts', 'spec/app/admin/tracker/tracker.service.spec.ts'],
    },
    {
      condition: generator => generator.generateUserManagement,
      ...clientTestBlock,
      templates: [
        'spec/app/admin/user-management/user-management.component.spec.ts',
        'spec/app/admin/user-management/user-management-view.component.spec.ts',
        'spec/app/admin/user-management/user-management-edit.component.spec.ts',
      ],
    },
    {
      condition: generator => generator.applicationTypeGateway && generator.serviceDiscoveryAny,
      ...clientTestBlock,
      templates: ['spec/app/admin/gateway/gateway.component.spec.ts'],
    },
  ],
};

export const entitiesFiles = {
  entities: [
    {
      ...clientApplicationBlock,
      templates: [
        'entities/entities.component.ts',
        'entities/entities.vue',
        'entities/entities-menu.component.ts',
        'entities/entities-menu.vue',
        'router/entities.ts',
      ],
    },
  ],
};

export async function writeFiles({ application }) {
  await this.writeFiles({
    sections: vueFiles,
    context: application,
  });
}

export async function writeEntitiesFiles({ application, entities }) {
  entities = entities.filter(entity => !entity.skipClient && !entity.builtIn);
  await this.writeFiles({
    sections: entitiesFiles,
    context: {
      ...application,
      entities,
    },
  });
}
