/* eslint-env mocha */

import should from 'should';

import { openDb, closeDb } from '../../lib/db.js';
import config from '../test-config.js';
import { importGtfs, getStopsAsGeoJSON } from '../../index.js';

describe('gtfs.getStopsAsGeoJSON(): ', () => {
  before(async () => {
    await openDb(config);
    await importGtfs(config);
  });

  after(async () => {
    await closeDb();
  });

  it('should return geojson with an empty features array if no stops exist', async () => {
    const stopId = 'fake-stop-id';
    const geojson = await getStopsAsGeoJSON({
      stop_id: stopId
    });

    should.exist(geojson);
    geojson.type.should.equal('FeatureCollection');
    geojson.features.should.have.length(0);
  });

  it('should return geojson with stops if they exist', async () => {
    const geojson = await getStopsAsGeoJSON();

    should.exist(geojson);
    geojson.type.should.equal('FeatureCollection');
    geojson.features.length.should.be.above(1);
    should.exist(geojson.features[0].geometry.coordinates);
    geojson.features[0].geometry.coordinates.length.should.equal(2);
  });

  it('should return geojson with stops if they exist for a specific stopId', async () => {
    const stopId = '70031';

    const geojson = await getStopsAsGeoJSON({
      stop_id: stopId
    });

    should.exist(geojson);
    geojson.type.should.equal('FeatureCollection');
    geojson.features.length.should.equal(1);
    should.exist(geojson.features[0].geometry.coordinates);
    geojson.features[0].geometry.coordinates.length.should.equal(2);
  });
});
