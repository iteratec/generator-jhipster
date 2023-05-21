/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'assert';

import { messageBrokerTypes, databaseTypes } from '../../../jdl/jhipster/index.mjs';
import {
  GENERATOR_CUCUMBER,
  GENERATOR_GATLING,
  GENERATOR_SPRING_CACHE,
  GENERATOR_SPRING_WEBSOCKET,
  GENERATOR_SPRING_DATA_RELATIONAL,
  GENERATOR_SPRING_DATA_CASSANDRA,
  GENERATOR_SPRING_DATA_COUCHBASE,
  GENERATOR_SPRING_DATA_MONGODB,
  GENERATOR_PULSAR,
  GENERATOR_MAVEN,
  GENERATOR_LIQUIBASE,
  GENERATOR_LANGUAGES,
  GENERATOR_SPRING_CLOUD_STREAM,
  GENERATOR_GRADLE,
  GENERATOR_DOCKER,
  GENERATOR_COMMON,
} from '../../generator-list.mjs';

const { KAFKA, PULSAR } = messageBrokerTypes;
const { SQL, COUCHBASE } = databaseTypes;

export const mockedGenerators = [
  `jhipster:${GENERATOR_COMMON}`,
  `jhipster:${GENERATOR_SPRING_DATA_COUCHBASE}`,
  `jhipster:${GENERATOR_CUCUMBER}`,
  `jhipster:${GENERATOR_DOCKER}`,
  `jhipster:${GENERATOR_GATLING}`,
  `jhipster:${GENERATOR_GRADLE}`,
  `jhipster:${GENERATOR_SPRING_CLOUD_STREAM}`,
  `jhipster:${GENERATOR_LANGUAGES}`,
  `jhipster:${GENERATOR_LIQUIBASE}`,
  `jhipster:${GENERATOR_MAVEN}`,
  `jhipster:${GENERATOR_SPRING_DATA_CASSANDRA}`,
  `jhipster:${GENERATOR_SPRING_DATA_MONGODB}`,
  `jhipster:${GENERATOR_SPRING_DATA_RELATIONAL}`,
  `jhipster:${GENERATOR_PULSAR}`,
  `jhipster:${GENERATOR_SPRING_CACHE}`,
  `jhipster:${GENERATOR_SPRING_WEBSOCKET}`,
];

export const shouldComposeWithLiquibase = (testSample, runResultSupplier) => {
  const liquibaseEnabled = typeof testSample === 'boolean' ? testSample : testSample?.databaseType === SQL;
  if (liquibaseEnabled) {
    it('should compose with liquibase generator', () => {
      assert(runResultSupplier().mockedGenerators['jhipster:liquibase'].calledOnce);
    });
  } else {
    it('should not compose with liquibase generator', () => {
      assert(runResultSupplier().mockedGenerators['jhipster:liquibase'].notCalled);
    });
  }
};

export const shouldComposeWithKafka = (sampleConfig, runResultSupplier) => {
  const kafkaEnabled = typeof sampleConfig === 'boolean' ? sampleConfig : sampleConfig?.messageBroker === KAFKA;
  if (kafkaEnabled) {
    it(`should compose with ${KAFKA} generator`, () => {
      assert(runResultSupplier().mockedGenerators[`jhipster:${GENERATOR_SPRING_CLOUD_STREAM}`].calledOnce);
    });
  } else {
    it(`should not compose with ${KAFKA} generator`, () => {
      assert(runResultSupplier().mockedGenerators[`jhipster:${GENERATOR_SPRING_CLOUD_STREAM}`].notCalled);
    });
  }
};

export const shouldComposeWithPulsar = (sampleConfig, runResultSupplier) => {
  const pulsarEnabled = typeof sampleConfig === 'boolean' ? sampleConfig : sampleConfig?.messageBroker === PULSAR;
  if (pulsarEnabled) {
    it(`should compose with ${PULSAR} generator`, () => {
      assert(runResultSupplier().mockedGenerators['jhipster:pulsar'].calledOnce);
    });
  } else {
    it(`should not compose with ${PULSAR} generator`, () => {
      assert(runResultSupplier().mockedGenerators['jhipster:pulsar'].notCalled);
    });
  }
};

const shouldComposeWithDatabasetype = (databaseType, testSample, runResultSupplier) => {
  const generator = databaseType;
  const shouldCompose =
    typeof testSample === 'boolean' ? testSample : testSample?.applicationWithEntities?.config?.databaseType === databaseType;
  if (shouldCompose) {
    it(`should compose with ${generator} generator`, () => {
      assert(runResultSupplier().mockedGenerators[`jhipster:spring-data-${generator}`].calledOnce);
    });
  } else {
    it(`should not compose with ${generator} generator`, () => {
      assert(runResultSupplier().mockedGenerators[`jhipster:spring-data-${generator}`].notCalled);
    });
  }
};

export const shouldComposeWithCouchbase = (testSample, runResultSupplier) =>
  shouldComposeWithDatabasetype(COUCHBASE, testSample, runResultSupplier);
