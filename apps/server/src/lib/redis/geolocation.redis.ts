import { RedisService } from "./redis.lib.js";

class RedisGeolocation extends RedisService {

    constructor() {
        super();
    }

    async addGeolocation(key: string, longitude: number, latitude: number, member: string) {
        await this.client?.geoadd(key, longitude, latitude, member);
        console.log(`Geolocation added for key: ${key}`);
    }

    async searchNearby(key: string, longitude: number, latitude: number, radius: number, unit: string = 'km') {
        const nearby = await this.client?.geosearch(
            key,
            'FROMLONLAT',
            longitude,
            latitude,
            'BYRADIUS',
            radius,
            unit,
        );
        return nearby;
    }
}

export { RedisGeolocation };