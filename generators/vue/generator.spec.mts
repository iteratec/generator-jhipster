import { expect } from 'esmocha';
import lodash from 'lodash';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { buildClientSamples, entitiesClientSamples as entities, checkEnforcements } from '../../test/support/index.mjs';
import { shouldSupportFeatures, testBlueprintSupport } from '../../test/support/tests.mjs';
import Generator from './index.mjs';
import { defaultHelpers as helpers } from '../../test/support/helpers.mjs';

import { clientFrameworkTypes } from '../../jdl/jhipster/index.mjs';
import { CLIENT_MAIN_SRC_DIR, CLIENT_TEST_SRC_DIR } from '../generator-constants.mjs';
import { GENERATOR_VUE } from '../generator-list.mjs';

const { snakeCase } = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generator = basename(__dirname);
const generatorFile = join(__dirname, 'index.mts');

const { VUE: clientFramework } = clientFrameworkTypes;
const commonConfig = { clientFramework, nativeLanguage: 'en', languages: ['fr', 'en'] };

const testSamples = buildClientSamples(commonConfig);

const clientAdminFiles = (clientSrcDir, clientTestDir) => [
  `${clientSrcDir}app/admin/configuration/configuration.component.ts`,
  `${clientSrcDir}app/admin/configuration/configuration.vue`,
  `${clientSrcDir}app/admin/configuration/configuration.service.ts`,

  `${clientSrcDir}app/admin/health/health.component.ts`,
  `${clientSrcDir}app/admin/health/health.vue`,
  `${clientSrcDir}app/admin/health/health-modal.vue`,
  `${clientSrcDir}app/admin/health/health-modal.component.ts`,
  `${clientSrcDir}app/admin/health/health.service.ts`,

  `${clientSrcDir}app/admin/logs/logs.component.ts`,
  `${clientSrcDir}app/admin/logs/logs.service.ts`,

  `${clientSrcDir}app/admin/metrics/metrics.component.ts`,
  `${clientSrcDir}app/admin/metrics/metrics-modal.component.ts`,
  `${clientSrcDir}app/admin/metrics/metrics.vue`,
  `${clientSrcDir}app/admin/metrics/metrics-modal.vue`,
  `${clientSrcDir}app/admin/metrics/metrics.service.ts`,

  `${clientTestDir}spec/app/admin/metrics/metrics.component.spec.ts`,
  `${clientTestDir}spec/app/admin/metrics/metrics-modal.component.spec.ts`,

  `${clientTestDir}spec/app/admin/logs/logs.component.spec.ts`,

  `${clientTestDir}spec/app/admin/configuration/configuration.component.spec.ts`,

  `${clientTestDir}spec/app/admin/health/health.component.spec.ts`,
  `${clientTestDir}spec/app/admin/health/health-modal.component.spec.ts`,
  `${clientTestDir}spec/app/admin/health/health.service.spec.ts`,
];

describe(`generator - ${clientFramework}`, () => {
  it('generator-list constant matches folder name', async () => {
    await expect((await import('../generator-list.mjs'))[`GENERATOR_${snakeCase(generator).toUpperCase()}`]).toBe(generator);
  });
  shouldSupportFeatures(Generator);
  describe('blueprint support', () => testBlueprintSupport(generator));
  checkEnforcements({ client: true }, GENERATOR_VUE);

  it('samples matrix should match snapshot', () => {
    expect(testSamples).toMatchSnapshot();
  });

  Object.entries(testSamples).forEach(([name, sampleConfig]) => {
    describe(name, () => {
      let runResult;

      before(async () => {
        runResult = await helpers
          .run(generatorFile)
          .withJHipsterConfig(sampleConfig, entities)
          .withControl({ getWebappTranslation: () => 'translations' })
          .withMockedGenerators(['jhipster:common', 'jhipster:languages']);
      });

      after(() => runResult.cleanup());

      it('should match generated files snapshot', () => {
        expect(runResult.getStateSnapshot()).toMatchSnapshot();
      });
      it('contains correct clientFramework', () => {
        runResult.assertFileContent('.yo-rc.json', new RegExp(`"clientFramework": "${clientFramework}"`));
      });
      it('should not contain version placeholders at package.json', () => {
        runResult.assertNoFileContent('package.json', /VERSION_MANAGED_BY_CLIENT_COMMON/);
        runResult.assertNoFileContent('package.json', /VERSION_MANAGED_BY_CLIENT_ANGULAR/);
        runResult.assertNoFileContent('package.json', /VERSION_MANAGED_BY_CLIENT_REACT/);
        runResult.assertNoFileContent('package.json', /VERSION_MANAGED_BY_CLIENT_VUE/);
      });

      describe('skipJhipsterDependencies', () => {
        const { skipJhipsterDependencies } = sampleConfig;
        const skipJhipsterDependenciesTitle = skipJhipsterDependencies
          ? 'should not add generator-jhipster to package.json'
          : 'should add generator-jhipster to package.json';
        it(skipJhipsterDependenciesTitle, () => {
          const assertion = (...args) =>
            skipJhipsterDependencies ? runResult.assertNoFileContent(...args) : runResult.assertFileContent(...args);
          assertion('package.json', 'generator-jhipster');
        });
      });

      describe('withAdminUi', () => {
        const { applicationType, withAdminUi, clientSrcDir = CLIENT_MAIN_SRC_DIR, clientTestDir = CLIENT_TEST_SRC_DIR } = sampleConfig;
        const generateAdminUi = applicationType !== 'microservice' && withAdminUi;
        const adminUiComponents = generateAdminUi ? 'should generate admin ui components' : 'should not generate admin ui components';

        it(adminUiComponents, () => {
          const assertion = (...args) => (generateAdminUi ? runResult.assertFile(...args) : runResult.assertNoFile(...args));
          assertion(clientAdminFiles(clientSrcDir, clientTestDir));
        });

        if (applicationType !== 'microservice') {
          const adminUiRoutingTitle = generateAdminUi ? 'should generate admin related code' : 'should not generate admin related code';
          const assertion = (...args) => (generateAdminUi ? runResult.assertFileContent(...args) : runResult.assertNoFileContent(...args));

          it(adminUiRoutingTitle, () => {
            assertion(
              `${clientSrcDir}app/router/admin.ts`,
              "  const JhiConfigurationComponent = () => import('@/admin/configuration/configuration.vue');\n" +
                "  const JhiHealthComponent = () => import('@/admin/health/health.vue');\n" +
                "  const JhiLogsComponent = () => import('@/admin/logs/logs.vue');\n" +
                "  const JhiMetricsComponent = () => import('@/admin/metrics/metrics.vue');",
            );
            assertion(
              `${clientSrcDir}app/router/admin.ts`,
              `
    {
      path: '/admin/health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    },`,
            );
            assertion(
              `${clientSrcDir}app/core/jhi-navbar/jhi-navbar.vue`,
              '<b-dropdown-item to="/admin/metrics" active-class="active">\n' +
                '            <font-awesome-icon icon="tachometer-alt" />\n' +
                '            <span v-text="t$(\'global.menu.admin.metrics\')"></span>\n' +
                '          </b-dropdown-item>\n' +
                '          <b-dropdown-item to="/admin/health" active-class="active">\n' +
                '            <font-awesome-icon icon="heart" />\n' +
                '            <span v-text="t$(\'global.menu.admin.health\')"></span>\n' +
                '          </b-dropdown-item>\n' +
                '          <b-dropdown-item to="/admin/configuration" active-class="active">\n' +
                '            <font-awesome-icon icon="cogs" />\n' +
                '            <span v-text="t$(\'global.menu.admin.configuration\')"></span>\n' +
                '          </b-dropdown-item>\n' +
                '          <b-dropdown-item to="/admin/logs" active-class="active">\n' +
                '            <font-awesome-icon icon="tasks" />\n' +
                '            <span v-text="t$(\'global.menu.admin.logs\')"></span>\n' +
                '          </b-dropdown-item>',
            );
          });
        }
      });
    });
  });
});
