/* eslint-env mocha */

import should from 'should';

import config from '../test-config.js';
import {
  openDb,
  getDb,
  closeDb,
  importGtfs,
  getBoardAlights,
} from '../../index.js';

describe('getBoardAlights():', () => {
  before(async () => {
    await openDb(config);
    await importGtfs(config);
  });

  after(async () => {
    const db = getDb(config);
    await closeDb(db);
  });

  it('should return empty array if no board alights (GTFS-ride)', async () => {
    const tripId = 'fake-trip-id';

    const results = await getBoardAlights({
      trip_id: tripId,
    });
    should.exists(results);
    results.should.have.length(0);
  });
});